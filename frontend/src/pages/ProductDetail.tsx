import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, type Product, type ProductVariant } from '../lib/api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    api
      .getProduct(slug)
      .then((p) => {
        setProduct(p)
        setSelectedVariant(p.variants[0] ?? null)
        setSelectedImage(0)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="pt-32 pb-32 text-center font-body text-[#676A61]">Loading…</div>
  }
  if (error || !product) {
    return (
      <div className="pt-32 pb-32 text-center font-body text-[#676A61]">
        {error || 'Product not found.'}
      </div>
    )
  }

  const gallery = product.images.length ? product.images : []
  const whatsappHref = `https://wa.me/9779714504317?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.name} - please provide more details`,
  )}`

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.is_enquiry_only || selectedVariant.price_npr == null) return
    addItem(
      {
        variantId: selectedVariant.id,
        productSlug: product.slug,
        productName: product.name,
        variantLabel: selectedVariant.label,
        unitPriceNpr: selectedVariant.price_npr,
        image: gallery[0] ? api.imageUrl(gallery[0].url) : undefined,
      },
      quantity,
    )
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-[#F5EDE1] border-b border-[#E8DDCD]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 text-xs font-body text-[#676A61]">
          <Link to="/" className="hover:text-[#264F24]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#264F24]">Products</Link>
          <span>/</span>
          <span className="text-[#22231F] font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <section className="bg-[#FCFAF6] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Gallery */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#E8DDCD] mb-4">
                {gallery[selectedImage] && (
                  <img
                    src={api.imageUrl(gallery[selectedImage].url)}
                    alt={gallery[selectedImage].alt_text || product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {gallery.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-[#264F24]' : 'border-transparent'
                      }`}
                    >
                      <img src={api.imageUrl(img.url)} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {product.category && (
                  <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                    {product.category}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-[#A8C879]/20 text-[#264F24] font-body text-xs font-semibold">
                  {product.is_available ? '● Available' : 'Unavailable'}
                </span>
              </div>

              <h1 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none mb-2">
                {product.name}
              </h1>
              <p className="font-body text-xs text-[#676A61] mb-4">SKU: {product.sku}</p>

              {product.description && (
                <p className="font-body text-[#676A61] leading-relaxed mb-6">{product.description}</p>
              )}

              {/* Pack selector */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <p className="font-body text-sm font-semibold text-[#22231F] mb-3">Package Size</p>
                  <div className="flex gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setQuantity(1)
                        }}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-left transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'border-[#264F24] bg-[#264F24]/5'
                            : 'border-[#E8DDCD] hover:border-[#264F24]/50'
                        }`}
                      >
                        <div className="font-display font-black text-sm text-[#22231F]">{variant.label}</div>
                        <div className="font-body text-xs text-[#676A61]">
                          {variant.is_enquiry_only || variant.price_npr == null
                            ? 'Enquire for Wholesale'
                            : `NPR ${variant.price_npr} (Retail)`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              {selectedVariant && !selectedVariant.is_enquiry_only && selectedVariant.price_npr != null ? (
                <div className="mb-6">
                  <div className="font-display font-black text-3xl text-[#264F24]">NPR {selectedVariant.price_npr}</div>
                  <p className="font-body text-xs text-[#676A61]">Retail price for {selectedVariant.label} pack</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="font-display font-black text-xl text-[#264F24]">Wholesale Price</div>
                  <p className="font-body text-sm text-[#676A61]">Available by enquiry. Contact us for food-service pricing.</p>
                </div>
              )}

              {/* Add to cart (only for orderable variants) */}
              {selectedVariant && !selectedVariant.is_enquiry_only && selectedVariant.price_npr != null && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border-2 border-[#E8DDCD] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 font-display font-bold text-[#264F24]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 font-body text-sm font-semibold text-[#22231F]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedVariant.stock_qty || 99, q + 1))}
                      className="px-3 py-2 font-display font-bold text-[#264F24]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedVariant.stock_qty < 1}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {selectedVariant.stock_qty < 1 ? 'Out of Stock' : justAdded ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              )}
              {justAdded && (
                <button
                  onClick={() => navigate('/cart')}
                  className="mb-6 font-body text-sm font-semibold text-[#264F24] underline"
                >
                  View Cart →
                </button>
              )}

              <div className="flex flex-col gap-3 mb-8">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366] text-white font-body font-bold text-sm hover:bg-[#20BA5A] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
                <Link
                  to="/wholesale"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors"
                >
                  Contact for Wholesale
                </Link>
              </div>

              {/* Allergen warning */}
              {product.allergen_info && (
                <div className="bg-[#FFF8F0] border border-[#E8DDCD] rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30251D" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <p className="font-body text-sm font-bold text-[#30251D] mb-1">
                        Allergen Information
                      </p>
                      <p className="font-body text-xs text-[#676A61]">
                        <strong>{product.allergen_info}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Ingredients, Nutrition, Cooking + Storage */}
      {(product.ingredients || product.nutrition_facts || product.cooking_instructions || product.storage_info) && (
        <section className="bg-[#F5EDE1] py-16">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Ingredients */}
              {product.ingredients && (
                <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                  <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Ingredients</h2>
                  <div className="space-y-3">
                    {Object.entries(product.ingredients).map(([group, items]) => (
                      <div key={group}>
                        <p className="font-body text-xs font-bold text-[#264F24] uppercase tracking-wider mb-1">{group}</p>
                        <ul className="font-body text-sm text-[#676A61] space-y-1">
                          {items.map((i) => <li key={i}>· {i}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition */}
              {product.nutrition_facts && (
                <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                  <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-1">Nutrition Facts</h2>
                  <p className="font-body text-xs text-[#676A61] mb-4">Per 100 g · Serving size: 100 g</p>
                  <div className="space-y-3 border-t border-[#E8DDCD] pt-3">
                    {product.nutrition_facts.map((row) => (
                      <div key={row.label} className="flex justify-between items-baseline border-b border-[#E8DDCD] pb-2">
                        <span className="font-body text-sm text-[#22231F]">{row.label}</span>
                        <span className="font-display font-black text-sm text-[#264F24]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-xs text-[#676A61] mt-4 italic">
                    Laboratory analysed by Miron Laboratory and Research Centre.
                  </p>
                </div>
              )}

              {/* Cooking + Storage */}
              {(product.cooking_instructions || product.storage_info) && (
                <div className="space-y-6">
                  {product.cooking_instructions && (
                    <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                      <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Cooking Instructions</h2>
                      <p className="font-body text-sm text-[#676A61] leading-relaxed mb-3">
                        {product.cooking_instructions}
                      </p>
                      {product.cooking_stats && (
                        <div className="flex gap-3 mt-3">
                          {product.cooking_stats.map((stat) => (
                            <div key={stat.label} className="bg-[#F5EDE1] rounded-lg px-3 py-2 text-center">
                              <div className="font-display font-black text-sm text-[#264F24]">{stat.value}</div>
                              <div className="font-body text-xs text-[#676A61]">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {product.storage_info && (
                    <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                      <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Storage</h2>
                      <ul className="space-y-2">
                        {product.storage_info.map((item) => (
                          <li key={item} className="flex items-start gap-2 font-body text-xs text-[#676A61]">
                            <span className="text-[#264F24] font-bold mt-0.5">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Serving suggestions */}
            {product.serving_ideas && product.serving_ideas.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display font-black text-3xl uppercase text-[#22231F] mb-6">Serving Ideas</h2>
                <div className="flex flex-wrap gap-3">
                  {product.serving_ideas.map((idea) => (
                    <span key={idea} className="px-4 py-2 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-sm font-semibold">
                      {idea}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display font-black text-3xl uppercase text-[#22231F] mb-6">Frequently Asked</h2>
                <div className="space-y-3 max-w-3xl">
                  {product.faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-[#E8DDCD] overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                      >
                        <span className="font-body font-semibold text-sm text-[#22231F]">{faq.q}</span>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`flex-shrink-0 text-[#264F24] transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-4">
                          <p className="font-body text-sm text-[#676A61] leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Where to buy */}
            <div className="mt-12 bg-[#264F24] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-black text-xl uppercase text-[#F5EDE1] mb-2">Where to Buy</h3>
                <p className="font-body text-sm text-[#F5EDE1]/70">
                  Order online above, or contact us directly to find out where {product.name} is currently available in your area.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/9779714504317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#FCFAF6] transition-colors whitespace-nowrap"
                >
                  Ask on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-full border-2 border-[#F5EDE1]/40 text-[#F5EDE1] font-body font-bold text-sm hover:border-[#A8C879] hover:text-[#A8C879] transition-colors whitespace-nowrap"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
