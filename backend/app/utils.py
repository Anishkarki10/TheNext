from datetime import datetime


def to_utc_iso(dt: datetime | None) -> str | None:
    """Serializes a naive datetime (as stored by db.func.now(), which is always
    UTC) to an ISO string explicitly marked UTC with a 'Z' suffix - without
    this, JS `new Date(...)` silently treats an offset-less string as local
    time instead of UTC, shifting every displayed timestamp by the viewer's
    UTC offset."""
    if dt is None:
        return None
    return dt.isoformat() + "Z"
