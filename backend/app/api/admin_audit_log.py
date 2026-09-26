from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.models import AdminAuditLog

bp = Blueprint("admin_audit_log", __name__, url_prefix="/api/admin/audit-log")

PAGE_SIZE = 50


@bp.get("")
@jwt_required()
def list_audit_log():
    query = AdminAuditLog.query.order_by(AdminAuditLog.created_at.desc())

    page = max(int(request.args.get("page", 1)), 1)
    pagination = query.paginate(page=page, per_page=PAGE_SIZE, error_out=False)

    return jsonify(
        {
            "entries": [e.to_dict() for e in pagination.items],
            "page": page,
            "total_pages": pagination.pages,
            "total_entries": pagination.total,
        }
    )
