from app.extensions import db
from app.utils import to_utc_iso


class AdminAuditLog(db.Model):
    """Records who changed what and when, so a compromised/misused admin
    account leaves a trail instead of silently mutating data with no record."""

    id = db.Column(db.Integer, primary_key=True)
    admin_user_id = db.Column(db.Integer, db.ForeignKey("admin_user.id"), nullable=True)
    admin_email_snapshot = db.Column(db.String(150), nullable=False)
    action = db.Column(db.String(80), nullable=False)  # e.g. 'product.create', 'order.status_update'
    target_type = db.Column(db.String(40))  # 'product' | 'order' | 'enquiry'
    target_id = db.Column(db.Integer)
    details = db.Column(db.JSON)  # small structured extra info, e.g. {"from": "...", "to": "..."}
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "admin_email": self.admin_email_snapshot,
            "action": self.action,
            "target_type": self.target_type,
            "target_id": self.target_id,
            "details": self.details,
            "created_at": to_utc_iso(self.created_at),
        }
