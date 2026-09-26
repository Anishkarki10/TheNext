import re
import uuid
from datetime import datetime
from zoneinfo import ZoneInfo

from flask import Blueprint, current_app, jsonify, request

from app.extensions import db, limiter
from app.models import Order, OrderItem, OrderStatus, ProductVariant
from app.services.order_maintenance import release_stale_pending_orders

bp = Blueprint("orders", __name__, url_prefix="/api/orders")

# The full set the system knows how to handle at all, vs. ENABLED_PAYMENT_METHODS
# (app/config.py, env-configurable) which is the currently-active subset accepted
# from customers - esewa/stripe are fully built but disabled for initial launch.
ALL_PAYMENT_METHODS = {"esewa", "stripe", "cod"}

NEPAL_TZ = ZoneInfo("Asia/Kathmandu")


def _generate_order_number() -> str:
    # Nepal-local date, not UTC - so the order number's date matches the day
    # the customer actually placed it in their own timezone.
    date_part = datetime.now(NEPAL_TZ).strftime("%Y%m%d")
    return f"TNP-{date_part}-{uuid.uuid4().hex[:6].upper()}"


def _is_valid_phone(phone: str) -> bool:
    digits = re.sub(r"\D", "", phone or "")
    return len(digits) >= 10 or len(digits) == 7


@bp.post("")
@limiter.limit("10 per minute")
def create_order():
    release_stale_pending_orders()

    body = request.get_json(silent=True) or {}
    customer = body.get("customer") or {}
    items = body.get("items") or []
    payment_method = body.get("payment_method")

    errors = {}
    if not customer.get("name"):
        errors["customer.name"] = "Name is required"
    if not customer.get("phone"):
        errors["customer.phone"] = "Phone is required"
    elif not _is_valid_phone(customer["phone"]):
        errors["customer.phone"] = "Enter a valid phone number (at least 10 digits, or 7 digits for a landline)"
    if not customer.get("address"):
        errors["customer.address"] = "Shipping address is required"
    if not items:
        errors["items"] = "At least one item is required"
    enabled_methods = current_app.config["ENABLED_PAYMENT_METHODS"]
    if payment_method not in ALL_PAYMENT_METHODS:
        errors["payment_method"] = f"Must be one of {sorted(ALL_PAYMENT_METHODS)}"
    elif payment_method not in enabled_methods:
        errors["payment_method"] = f"'{payment_method}' is temporarily unavailable. Available now: {sorted(enabled_methods)}"
    if errors:
        return jsonify({"errors": errors}), 400

    order_items = []
    subtotal = 0
    for raw_item in items:
        variant_id = raw_item.get("variant_id")
        quantity = raw_item.get("quantity")
        if not isinstance(quantity, int) or quantity < 1:
            return jsonify({"error": f"Invalid quantity for variant {variant_id}"}), 400

        variant = ProductVariant.query.get(variant_id)
        if not variant:
            return jsonify({"error": f"Variant {variant_id} not found"}), 404
        if variant.is_enquiry_only or variant.price_npr is None:
            return jsonify({"error": f"'{variant.label}' is enquiry-only and cannot be checked out online"}), 400
        if variant.stock_qty < quantity:
            return jsonify({"error": f"Not enough stock for '{variant.label}' (have {variant.stock_qty})"}), 409

        # Prices always come from the server-side variant record, never the client.
        unit_price = variant.price_npr
        line_total = unit_price * quantity
        subtotal += line_total

        variant.stock_qty -= quantity
        order_items.append(
            OrderItem(
                product_id=variant.product_id,
                variant_id=variant.id,
                product_name_snapshot=variant.product.name,
                variant_label_snapshot=variant.label,
                unit_price_npr=unit_price,
                quantity=quantity,
                line_total_npr=line_total,
            )
        )

    order = Order(
        order_number=_generate_order_number(),
        customer_name=customer["name"],
        customer_email=customer.get("email"),
        customer_phone=customer["phone"],
        shipping_address=customer["address"],
        city=customer.get("city"),
        notes=body.get("notes"),
        payment_method=payment_method,
        subtotal_npr=subtotal,
        total_npr=subtotal,  # no shipping/tax modeled yet
        items=order_items,
    )
    if payment_method == "cod":
        # No online payment step to wait on - the order is confirmed immediately;
        # cash is collected on delivery and an admin marks it paid afterwards.
        order.status = OrderStatus.processing

    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201


@bp.get("/<order_number>")
def get_order(order_number):
    order = Order.query.filter_by(order_number=order_number).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    # Light guard against order-number enumeration: caller must know the phone on the order.
    phone = request.args.get("phone", "")
    if not phone or phone.strip() != order.customer_phone:
        return jsonify({"error": "Provide the order's phone number as ?phone= to look it up"}), 403

    return jsonify(order.to_dict())
