import os

import click
from flask import Flask

from app.extensions import db
from app.models import AdminUser, Product, ProductImage, ProductVariant


def register(app: Flask) -> None:
    app.cli.add_command(seed_admin)
    app.cli.add_command(seed_products)


@click.command("seed-admin")
@click.option("--email", default=None, help="Falls back to $ADMIN_EMAIL if not passed.")
@click.option("--password", default=None, help="Falls back to $ADMIN_PASSWORD if not passed.")
@click.option("--name", default=None, help="Falls back to $ADMIN_NAME, then 'Admin'.")
def seed_admin(email: str | None, password: str | None, name: str | None) -> None:
    """Create (or update the password of) an admin user. No public signup exists - use this instead.

    Prefers ADMIN_EMAIL/ADMIN_PASSWORD/ADMIN_NAME env vars (e.g. from .env or
    a deploy platform's secret store) over CLI flags, so the password never
    has to be typed as a literal argument (which would otherwise land in
    shell history and the process list). Safe to run on every deploy - it
    updates the existing admin's password/name if one already exists, rather
    than erroring or duplicating.
    """
    email = email or os.environ.get("ADMIN_EMAIL")
    password = password or os.environ.get("ADMIN_PASSWORD")
    name = name or os.environ.get("ADMIN_NAME", "Admin")

    if not email:
        raise click.UsageError("No email given - pass --email or set ADMIN_EMAIL.")
    if not password:
        raise click.UsageError("No password given - pass --password or set ADMIN_PASSWORD.")
    if len(password) < 10:
        raise click.UsageError("Password must be at least 10 characters - this account has full admin access.")
    email = email.strip().lower()
    user = AdminUser.query.filter_by(email=email).first()
    if user:
        user.set_password(password)
        user.name = name
        click.echo(f"Updated password for existing admin '{email}'.")
    else:
        user = AdminUser(email=email, name=name)
        user.set_password(password)
        db.session.add(user)
        click.echo(f"Created admin '{email}'.")
    db.session.commit()


@click.command("seed-products")
def seed_products() -> None:
    """Insert the real Protein Loaf product, consolidating the data that used to be
    hardcoded independently (and inconsistently) across Products.tsx, ProductDetail.tsx
    and Home.tsx in the frontend."""
    if Product.query.filter_by(slug="protein-loaf").first():
        click.echo("Product 'protein-loaf' already exists, skipping.")
        return

    product = Product(
        slug="protein-loaf",
        name="Protein Loaf",
        sku="TNP-PL-888",
        category="Plant-Based Meat Alternative",
        short_description="A high-protein vegan meat alternative made primarily from wheat gluten, soybeans and mixed beans.",
        description=(
            "Protein Loaf is a high-protein vegan meat alternative made primarily from wheat gluten, "
            "soybeans and mixed beans. It provides a firm, meat-like texture and can be sliced, diced, "
            "marinated, grilled, fried or added to everyday meals."
        ),
        is_available=True,
        ingredients={
            "Main Protein": ["Vital wheat gluten (seitan)", "Soybeans", "Mixed beans"],
            "Flavour": ["Black pepper", "Cumin", "Coriander", "Cardamom", "Chilli flakes", "Bay leaves", "Salt"],
            "Oils": ["Olive oil", "Mustard-seed oil", "Sesame-seed oil"],
        },
        nutrition_facts=[
            {"label": "Protein", "value": "21.37g"},
            {"label": "Total Carbohydrate", "value": "19.19g"},
            {"label": "Total Fat", "value": "0.52g"},
            {"label": "Cholesterol", "value": "0"},
            {"label": "Added Sugar", "value": "0g"},
            {"label": "Moisture", "value": "53.67g"},
            {"label": "Ash", "value": "5.25g"},
        ],
        allergen_info="Contains wheat/gluten, soy and sesame.",
        cooking_instructions=(
            "Thaw before use - either overnight in a refrigerator or in cold water in its sealed packaging. "
            "Air-fry at 170-190C until heated through and lightly browned."
        ),
        cooking_stats=[
            {"label": "Cook temp", "value": "170-190C"},
            {"label": "Internal temp", "value": "75C min"},
            {"label": "Prep time", "value": "5-10 min"},
        ],
        storage_info=[
            "Keep frozen at -18C",
            "Shelf life: 12 months frozen",
            "Thaw before use in a refrigerator or cold water",
            "Do not refreeze after thawing",
            "Keep sealed until ready to use",
            "Cook thoroughly before eating",
        ],
        serving_ideas=[
            "Momo",
            "Chow Mein",
            "Curry",
            "Stir Fry",
            "Wrap",
            "BBQ",
            "Achar",
            "Choila",
            "Burger",
            "Nuggets",
            "Biryani",
            "Chilli",
        ],
        faqs=[
            {
                "q": "What is Protein Loaf?",
                "a": (
                    "Protein Loaf is a high-protein vegan meat alternative made primarily from wheat gluten, "
                    "soybeans and mixed beans. It provides a firm, meat-like texture and can be sliced, diced, "
                    "marinated, grilled, fried or added to everyday meals."
                ),
            },
            {"q": "Is it completely vegan?", "a": "Yes. Protein Loaf contains no animal-derived ingredients and is suitable for vegans and vegetarians."},
            {"q": "What is its main protein source?", "a": "The primary protein source is vital wheat gluten (seitan), supplemented with soybeans and mixed beans."},
            {"q": "Does it need to be thawed before cooking?", "a": "Yes. Thaw before use - either overnight in a refrigerator or in cold water in its sealed packaging."},
            {"q": "Can it be air-fried?", "a": "Yes. Air-fry at 170-190C until heated through and lightly browned."},
        ],
    )

    product.images = [
        ProductImage(url="/static/seed/protein-loaf-1.png", alt_text="Protein Loaf", sort_order=0),
        ProductImage(url="/static/seed/protein-loaf-2.png", alt_text="Protein Loaf", sort_order=1),
        ProductImage(url="/static/seed/protein-loaf-3.png", alt_text="Protein Loaf", sort_order=2),
    ]
    product.variants = [
        ProductVariant(label="500 g", pack_size="500g", price_npr=350, is_enquiry_only=False, stock_qty=100, sort_order=0),
        ProductVariant(label="1 kg", pack_size="1kg", price_npr=None, is_enquiry_only=True, stock_qty=0, sort_order=1),
    ]

    db.session.add(product)
    db.session.commit()
    click.echo("Seeded product 'protein-loaf'.")
