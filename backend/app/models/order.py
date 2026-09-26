import enum

from app.extensions import db
from app.utils import to_utc_iso


class OrderStatus(enum.Enum):
    pending_payment = "pending_payment"
    paid = "paid"
    processing = "processing"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class PaymentStatus(enum.Enum):
    unpaid = "unpaid"
    paid = "paid"
    failed = "failed"
    refunded = "refunded"


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(30), unique=True, nullable=False, index=True)

    customer_name = db.Column(db.String(150), nullable=False)
    customer_email = db.Column(db.String(150))
    customer_phone = db.Column(db.String(30), nullable=False)
    shipping_address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(80))
    notes = db.Column(db.Text)

    status = db.Column(db.Enum(OrderStatus), default=OrderStatus.pending_payment, nullable=False)
    payment_method = db.Column(db.String(20))  # 'esewa' | 'stripe' | 'cod'
    payment_status = db.Column(db.Enum(PaymentStatus), default=PaymentStatus.unpaid, nullable=False)
    gateway_reference = db.Column(db.String(120))  # transaction_uuid (esewa) / checkout session id (stripe)
    gateway_txn_id = db.Column(db.String(120))  # ref_id (esewa) / payment_intent id (stripe), set once verified

    subtotal_npr = db.Column(db.Numeric(10, 2), nullable=False)
    total_npr = db.Column(db.Numeric(10, 2), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

    def to_dict(self, include_items: bool = True) -> dict:
        data = {
            "id": self.id,
            "order_number": self.order_number,
            "customer_name": self.customer_name,
            "customer_email": self.customer_email,
            "customer_phone": self.customer_phone,
            "shipping_address": self.shipping_address,
            "city": self.city,
            "notes": self.notes,
            "status": self.status.value,
            "payment_method": self.payment_method,
            "payment_status": self.payment_status.value,
            "subtotal_npr": float(self.subtotal_npr),
            "total_npr": float(self.total_npr),
            "created_at": to_utc_iso(self.created_at),
            "updated_at": to_utc_iso(self.updated_at),
        }
        if include_items:
            data["items"] = [item.to_dict() for item in self.items]
        return data


class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=True)
    variant_id = db.Column(db.Integer, db.ForeignKey("product_variant.id"), nullable=True)

    product_name_snapshot = db.Column(db.String(200), nullable=False)
    variant_label_snapshot = db.Column(db.String(60))
    unit_price_npr = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    line_total_npr = db.Column(db.Numeric(10, 2), nullable=False)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "product_id": self.product_id,
            "variant_id": self.variant_id,
            "product_name": self.product_name_snapshot,
            "variant_label": self.variant_label_snapshot,
            "unit_price_npr": float(self.unit_price_npr),
            "quantity": self.quantity,
            "line_total_npr": float(self.line_total_npr),
        }
