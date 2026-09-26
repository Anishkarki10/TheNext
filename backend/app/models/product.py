from app.extensions import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(120), unique=True, nullable=False, index=True)
    name = db.Column(db.String(200), nullable=False)
    sku = db.Column(db.String(60), unique=True, nullable=False)
    category = db.Column(db.String(80))
    short_description = db.Column(db.Text)
    description = db.Column(db.Text)
    is_available = db.Column(db.Boolean, default=True, nullable=False)

    ingredients = db.Column(db.JSON)  # {"Main Protein": [...], "Flavour": [...], "Oils": [...]}
    nutrition_facts = db.Column(db.JSON)  # [{"label": "Protein", "value": "21.37 g"}, ...]
    allergen_info = db.Column(db.Text)
    cooking_instructions = db.Column(db.Text)
    cooking_stats = db.Column(db.JSON)  # [{"label": "Cook temp", "value": "170-190C"}, ...]
    storage_info = db.Column(db.JSON)  # ["Keep frozen at -18C", ...]
    serving_ideas = db.Column(db.JSON)  # ["Momo", "Chow Mein", ...]
    faqs = db.Column(db.JSON)  # [{"q": "...", "a": "..."}]

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    variants = db.relationship(
        "ProductVariant", backref="product", cascade="all, delete-orphan", order_by="ProductVariant.sort_order"
    )
    images = db.relationship(
        "ProductImage", backref="product", cascade="all, delete-orphan", order_by="ProductImage.sort_order"
    )

    def to_dict(self, detailed: bool = False) -> dict:
        data = {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "sku": self.sku,
            "category": self.category,
            "short_description": self.short_description,
            "is_available": self.is_available,
            "images": [img.to_dict() for img in self.images],
            "variants": [v.to_dict() for v in self.variants],
        }
        if detailed:
            data.update(
                {
                    "description": self.description,
                    "ingredients": self.ingredients,
                    "nutrition_facts": self.nutrition_facts,
                    "allergen_info": self.allergen_info,
                    "cooking_instructions": self.cooking_instructions,
                    "cooking_stats": self.cooking_stats,
                    "storage_info": self.storage_info,
                    "serving_ideas": self.serving_ideas,
                    "faqs": self.faqs,
                }
            )
        return data


class ProductVariant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    label = db.Column(db.String(60), nullable=False)  # '500 g'
    pack_size = db.Column(db.String(60))  # '500g'
    price_npr = db.Column(db.Numeric(10, 2), nullable=True)  # null => enquiry-only, no fixed price
    is_enquiry_only = db.Column(db.Boolean, default=False, nullable=False)
    stock_qty = db.Column(db.Integer, default=0, nullable=False)
    sort_order = db.Column(db.Integer, default=0, nullable=False)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "label": self.label,
            "pack_size": self.pack_size,
            "price_npr": float(self.price_npr) if self.price_npr is not None else None,
            "is_enquiry_only": self.is_enquiry_only,
            "stock_qty": self.stock_qty,
            "sort_order": self.sort_order,
        }


class ProductImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    alt_text = db.Column(db.String(200))
    sort_order = db.Column(db.Integer, default=0, nullable=False)

    def to_dict(self) -> dict:
        return {"id": self.id, "url": self.url, "alt_text": self.alt_text, "sort_order": self.sort_order}
