import re

from flask import Blueprint, jsonify, request

from app.extensions import db, limiter
from app.models import Enquiry

bp = Blueprint("enquiries", __name__, url_prefix="/api/enquiries")

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


@bp.post("")
@limiter.limit("5 per minute")
def create_enquiry():
    body = request.get_json(silent=True) or {}

    errors = {}
    if not body.get("name", "").strip():
        errors["name"] = "Full name is required"
    email = body.get("email", "").strip()
    if not email:
        errors["email"] = "Email address is required"
    elif not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address"
    if not body.get("enquiry_type"):
        errors["enquiry_type"] = "Please select an enquiry type"
    if not body.get("message", "").strip():
        errors["message"] = "Message is required"
    if not body.get("consent"):
        errors["consent"] = "Please confirm your consent"
    if errors:
        return jsonify({"errors": errors}), 400

    enquiry = Enquiry(
        name=body["name"].strip(),
        email=email,
        phone=body.get("phone") or None,
        org=body.get("org") or None,
        enquiry_type=body["enquiry_type"],
        subject=body.get("subject") or None,
        message=body["message"].strip(),
        contact_method=body.get("contact_method") or None,
        consent=bool(body.get("consent")),
    )
    db.session.add(enquiry)
    db.session.commit()

    return jsonify(enquiry.to_dict()), 201
