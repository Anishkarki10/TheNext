from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db


class AdminUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def set_password(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def to_dict(self) -> dict:
        return {"id": self.id, "email": self.email, "name": self.name}
