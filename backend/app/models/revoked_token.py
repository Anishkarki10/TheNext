from app.extensions import db


class RevokedToken(db.Model):
    """JWTs added here (on logout) are rejected even though they haven't
    naturally expired yet - without this, a stolen/leaked admin token stays
    valid for its full lifetime with no way to cut it off early."""

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), unique=True, nullable=False, index=True)
    expires_at = db.Column(db.DateTime, nullable=False)
    revoked_at = db.Column(db.DateTime, server_default=db.func.now())
