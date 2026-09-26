"""eSewa ePay v2 integration.

Flow: the backend signs a payment form, the frontend auto-submits it to
eSewa's hosted payment page, eSewa redirects back with a base64-encoded
result payload - which we NEVER trust on its own. We always re-verify the
transaction server-side against eSewa's status-check API before marking an
order paid.

Docs: https://developer.esewa.com.np/pages/Epay-V2
"""

import base64
import hashlib
import hmac
import json

import requests
from flask import current_app


def build_payment_payload(order) -> dict:
    """Returns the signed form fields the frontend must POST to eSewa's initiate URL."""
    merchant_code = current_app.config["ESEWA_MERCHANT_CODE"]
    secret_key = current_app.config["ESEWA_SECRET_KEY"]
    frontend_url = current_app.config["FRONTEND_URL"]

    total_amount = f"{float(order.total_npr):.2f}"
    transaction_uuid = order.order_number

    # eSewa requires these three fields signed, in exactly this order.
    signed_field_names = "total_amount,transaction_uuid,product_code"
    message = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={merchant_code}"
    digest = hmac.new(secret_key.encode("utf-8"), message.encode("utf-8"), hashlib.sha256).digest()
    signature = base64.b64encode(digest).decode("utf-8")

    return {
        "amount": total_amount,
        "tax_amount": "0",
        "total_amount": total_amount,
        "transaction_uuid": transaction_uuid,
        "product_code": merchant_code,
        "product_service_charge": "0",
        "product_delivery_charge": "0",
        "success_url": f"{frontend_url}/payment/esewa/return?order_number={transaction_uuid}",
        "failure_url": f"{frontend_url}/payment/esewa/return?order_number={transaction_uuid}",
        "signed_field_names": signed_field_names,
        "signature": signature,
        "initiate_url": current_app.config["ESEWA_INITIATE_URL"],
    }


def decode_callback_data(data_b64: str) -> dict:
    """Decodes the base64 `data` query param eSewa appends to the return URL.

    This is informational only (e.g. to read which transaction_uuid to look
    up) - it must never be trusted as proof of payment on its own.
    """
    try:
        return json.loads(base64.b64decode(data_b64).decode("utf-8"))
    except (ValueError, TypeError, json.JSONDecodeError) as exc:
        raise ValueError("Invalid eSewa callback payload") from exc


def verify_payment(transaction_uuid: str, total_amount) -> bool:
    """Server-side status check against eSewa - the only source of truth for payment state."""
    merchant_code = current_app.config["ESEWA_MERCHANT_CODE"]
    status_url = current_app.config["ESEWA_STATUS_URL"]

    resp = requests.get(
        status_url,
        params={
            "product_code": merchant_code,
            "total_amount": f"{float(total_amount):.2f}",
            "transaction_uuid": transaction_uuid,
        },
        timeout=10,
    )
    resp.raise_for_status()
    body = resp.json()
    return body.get("status") == "COMPLETE"
