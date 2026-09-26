import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, type Product } from '../lib/api'
import { useCart } from '../context/CartContext'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addedId, setAddedId] = useState<number | null>(null)
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    api
      .listProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const cartItemFor = (product: Product, variant: NonNullable<Product['variants'][number]>) => ({
    variantId: variant.id,
    productSlug: product.slug,
    productName: product.name,
    variantLabel: variant.label,
    unitPriceNpr: variant.price_npr as number,
    image: product.images[0] ? api.imageUrl(product.images[0].url) : undefined,
  })

  const handleAddToCart = (product: Product, variant: Product['variants'][number]) => {
    addItem(cartItemFor(product, variant))
    setAddedId(product.id)
    setTimeout(() => setAddedId((id) => (id === product.id ? null : id)), 1500)
  }

  const handleBuyNow = (product: Product, variant: Product['variants'][number]) => {
    addItem(cartItemFor(product, variant))
    navigate('/checkout')
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-[#264F24] py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&h=600&fit=crop&auto=format')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-3">
            Our Products
          </p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-[#F5EDE1] uppercase leading-none mb-6">
            Plant-Based<br />
            <span className="text-[#A8C879]">Protein</span>
          </h1>
          <p className="font-body text-[#F5EDE1]/70 max-w-xl leading-relaxed">
            Innovative plant-based meat alternatives made in Nepal. High-protein, meat-like texture, and endlessly versatile.
          </p>
        </div>
      </section>

      {/* Products intro */}
      <section className="bg-[#FCFAF6] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-body text-[#676A61] max-w-2xl leading-relaxed">
            We are proud to introduce our first product — Protein Loaf — crafted from carefully selected plant-based ingredients. More products are currently in development and will be announced soon.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="bg-[#F5EDE1] py-12 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          {loading && <p className="font-body text-[#676A61]">Loading products…</p>}
          {error && <p className="font-body text-red-700">Couldn't load products: {error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => {
              const retailVariant = product.variants.find((v) => !v.is_enquiry_only) ?? product.variants[0]
              return (
                <div key={product.id} className="max-w-2xl">
                  <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DDCD] shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden bg-[#E8DDCD]">
                      {product.images[0] && (
                        <img
                          src={api.imageUrl(product.images[0].url)}
                          alt={product.images[0].alt_text || product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {product.category && (
                              <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                                {product.category}
                              </span>
                            )}
                            <span className="px-2.5 py-1 rounded-full bg-[#A8C879]/20 text-[#264F24] font-body text-xs font-semibold">
                              {product.is_available ? '● Available' : 'Unavailable'}
                            </span>
                          </div>
                          <h2 className="font-display font-black text-3xl text-[#22231F] uppercase">{product.name}</h2>
                          <p className="font-body text-[#676A61] text-sm mt-1">SKU: {product.sku}</p>
                        </div>
                        {retailVariant?.price_npr != null && (
                          <div className="text-right flex-shrink-0">
                            <div className="font-display font-black text-2xl text-[#264F24]">NPR {retailVariant.price_npr}</div>
                            <div className="font-body text-xs text-[#676A61]">{retailVariant.label} retail pack</div>
                          </div>
                        )}
                      </div>

                      {product.short_description && (
                        <p className="font-body text-[#676A61] leading-relaxed mb-6">{product.short_description}</p>
                      )}

                      {retailVariant && !retailVariant.is_enquiry_only && retailVariant.price_npr != null && retailVariant.stock_qty > 0 ? (
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => handleBuyNow(product, retailVariant)}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors flex-1"
                            >
                              Buy Now
                            </button>
                            <button
                              onClick={() => handleAddToCart(product, retailVariant)}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors flex-1"
                            >
                              {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                            </button>
                          </div>
                          <Link
                            to={`/products/${product.slug}`}
                            className="inline-flex items-center justify-center font-body text-sm font-semibold text-[#264F24] hover:underline w-full"
                          >
                            View full details →
                          </Link>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={`/products/${product.slug}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors flex-1"
                          >
                            View Details
                          </Link>
                          <a
                            href={`https://wa.me/9779714504317?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors flex-1"
                          >
                            Enquire
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Coming soon */}
          <div className="mt-12 max-w-2xl">
            <div className="bg-[#E8DDCD] rounded-2xl p-8 border-2 border-dashed border-[#264F24]/20">
              <p className="font-display font-black text-xs tracking-[0.2em] uppercase text-[#557A35] mb-2">
                Coming Soon
              </p>
              <h3 className="font-display font-black text-2xl text-[#22231F] uppercase mb-3">
                More Products in Development
              </h3>
              <p className="font-body text-[#676A61] text-sm leading-relaxed mb-4">
                Our team is currently developing new plant-based products for the Nepalese market. Sign up to our newsletter or follow us on Instagram to be the first to know.
              </p>
              <a
                href="https://www.instagram.com/thenextproteinnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#264F24] hover:text-[#173A22]"
              >
                Follow on Instagram →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
