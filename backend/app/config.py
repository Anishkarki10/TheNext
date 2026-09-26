import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # backend/
DEFAULT_SQLITE_PATH = os.path.join(BASE_DIR, "instance", "app.db")


class Config:
    # 'production' enables a boot-time check (see app/__init__.py) that refuses
    # to start if SECRET_KEY/JWT_SECRET_KEY are still their insecure dev
    # defaults below - set APP_ENV=production on any real deployment.
    APP_ENV = os.environ.get("APP_ENV", "development")

    # These defaults exist only so local dev works with zero setup. They are
    # NOT safe for any real deployment - anyone who reads this file (or this
    # project's history) knows them, and JWT_SECRET_KEY in particular lets an
    # attacker forge a valid admin auth token if left unchanged.
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key-change-me")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-key-change-me")

    # Rate-limit storage: in-memory by default (fine for a single process /
    # local dev). A production deployment running multiple worker processes
    # needs a shared backend (e.g. Redis) or each worker enforces its own
    # independent limit - set RATELIMIT_STORAGE_URI (e.g. redis://...) then.
    RATELIMIT_STORAGE_URI = os.environ.get("RATELIMIT_STORAGE_URI", "memory://")

    # Relative sqlite:/// URIs resolve against the process's CWD, which is
    # fragile (breaks depending on where `flask` is invoked from). Default
    # to an absolute path instead; DATABASE_URL still overrides for Postgres.
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", f"sqlite:///{DEFAULT_SQLITE_PATH}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CORS_ORIGINS = [
        origin.strip()
        for origin in os.environ.get("CORS_ORIGINS", "http://localhost:8443,http://localhost:5174").split(",")
        if origin.strip()
    ]

    UPLOAD_FOLDER = os.environ.get(
        "UPLOAD_FOLDER", os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
    )
    MAX_CONTENT_LENGTH = 8 * 1024 * 1024  # 8 MB max upload

    # eSewa/Stripe are fully built but turned off for the initial launch (re-add
    # by including them here, or via env, once ready) - COD-only for now. This
    # is the single gate checked by both order creation (orders.py) and the
    # payment initiate endpoints (payments.py), so a direct API call can't
    # bypass the checkout UI to use a disabled method either.
    ENABLED_PAYMENT_METHODS = {
        m.strip()
        for m in os.environ.get("ENABLED_PAYMENT_METHODS", "cod").split(",")
        if m.strip()
    }

    ESEWA_MERCHANT_CODE = os.environ.get("ESEWA_MERCHANT_CODE", "EPAYTEST")
    ESEWA_SECRET_KEY = os.environ.get("ESEWA_SECRET_KEY", "8gBm/:&EnhH.1/q")
    ESEWA_INITIATE_URL = os.environ.get(
        "ESEWA_INITIATE_URL", "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    )
    # Per official docs (developer.esewa.com.np/pages/Epay): sandbox status-check
    # lives on rc.esewa.com.np, NOT uat.esewa.com.np or the rc-epay initiate host.
    ESEWA_STATUS_URL = os.environ.get(
        "ESEWA_STATUS_URL", "https://rc.esewa.com.np/api/epay/transaction/status/"
    )

    STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "")

    # Where the frontend lives, used to build payment success/failure redirect targets
    FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:8443")
