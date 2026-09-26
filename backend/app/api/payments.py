from flask import Blueprint, current_app, jsonify, request

from app.extensions import db, limiter
from app.models import Order, OrderStatus, PaymentStatus
from app.services import esewa, stripe_gateway
from app.services.order_maintenance import release_stale_pending_orders
from app.services.stripe_gateway import StripeNotConfiguredError

bp = Blueprint("payments", __name__, url_prefix="/api/payments")


def _require_enabled(method: str):
    """Returns an error response if `method` isn't in ENABLED_PAYMENT_METHODS,
    else None - blocks direct API calls from reaching a disabled gateway even
    if the checkout UI itself doesn't offer it."""
    if method not in current_app.config["ENABLED_PAYMENT_METHODS"]:
        return jsonify({"error": f"'{method}' payments are temporarily unavailable"}), 503
    return None


def _get_pending_order(order_id=None, order_number=None):
    if order_id is not None:
        order = Order.query.get(order_id)
    else:
        order = Order.query.filter_by(order_number=order_number).first()
    return order


def _mark_paid(order: Order, gateway_txn_id: str) -> None:
    if order.payment_status == PaymentStatus.paid:
        return  # idempotent - already processed
    order.payment_status = PaymentStatus.paid
    order.status = OrderStatus.processing
    order.gateway_txn_id = gateway_txn_id
    db.session.commit()


def _mark_failed(order: Order) -> None:
    if order.payment_status == PaymentStatus.paid:
        return  # never downgrade a confirmed payment
    order.payment_status = PaymentStatus.failed
    db.session.commit()


# --- eSewa ---------------------------------------------------------------


@bp.post("/esewa/initiate")
@limiter.limit("10 per minute")
def esewa_initiate():
    if err := _require_enabled("esewa"):
        return err
    release_stale_pending_orders()

    body = request.get_json(silent=True) or {}
    order = _get_pending_order(order_id=body.get("order_id"))
    if not order:
        return jsonify({"error": "Order not found"}), 404
    if order.payment_status == PaymentStatus.paid:
        return jsonify({"error": "Order is already paid"}), 409
    if order.status == OrderStatus.cancelled:
        return jsonify({"error": "This order has expired. Please start a new order."}), 410

    order.payment_method = "esewa"
    order.gateway_reference = order.order_number
    db.session.commit()

    return jsonify(esewa.build_payment_payload(order))


@bp.get("/esewa/callback")
def esewa_callback():
    data_b64 = request.args.get("data")
    order_number = request.args.get("order_number")
    order = _get_pending_order(order_number=order_number)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    if not data_b64:
        # eSewa's failure_url is hit with no `data` payload - the user cancelled or the payment failed.
        _mark_failed(order)
        return jsonify(order.to_dict())

    try:
        payload = esewa.decode_callback_data(data_b64)
    except ValueError:
        return jsonify({"error": "Invalid callback payload"}), 400

    verified = esewa.verify_payment(payload.get("transaction_uuid", order.order_number), order.total_npr)
    if verified:
        _mark_paid(order, gateway_txn_id=payload.get("transaction_code", ""))
    else:
        _mark_failed(order)

    return jsonify(order.to_dict())


# --- Stripe ------------------------------------------------------------


@bp.post("/stripe/initiate")
@limiter.limit("10 per minute")
def stripe_initiate():
    if err := _require_enabled("stripe"):
        return err
    release_stale_pending_orders()

    body = request.get_json(silent=True) or {}
    order = _get_pending_order(order_id=body.get("order_id"))
    if not order:
        return jsonify({"error": "Order not found"}), 404
    if order.payment_status == PaymentStatus.paid:
        return jsonify({"error": "Order is already paid"}), 409
    if order.status == OrderStatus.cancelled:
        return jsonify({"error": "This order has expired. Please start a new order."}), 410

    order.payment_method = "stripe"
    db.session.commit()

    try:
        result = stripe_gateway.create_checkout_session(order)
    except StripeNotConfiguredError as exc:
        return jsonify({"error": str(exc)}), 503

    order.gateway_reference = result["id"]
    db.session.commit()

    return jsonify(result)


@bp.get("/stripe/callback")
def stripe_callback():
    session_id = request.args.get("session_id")
    order_number = request.args.get("order_number")
    order = _get_pending_order(order_number=order_number)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    if not session_id:
        # Stripe's cancel_url is hit with no session_id - the user cancelled checkout.
        _mark_failed(order)
        return jsonify(order.to_dict())

    try:
        session = stripe_gateway.retrieve_session(session_id)
    except StripeNotConfiguredError as exc:
        return jsonify({"error": str(exc)}), 503

    if session["metadata"].get("order_number") != order.order_number:
        return jsonify({"error": "Session/order mismatch"}), 400

    if session["payment_status"] == "paid":
        _mark_paid(order, gateway_txn_id=session.get("payment_intent") or "")
    else:
        _mark_failed(order)

    return jsonify(order.to_dict())
