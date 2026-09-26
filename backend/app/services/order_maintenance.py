"""Releases stock reserved by abandoned orders.

`orders.py::create_order` decrements ProductVariant.stock_qty immediately so
two customers can't both "win" the last unit before either pays - but that
means an order that's created and then never paid (abandoned checkout, or
someone deliberately spamming POST /api/orders) would otherwise lock that
stock away forever. There's no task scheduler/cron in this stack, so instead
this runs opportunistically (called right before any stock-sensitive
operation - new order creation, payment initiation) and cancels anything
that's been sitting in pending_payment past STALE_ORDER_MINUTES, restoring
its stock. Self-healing without needing background infrastructure; combined
with rate limiting on order creation, this bounds how much stock a spam burst
can lock up and for how long.
"""

from datetime import datetime, timedelta, timezone

from app.extensions import db
from app.models import Order, OrderStatus, PaymentStatus, ProductVariant

STALE_ORDER_MINUTES = 30


def release_stale_pending_orders() -> int:
    # created_at is stored as a naive UTC datetime (db.func.now() on SQLite
    # has no tzinfo) - compare against a naive UTC "now" to match, rather
    # than the deprecated datetime.utcnow().
    cutoff = datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(minutes=STALE_ORDER_MINUTES)
    stale_orders = Order.query.filter(
        Order.status == OrderStatus.pending_payment,
        Order.created_at < cutoff,
    ).all()

    for order in stale_orders:
        for item in order.items:
            if item.variant_id:
                variant = ProductVariant.query.get(item.variant_id)
                if variant:
                    variant.stock_qty += item.quantity
        order.status = OrderStatus.cancelled
        if order.payment_status == PaymentStatus.unpaid:
            order.payment_status = PaymentStatus.failed

    if stale_orders:
        db.session.commit()
    return len(stale_orders)
