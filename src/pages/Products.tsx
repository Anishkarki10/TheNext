import { Link } from 'react-router-dom'
import loaf from './../../assets/Protein Loaf.png'
export default function Products() {
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

      {/* Product card */}
      <section className="bg-[#F5EDE1] py-12 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DDCD] shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8DDCD]">
                <img
                  src={loaf}
                  alt="Protein Loaf — plant-based meat alternative"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                        Plant-Based Meat Alternative
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#A8C879]/20 text-[#264F24] font-body text-xs font-semibold">
                        ● Available
                      </span>
                    </div>
                    <h2 className="font-display font-black text-3xl text-[#22231F] uppercase">Protein Loaf</h2>
                    <p className="font-body text-[#676A61] text-sm mt-1">SKU: TNP-PL-888</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display font-black text-2xl text-[#264F24]">NPR 350</div>
                    <div className="font-body text-xs text-[#676A61]">500 g retail pack</div>
                  </div>
                </div>

                <p className="font-body text-[#676A61] leading-relaxed mb-6">
                  A versatile vegan meat alternative crafted from wheat protein, soybeans and mixed beans. Rich in protein, free of cholesterol, with a firm meat-like texture.
                </p>

                {/* Nutrition highlights */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { val: '21.37g', label: 'Protein per 100g' },
                    { val: '0.52g', label: 'Total Fat' },
                    { val: '0', label: 'Cholesterol' },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#F5EDE1] rounded-xl px-4 py-2.5">
                      <div className="font-display font-black text-lg text-[#264F24]">{s.val}</div>
                      <div className="font-body text-xs text-[#676A61]">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Allergen tags */}
                <div className="flex flex-wrap gap-2 mb-6 p-4 bg-[#FFF8F0] rounded-xl border border-[#E8DDCD]">
                  <span className="font-body text-xs font-bold text-[#30251D] mr-1">Contains:</span>
                  {['Wheat/Gluten', 'Soy', 'Sesame'].map((a) => (
                    <span key={a} className="px-2.5 py-1 rounded-full bg-[#E8DDCD] font-body text-xs font-semibold text-[#30251D]">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/products/protein-loaf"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors flex-1"
                  >
                    View Details
                  </Link>
                  <a
                    href="https://wa.me/9779714504317?text=Hi%2C%20I%27m%20interested%20in%20Protein%20Loaf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors flex-1"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </div>
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
