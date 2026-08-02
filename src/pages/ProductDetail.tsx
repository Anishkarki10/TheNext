import { useState } from 'react'
import { Link } from 'react-router-dom'
import product from "./../../assets/PF-1.png"
import product2 from "./../../assets/PL-2.png"
import product3 from "./../../assets/PL-3.png"

const gallery = [
  product,product2,product3
]

const faqs = [
  { q: 'What is Protein Loaf?', a: 'Protein Loaf is a high-protein vegan meat alternative made primarily from wheat gluten, soybeans and mixed beans. It provides a firm, meat-like texture and can be sliced, diced, marinated, grilled, fried or added to everyday meals.' },
  { q: 'Is it completely vegan?', a: 'Yes. Protein Loaf contains no animal-derived ingredients and is suitable for vegans and vegetarians.' },
  { q: 'What is its main protein source?', a: 'The primary protein source is vital wheat gluten (seitan), supplemented with soybeans and mixed beans.' },
  { q: 'Does it need to be thawed before cooking?', a: 'Yes. Thaw before use — either overnight in a refrigerator or in cold water in its sealed packaging.' },
  { q: 'Can it be air-fried?', a: 'Yes. Air-fry at 170–190°C until heated through and lightly browned.' },
]

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPack, setSelectedPack] = useState('500g')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-[#F5EDE1] border-b border-[#E8DDCD]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 text-xs font-body text-[#676A61]">
          <Link to="/" className="hover:text-[#264F24]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#264F24]">Products</Link>
          <span>/</span>
          <span className="text-[#22231F] font-semibold">Protein Loaf</span>
        </div>
      </div>

      {/* Main product section */}
      <section className="bg-[#FCFAF6] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Gallery */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#E8DDCD] mb-4">
                <img
                  src={gallery[selectedImage]}
                  alt="Protein Loaf"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-[#264F24]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
        
            </div>

            {/* Product info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                  Plant-Based Meat Alternative
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#A8C879]/20 text-[#264F24] font-body text-xs font-semibold">
                  ● Available
                </span>
              </div>

              <h1 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none mb-2">
                Protein Loaf
              </h1>
              <p className="font-body text-xs text-[#676A61] mb-4">SKU: TNP-PL-888</p>

              <p className="font-body text-[#676A61] leading-relaxed mb-6">
                A high-protein vegan meat alternative made primarily from wheat gluten, soybeans and mixed beans. It provides a firm, meat-like texture and can be sliced, diced, marinated, grilled, fried or added to everyday meals.
              </p>

              {/* Pack selector */}
              <div className="mb-6">
                <p className="font-body text-sm font-semibold text-[#22231F] mb-3">Package Size</p>
                <div className="flex gap-3">
                  {[
                    { label: '500 g', val: '500g', price: 'NPR 350 (Retail)' },
                    { label: '1 kg', val: '1kg', price: 'Enquire for Wholesale' },
                  ].map((pack) => (
                    <button
                      key={pack.val}
                      onClick={() => setSelectedPack(pack.val)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 text-left transition-colors ${
                        selectedPack === pack.val
                          ? 'border-[#264F24] bg-[#264F24]/5'
                          : 'border-[#E8DDCD] hover:border-[#264F24]/50'
                      }`}
                    >
                      <div className="font-display font-black text-sm text-[#22231F]">{pack.label}</div>
                      <div className="font-body text-xs text-[#676A61]">{pack.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              {selectedPack === '500g' ? (
                <div className="mb-6">
                  <div className="font-display font-black text-3xl text-[#264F24]">NPR 350</div>
                  <p className="font-body text-xs text-[#676A61]">Retail price for 500 g pack · Approx. 5 servings (100 g each)</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="font-display font-black text-xl text-[#264F24]">Wholesale Price</div>
                  <p className="font-body text-sm text-[#676A61]">Available by enquiry. Contact us for food-service pricing.</p>
                </div>
              )}

              <div className="flex flex-col gap-3 mb-8">
                <a
                  href="https://wa.me/9779714504317?text=Hi%2C%20I%27m%20interested%20in%20Protein%20Loaf%20-%20please%20provide%20more%20details"
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
                      <strong>Contains wheat/gluten, soy and sesame.</strong> Not suitable for individuals with coeliac disease or medically diagnosed gluten intolerance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Overview, Ingredients, Nutrition, Cooking, Storage, Serving */}
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
              <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Ingredients</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-xs font-bold text-[#264F24] uppercase tracking-wider mb-1">Main Protein</p>
                  <ul className="font-body text-sm text-[#676A61] space-y-1">
                    {['Vital wheat gluten (seitan)', 'Soybeans', 'Mixed beans'].map(i => <li key={i}>· {i}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-body text-xs font-bold text-[#264F24] uppercase tracking-wider mb-1">Flavour</p>
                  <ul className="font-body text-sm text-[#676A61] space-y-1">
                    {['Black pepper', 'Cumin', 'Coriander', 'Cardamom', 'Chilli flakes', 'Bay leaves', 'Salt'].map(i => <li key={i}>· {i}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-body text-xs font-bold text-[#264F24] uppercase tracking-wider mb-1">Oils</p>
                  <ul className="font-body text-sm text-[#676A61] space-y-1">
                    {['Olive oil', 'Mustard-seed oil', 'Sesame-seed oil'].map(i => <li key={i}>· {i}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
              <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-1">Nutrition Facts</h2>
              <p className="font-body text-xs text-[#676A61] mb-4">Per 100 g · Serving size: 100 g</p>
              <div className="space-y-3 border-t border-[#E8DDCD] pt-3">
                {[
                  { label: 'Protein', value: '21.37 g' },
                  { label: 'Total Carbohydrate', value: '19.19 g' },
                  { label: 'Total Fat', value: '0.52 g' },
                  { label: 'Cholesterol', value: '0' },
                  { label: 'Added Sugar', value: '0 g' },
                  { label: 'Moisture', value: '53.67 g' },
                  { label: 'Ash', value: '5.25 g' },
                ].map((row) => (
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

            {/* Cooking + Storage */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Cooking Instructions</h2>
                <p className="font-body text-sm text-[#676A61] leading-relaxed mb-3">
                  Thaw before use. Slice or cube as desired. For better flavour and texture, marinate for 15–30 minutes. Pan-fry, grill, bake, deep-fry, air-fry or add to curries and stir-fries. Cook until heated through and lightly browned.
                </p>
                <div className="flex gap-3 mt-3">
                  <div className="bg-[#F5EDE1] rounded-lg px-3 py-2 text-center">
                    <div className="font-display font-black text-sm text-[#264F24]">170–190°C</div>
                    <div className="font-body text-xs text-[#676A61]">Cook temp</div>
                  </div>
                  <div className="bg-[#F5EDE1] rounded-lg px-3 py-2 text-center">
                    <div className="font-display font-black text-sm text-[#264F24]">75°C min</div>
                    <div className="font-body text-xs text-[#676A61]">Internal temp</div>
                  </div>
                  <div className="bg-[#F5EDE1] rounded-lg px-3 py-2 text-center">
                    <div className="font-display font-black text-sm text-[#264F24]">5–10 min</div>
                    <div className="font-body text-xs text-[#676A61]">Prep time</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#E8DDCD]">
                <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-4">Storage</h2>
                <ul className="space-y-2">
                  {[
                    'Keep frozen at −18°C or below',
                    'Thaw overnight in refrigerator (0–4°C) or in sealed cold water',
                    'Do not leave at room temperature for extended periods',
                    'After opening, refrigerate in airtight container',
                    'Do not refreeze after thawing',
                    'Shelf life: 12 months frozen at −18°C',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-xs text-[#676A61]">
                      <span className="text-[#264F24] font-bold mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Serving suggestions */}
          <div className="mt-12">
            <h2 className="font-display font-black text-3xl uppercase text-[#22231F] mb-6">Serving Ideas</h2>
            <div className="flex flex-wrap gap-3">
              {['Curries', 'Chilli', 'Stir-Fries', 'Fried Rice', 'Noodles', 'Burgers', 'Sandwiches', 'Wraps', 'Tacos', 'Pizza', 'BBQ Skewers', 'Salads'].map((idea) => (
                <span key={idea} className="px-4 py-2 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-sm font-semibold">
                  {idea}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-12">
            <h2 className="font-display font-black text-3xl uppercase text-[#22231F] mb-6">Frequently Asked</h2>
            <div className="space-y-3 max-w-3xl">
              {faqs.map((faq, i) => (
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

          {/* Where to buy */}
          <div className="mt-12 bg-[#264F24] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-xl uppercase text-[#F5EDE1] mb-2">Where to Buy</h3>
              <p className="font-body text-sm text-[#F5EDE1]/70">
                Contact us directly to find out where Protein Loaf is currently available in your area.
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
    </div>
  )
}
