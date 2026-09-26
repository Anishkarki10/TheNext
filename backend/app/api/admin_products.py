from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Product, ProductImage, ProductVariant
from app.services.audit import log_admin_action
from app.services.uploads import InvalidUploadError, save_product_image

bp = Blueprint("admin_products", __name__, url_prefix="/api/admin/products")


@bp.get("")
@jwt_required()
def list_products():
    products = Product.query.order_by(Product.id.desc()).all()
    return jsonify([p.to_dict() for p in products])


@bp.post("")
@jwt_required()
def create_product():
    body = request.get_json(silent=True) or {}

    for field in ("slug", "name", "sku"):
        if not body.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    if Product.query.filter_by(slug=body["slug"]).first():
        return jsonify({"error": f"Slug '{body['slug']}' is already in use"}), 409
    if Product.query.filter_by(sku=body["sku"]).first():
        return jsonify({"error": f"SKU '{body['sku']}' is already in use"}), 409

    product = Product(
        slug=body["slug"],
        name=body["name"],
        sku=body["sku"],
        category=body.get("category"),
        short_description=body.get("short_description"),
        description=body.get("description"),
        is_available=body.get("is_available", True),
        ingredients=body.get("ingredients"),
        nutrition_facts=body.get("nutrition_facts"),
        allergen_info=body.get("allergen_info"),
        cooking_instructions=body.get("cooking_instructions"),
        cooking_stats=body.get("cooking_stats"),
        storage_info=body.get("storage_info"),
        serving_ideas=body.get("serving_ideas"),
        faqs=body.get("faqs"),
    )
    _sync_variants(product, body.get("variants", []))

    db.session.add(product)
    db.session.flush()  # assigns product.id before the log entry references it
    log_admin_action("product.create", target_type="product", target_id=product.id, details={"name": product.name, "sku": product.sku})
    db.session.commit()
    return jsonify(product.to_dict(detailed=True)), 201


@bp.get("/<int:product_id>")
@jwt_required()
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict(detailed=True))


@bp.put("/<int:product_id>")
@jwt_required()
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    body = request.get_json(silent=True) or {}

    if "slug" in body and body["slug"] != product.slug:
        if Product.query.filter_by(slug=body["slug"]).first():
            return jsonify({"error": f"Slug '{body['slug']}' is already in use"}), 409
    if "sku" in body and body["sku"] != product.sku:
        if Product.query.filter_by(sku=body["sku"]).first():
            return jsonify({"error": f"SKU '{body['sku']}' is already in use"}), 409

    simple_fields = (
        "slug",
        "name",
        "sku",
        "category",
        "short_description",
        "description",
        "is_available",
        "ingredients",
        "nutrition_facts",
        "allergen_info",
        "cooking_instructions",
        "cooking_stats",
        "storage_info",
        "serving_ideas",
        "faqs",
    )
    for field in simple_fields:
        if field in body:
            setattr(product, field, body[field])

    if "variants" in body:
        _sync_variants(product, body["variants"])

    log_admin_action("product.update", target_type="product", target_id=product.id, details={"fields": sorted(body.keys())})
    db.session.commit()
    return jsonify(product.to_dict(detailed=True))


@bp.delete("/<int:product_id>")
@jwt_required()
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    log_admin_action("product.delete", target_type="product", target_id=product.id, details={"name": product.name, "sku": product.sku})
    db.session.delete(product)
    db.session.commit()
    return "", 204


def _sync_variants(product: Product, variants_data: list) -> None:
    """Replaces the product's variant set with the given list.

    Existing order-item snapshots aren't affected since they only reference
    variant_id loosely (nullable FK) and store their own name/price copy.
    """
    existing_by_id = {v.id: v for v in product.variants}
    keep_ids = set()

    for index, v in enumerate(variants_data):
        variant_id = v.get("id")
        if variant_id and variant_id in existing_by_id:
            variant = existing_by_id[variant_id]
            keep_ids.add(variant_id)
        else:
            variant = ProductVariant()
            product.variants.append(variant)

        variant.label = v.get("label", variant.label if variant_id else "")
        variant.pack_size = v.get("pack_size")
        variant.price_npr = v.get("price_npr")
        variant.is_enquiry_only = v.get("is_enquiry_only", False)
        variant.stock_qty = v.get("stock_qty", 0)
        variant.sort_order = v.get("sort_order", index)

    for variant_id, variant in existing_by_id.items():
        if variant_id not in keep_ids:
            db.session.delete(variant)


@bp.post("/<int:product_id>/images")
@jwt_required()
def upload_image(product_id):
    product = Product.query.get_or_404(product_id)

    file = request.files.get("file")
    try:
        url = save_product_image(file)
    except InvalidUploadError as exc:
        return jsonify({"error": str(exc)}), 400

    image = ProductImage(
        product_id=product.id,
        url=url,
        alt_text=request.form.get("alt_text", product.name),
        sort_order=len(product.images),
    )
    db.session.add(image)
    log_admin_action("product.image_upload", target_type="product", target_id=product.id)
    db.session.commit()
    return jsonify(image.to_dict()), 201


@bp.delete("/<int:product_id>/images/<int:image_id>")
@jwt_required()
def delete_image(product_id, image_id):
    image = ProductImage.query.filter_by(id=image_id, product_id=product_id).first_or_404()
    log_admin_action("product.image_delete", target_type="product", target_id=product_id, details={"image_id": image_id})
    db.session.delete(image)
    db.session.commit()
    return "", 204


uploads_bp = Blueprint("uploads", __name__, url_prefix="/uploads")


@uploads_bp.get("/<path:filename>")
def serve_upload(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
