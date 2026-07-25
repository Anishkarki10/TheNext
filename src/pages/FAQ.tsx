import { useState } from 'react'

type FaqItem = { q: string; a: string }

const faqData: { section: string; items: FaqItem[] }[] = [
  {
    section: 'Product',
    items: [
      { q: 'What is Protein Loaf?', a: 'Protein Loaf is a high-protein vegan meat alternative produced by The Next Protein Nepal. It is made primarily from vital wheat gluten, soybeans and mixed beans, and delivers 21.37 g of protein per 100 g. It has a firm, meat-like texture and can be used in a wide range of dishes.' },
      { q: 'Is it completely vegan?', a: 'Yes. Protein Loaf contains no animal-derived ingredients and is fully suitable for vegans and vegetarians.' },
      { q: 'What is its main protein source?', a: 'The primary protein source is vital wheat gluten (seitan), supplemented with soybeans and mixed beans.' },
      { q: 'How much protein does it contain?', a: '21.37 g of protein per 100 g, as analysed by Miron Laboratory and Research Centre.' },
    ],
  },
  {
    section: 'Allergens',
    items: [
      { q: 'Does it contain soy?', a: 'Yes. Protein Loaf contains soybeans. It is not suitable for individuals with a soy allergy.' },
      { q: 'Does it contain gluten?', a: 'Yes. The primary protein source is vital wheat gluten. Protein Loaf is not suitable for individuals with coeliac disease or medically diagnosed gluten intolerance.' },
      { q: 'Does it contain sesame?', a: 'Yes. Protein Loaf is made with sesame-seed oil and is not suitable for individuals with a sesame allergy.' },
      { q: 'Does it contain nuts?', a: 'Nuts are not listed in the ingredient formulation. However, we recommend checking the product packaging for the most current allergen information.' },
    ],
  },
  {
    section: 'Cooking',
    items: [
      { q: 'How is it prepared?', a: 'Thaw before use. Slice or cube as desired. Marinate for 15–30 minutes for best flavour. Then pan-fry, grill, bake, deep-fry, air-fry or add directly to curries, stir-fries and soups.' },
      { q: 'Can it be grilled?', a: 'Yes. Grill at 170–190°C until heated through and lightly browned on both sides. Marinating first produces the best results.' },
      { q: 'Can it be air-fried?', a: 'Yes. Air-fry at 170–190°C, checking regularly and turning for even browning.' },
      { q: 'Does it need to be thawed before use?', a: 'Yes. Always thaw before cooking. Thaw overnight in the refrigerator (0–4°C) or place the sealed package in cold water for a faster thaw.' },
    ],
  },
  {
    section: 'Storage',
    items: [
      { q: 'Should it be frozen?', a: 'Yes. Protein Loaf is a frozen product and should be kept frozen at −18°C or below at all times until thawing.' },
      { q: 'How should it be stored after opening?', a: 'After opening, store any unused portion in an airtight container in the refrigerator. Client confirmation required for exact number of days.' },
      { q: 'What is its shelf life?', a: '12 months when kept continuously frozen at −18°C or below. Do not refreeze after thawing.' },
    ],
  },
  {
    section: 'Availability',
    items: [
      { q: 'Where can customers buy it?', a: 'Contact us directly via WhatsApp (+977 9714504317), phone or email to find out where Protein Loaf is currently available near you.' },
      { q: 'Is direct delivery available?', a: 'Client confirmation required. Please contact us for current delivery options.' },
      { q: 'Is wholesale ordering available?', a: 'Yes. We supply restaurants, cafés, hotels, retailers, distributors and gyms. Submit a wholesale enquiry through our website or contact us directly.' },
      { q: 'Can restaurants, retailers and gyms stock it?', a: 'Yes. We offer food-service packs (1 kg) for businesses. Contact us through our wholesale enquiry page for more information.' },
    ],
  },
]

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E8DDCD] rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#FCFAF6] transition-colors"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-sm text-[#22231F]">{item.q}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`flex-shrink-0 text-[#264F24] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-[#E8DDCD]">
          <p className="font-body text-sm text-[#676A61] leading-relaxed pt-4">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [search, setSearch] = useState('')

  const filtered = faqData.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0)

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-[#264F24] py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-3">Help Centre</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-[#F5EDE1] uppercase leading-none mb-8">
            Frequently<br />
            <span className="text-[#A8C879]">Asked</span>
          </h1>

          {/* Search */}
          <div className="relative max-w-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5EDE1]/50">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-[#F5EDE1]/20 rounded-full font-body text-sm text-[#F5EDE1] placeholder:text-[#F5EDE1]/50 focus:outline-none focus:ring-2 focus:ring-[#A8C879]/50 focus:border-[#A8C879]"
            />
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-[#FCFAF6] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display font-black text-2xl uppercase text-[#22231F] mb-2">No results found</p>
              <p className="font-body text-[#676A61]">Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filtered.map((section) => (
                <div key={section.section}>
                  <h2 className="font-display font-black text-2xl uppercase text-[#22231F] mb-5 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#264F24] flex items-center justify-center text-[#A8C879]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18V5l12-2v13M9 9l12-2" />
                      </svg>
                    </span>
                    {section.section}
                  </h2>
                  <div className="space-y-3 max-w-3xl">
                    {section.items.map((item) => (
                      <AccordionItem key={item.q} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-16 bg-[#F5EDE1] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase text-[#22231F] mb-2">
                Still Have a Question?
              </h3>
              <p className="font-body text-sm text-[#676A61]">
                Our team is happy to help. Reach out via WhatsApp, email or phone.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/9779714504317"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] text-white font-body font-bold text-sm hover:bg-[#20BA5A] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:thenextproteinnepal@gmail.com"
                className="px-5 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
