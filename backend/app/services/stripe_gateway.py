"""Stripe Checkout integration.

Flow: the backend creates a Checkout Session server-side (Stripe hosts the
actual payment page - we never touch card details), the browser is
redirected to Stripe, and Stripe redirects back to our success/cancel URL
with a `session_id`. Like eSewa, we NEVER trust the redirect
alone - we always re-retrieve the session server-side via Stripe's API and
check its `payment_status` before marking an order paid.

Docs: https://docs.stripe.com/checkout/quickstart

Note: NPR is a supported 2-decimal Stripe presentment currency, so amounts
are sent as paisa (NPR x 100) like any normal (non zero-decimal) currency -
no currency conversion needed even though Stripe has no Nepal-based
merchant accounts (see StripeNotConfiguredError below for what that means
for going live).
"""

import stripe
from flask import current_app


class StripeNotConfiguredError(RuntimeError):
    pass


def _client() -> None:
    secret_key = current_app.config["STRIPE_SECRET_KEY"]
    if not secret_key:
        raise StripeNotConfiguredError(
            "STRIPE_SECRET_KEY is not set - create a free Stripe account at "
            "https://dashboard.stripe.com/register and set your test secret key "
            "(sk_test_...) in backend/.env. Test mode works with any Stripe "
            "account regardless of country."
        )
    stripe.api_key = secret_key


def create_checkout_session(order) -> dict:
    """Creates a Stripe Checkout Session and returns {id, url}."""
    _client()
    frontend_url = current_app.config["FRONTEND_URL"]

    session = stripe.checkout.Session.create(
        mode="payment",
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": "npr",
                    "product_data": {"name": f"Order {order.order_number}"},
                    "unit_amount": int(round(float(order.total_npr) * 100)),
                },
                "quantity": 1,
            }
        ],
        metadata={"order_number": order.order_number},
        success_url=f"{frontend_url}/payment/stripe/return?order_number={order.order_number}&session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{frontend_url}/payment/stripe/return?order_number={order.order_number}&canceled=true",
    )
    return {"id": session.id, "url": session.url}


def retrieve_session(session_id: str) -> dict:
    """Server-side lookup against Stripe - the only source of truth for payment state."""
    _client()
    session = stripe.checkout.Session.retrieve(session_id)
    return {
        "payment_status": session.payment_status,  # 'paid' | 'unpaid' | 'no_payment_required'
        "payment_intent": session.payment_intent,
        "metadata": session.metadata,
    }
