from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Order, OrderStatus, PaymentStatus
from app.services.audit import log_admin_action

bp = Blueprint("admin_orders", __name__, url_prefix="/api/admin/orders")

PAGE_SIZE = 25


@bp.get("")
@jwt_required()
def list_orders():
    query = Order.query.order_by(Order.created_at.desc())

    status = request.args.get("status")
    if status:
        try:
            query = query.filter(Order.status == OrderStatus(status))
        except ValueError:
            return jsonify({"error": f"Invalid status '{status}'"}), 400

    page = max(int(request.args.get("page", 1)), 1)
    pagination = query.paginate(page=page, per_page=PAGE_SIZE, error_out=False)

    return jsonify(
        {
            "orders": [o.to_dict(include_items=False) for o in pagination.items],
            "page": page,
            "total_pages": pagination.pages,
            "total_orders": pagination.total,
        }
    )


@bp.get("/<int:order_id>")
@jwt_required()
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())


@bp.patch("/<int:order_id>/status")
@jwt_required()
def update_status(order_id):
    order = Order.query.get_or_404(order_id)
    body = request.get_json(silent=True) or {}
    changes = {}

    if "status" in body:
        try:
            new_status = OrderStatus(body["status"])
        except (ValueError, TypeError):
            return jsonify({"error": f"Invalid status '{body['status']}'", "valid": [s.value for s in OrderStatus]}), 400
        changes["status"] = {"from": order.status.value, "to": new_status.value}
        order.status = new_status

    # Mainly for COD orders: there's no gateway callback to flip payment_status,
    # so an admin marks it paid manually (e.g. once cash is collected on delivery).
    if "payment_status" in body:
        try:
            new_payment_status = PaymentStatus(body["payment_status"])
        except (ValueError, TypeError):
            return (
                jsonify(
                    {
                        "error": f"Invalid payment_status '{body['payment_status']}'",
                        "valid": [s.value for s in PaymentStatus],
                    }
                ),
                400,
            )
        changes["payment_status"] = {"from": order.payment_status.value, "to": new_payment_status.value}
        order.payment_status = new_payment_status

    if changes:
        log_admin_action("order.status_update", target_type="order", target_id=order.id, details=changes)
    db.session.commit()
    return jsonify(order.to_dict())
