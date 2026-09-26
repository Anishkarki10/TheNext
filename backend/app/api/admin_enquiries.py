from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Enquiry, EnquiryStatus
from app.services.audit import log_admin_action

bp = Blueprint("admin_enquiries", __name__, url_prefix="/api/admin/enquiries")

PAGE_SIZE = 25


@bp.get("")
@jwt_required()
def list_enquiries():
    query = Enquiry.query.order_by(Enquiry.created_at.desc())

    status = request.args.get("status")
    if status:
        try:
            query = query.filter(Enquiry.status == EnquiryStatus(status))
        except ValueError:
            return jsonify({"error": f"Invalid status '{status}'"}), 400

    page = max(int(request.args.get("page", 1)), 1)
    pagination = query.paginate(page=page, per_page=PAGE_SIZE, error_out=False)

    return jsonify(
        {
            "enquiries": [e.to_dict() for e in pagination.items],
            "page": page,
            "total_pages": pagination.pages,
            "total_enquiries": pagination.total,
            "unread_count": Enquiry.query.filter(Enquiry.status == EnquiryStatus.new).count(),
        }
    )


@bp.get("/<int:enquiry_id>")
@jwt_required()
def get_enquiry(enquiry_id):
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    # Viewing an enquiry implicitly marks it read, same as an email inbox.
    if enquiry.status == EnquiryStatus.new:
        enquiry.status = EnquiryStatus.read
        db.session.commit()
    return jsonify(enquiry.to_dict())


@bp.patch("/<int:enquiry_id>/status")
@jwt_required()
def update_status(enquiry_id):
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    body = request.get_json(silent=True) or {}

    try:
        new_status = EnquiryStatus(body.get("status"))
    except (ValueError, TypeError):
        return jsonify({"error": f"Invalid status '{body.get('status')}'", "valid": [s.value for s in EnquiryStatus]}), 400

    log_admin_action(
        "enquiry.status_update",
        target_type="enquiry",
        target_id=enquiry.id,
        details={"from": enquiry.status.value, "to": new_status.value},
    )
    enquiry.status = new_status
    db.session.commit()
    return jsonify(enquiry.to_dict())
