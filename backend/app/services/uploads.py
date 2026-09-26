import os
import uuid

from flask import current_app
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif"}

# Magic-byte signatures for each allowed type - checked against the file's
# actual bytes, not just its filename, so someone can't upload arbitrary
# content by simply naming it "x.png". A signature family (jpg/jpeg) maps to
# more than one possible extension.
_SIGNATURES: dict[str, tuple[bytes, ...]] = {
    "png": (b"\x89PNG\r\n\x1a\n",),
    "jpg": (b"\xff\xd8\xff",),
    "jpeg": (b"\xff\xd8\xff",),
    "gif": (b"GIF87a", b"GIF89a"),
    "webp": (b"RIFF",),  # full check (RIFF....WEBP) done below - offset 8
}


class InvalidUploadError(ValueError):
    pass


def _extension(filename: str) -> str:
    return filename.rsplit(".", 1)[-1].lower() if "." in filename else ""


def _matches_signature(header: bytes, ext: str) -> bool:
    signatures = _SIGNATURES.get(ext, ())
    if not any(header.startswith(sig) for sig in signatures):
        return False
    if ext == "webp":
        return header[8:12] == b"WEBP"
    return True


def save_product_image(file: FileStorage) -> str:
    """Saves an uploaded image to the uploads folder and returns its public URL path."""
    if not file or not file.filename:
        raise InvalidUploadError("No file provided")

    ext = _extension(file.filename)
    if ext not in ALLOWED_EXTENSIONS:
        raise InvalidUploadError(f"Unsupported file type: .{ext}")

    header = file.stream.read(16)
    file.stream.seek(0)
    if not _matches_signature(header, ext):
        raise InvalidUploadError(f"File content doesn't look like a valid .{ext} image")

    upload_folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)

    filename = secure_filename(f"{uuid.uuid4().hex}.{ext}")
    file.save(os.path.join(upload_folder, filename))

    return f"/uploads/{filename}"
