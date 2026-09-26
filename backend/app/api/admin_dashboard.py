from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Enquiry, EnquiryStatus, Order, OrderStatus, PaymentStatus, Product

bp = Blueprint("admin_dashboard", __name__, url_prefix="/api/admin/dashboard")


@bp.get("/stats")
@jwt_required()
def stats():
    total_orders = Order.query.count()
    total_revenue = (
        db.session.query(db.func.coalesce(db.func.sum(Order.total_npr), 0))
        .filter(Order.payment_status == PaymentStatus.paid)
        .scalar()
    )
    orders_by_status = {
        status.value: Order.query.filter(Order.status == status).count() for status in OrderStatus
    }

    recent_orders = Order.query.order_by(Order.created_at.desc()).limit(10).all()

    return jsonify(
        {
            "total_orders": total_orders,
            "total_revenue_npr": float(total_revenue),
            "orders_by_status": orders_by_status,
            "total_products": Product.query.count(),
            "recent_orders": [o.to_dict(include_items=False) for o in recent_orders],
            "unread_enquiries": Enquiry.query.filter(Enquiry.status == EnquiryStatus.new).count(),
        }
    )
