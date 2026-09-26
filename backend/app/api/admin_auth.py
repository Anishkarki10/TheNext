from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required

from app.extensions import db, limiter
from app.models import AdminUser, RevokedToken

bp = Blueprint("admin_auth", __name__, url_prefix="/api/admin")


@bp.post("/login")
@limiter.limit("5 per minute")  # brute-force guard - there's no account lockout otherwise
def login():
    body = request.get_json(silent=True) or {}
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""

    user = AdminUser.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": token, "user": user.to_dict()})


@bp.get("/me")
@jwt_required()
def me():
    user = AdminUser.query.get(int(get_jwt_identity()))
    if not user:
        return jsonify({"error": "Not found"}), 404
    return jsonify(user.to_dict())


@bp.post("/logout")
@jwt_required()
def logout():
    claims = get_jwt()
    # Opportunistic cleanup of entries whose underlying token has since
    # naturally expired anyway - no cron needed, this table stays small.
    RevokedToken.query.filter(RevokedToken.expires_at < datetime.now(timezone.utc).replace(tzinfo=None)).delete()

    db.session.add(
        RevokedToken(
            jti=claims["jti"],
            expires_at=datetime.fromtimestamp(claims["exp"], tz=timezone.utc).replace(tzinfo=None),
        )
    )
    db.session.commit()
    return "", 204
