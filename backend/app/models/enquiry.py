import enum

from app.extensions import db
from app.utils import to_utc_iso


class EnquiryStatus(enum.Enum):
    new = "new"
    read = "read"
    responded = "responded"


class Enquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(30))
    org = db.Column(db.String(150))
    enquiry_type = db.Column(db.String(80), nullable=False)
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    contact_method = db.Column(db.String(30))
    consent = db.Column(db.Boolean, default=False, nullable=False)
    status = db.Column(db.Enum(EnquiryStatus), default=EnquiryStatus.new, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "org": self.org,
            "enquiry_type": self.enquiry_type,
            "subject": self.subject,
            "message": self.message,
            "contact_method": self.contact_method,
            "consent": self.consent,
            "status": self.status.value,
            "created_at": to_utc_iso(self.created_at),
        }
