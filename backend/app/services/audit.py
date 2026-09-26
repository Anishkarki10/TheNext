from flask_jwt_extended import get_jwt_identity

from app.extensions import db
from app.models import AdminAuditLog, AdminUser


def log_admin_action(action: str, target_type: str | None = None, target_id: int | None = None, details: dict | None = None) -> None:
    """Adds an audit log entry to the current DB session - does NOT commit,
    so it lands in the same transaction as whatever change it's logging
    (atomic: both happen or neither does). Only call from inside an already
    @jwt_required()-protected route, after auth has succeeded."""
    admin_id = int(get_jwt_identity())
    user = AdminUser.query.get(admin_id)
    db.session.add(
        AdminAuditLog(
            admin_user_id=admin_id,
            admin_email_snapshot=user.email if user else "unknown",
            action=action,
            target_type=target_type,
            target_id=target_id,
            details=details,
        )
    )
