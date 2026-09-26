from flask import Blueprint, jsonify

from app.models import Product

bp = Blueprint("products", __name__, url_prefix="/api/products")


@bp.get("")
def list_products():
    products = Product.query.filter_by(is_available=True).order_by(Product.id).all()
    return jsonify([p.to_dict() for p in products])


@bp.get("/<slug>")
def get_product(slug):
    product = Product.query.filter_by(slug=slug).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict(detailed=True))
