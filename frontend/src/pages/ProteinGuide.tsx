import { Link } from 'react-router-dom'

const educationSections = [
  {
    title: 'What Does Protein Do?',
    content: `Protein is an essential macronutrient that your body uses to build and repair tissues, produce enzymes and hormones, and support immune function. Every cell in the human body contains protein. Adequate protein intake is important for muscle maintenance, recovery after physical activity, and overall wellbeing.`,
  },
  {
    title: 'What Is Plant Protein?',
    content: `Plant proteins are proteins derived from plant sources such as legumes, grains, seeds and vegetables. They differ from animal proteins in their amino acid profiles — some plant sources are lower in one or more essential amino acids. However, combining different plant protein sources (as Protein Loaf does with wheat gluten, soybeans and mixed beans) provides a broader amino acid profile.`,
  },
  {
    title: 'What Is Seitan?',
    content: `Seitan (SAY-tan) is a food made from vital wheat gluten — the main protein in wheat. When wheat flour dough is rinsed to remove the starch, the protein-dense gluten remains. This is seitan. It has been used in Buddhist vegetarian cooking across Asia for over a thousand years. Seitan is prized for its dense, chewy, meat-like texture and its ability to absorb seasonings and marinades. Protein Loaf uses vital wheat gluten as its primary protein source.`,
  },
  {
    title: 'Protein Sources in Protein Loaf',
    content: `Protein Loaf combines three plant protein sources for a more complete nutritional profile: Vital wheat gluten (seitan) — the primary structural and protein-dense base; Soybeans — a complete protein source that adds amino acid depth; Mixed beans — additional plant protein and body. Together, these contribute 21.37 g of protein per 100 g.`,
  },
  {
    title: 'Plant Protein and Active Lifestyles',
    content: `Active individuals require adequate protein to support muscle repair and recovery. Plant-based proteins can meet these needs when consumed as part of a balanced, varied diet. Protein Loaf provides 21.37 g of protein per 100 g with only 0.52 g of total fat — making it a high-protein, low-fat option for those who train regularly.`,
  },
  {
    title: 'Including Protein Loaf in Balanced Meals',
    content: `Protein Loaf can be used as the protein centrepiece of almost any meal. Slice and add to a curry with rice and vegetables. Cube and toss into stir-fried noodles. Marinate and grill for skewers or BBQ. Fill momos or dumplings. Layer into a burger or wrap. Combine with fresh salads and grains for a complete meal. Aim to include a variety of vegetables, whole grains and healthy fats alongside Protein Loaf for a nutritionally balanced plate.`,
  },
]

export default function ProteinGuide() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#F5EDE1] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-4">
              Educational Guide
            </p>
            <h1 className="font-display font-black text-5xl lg:text-8xl text-[#22231F] uppercase leading-none mb-6">
              The Protein<br />
              <span className="text-[#264F24]">Guide</span>
            </h1>
            <p className="font-body text-[#676A61] text-lg leading-relaxed max-w-xl">
              Everything you need to know about plant-based protein — from the science to the kitchen.
            </p>
            <div className="mt-8 bg-[#E8DDCD] border border-[#D4C9B8] rounded-xl p-4 max-w-xl">
              <p className="font-body text-xs text-[#676A61]">
                <strong className="text-[#22231F]">Educational disclaimer:</strong> This information is provided for general educational purposes and is not a substitute for medical or personalised nutrition advice. Consult a qualified healthcare professional for specific dietary guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education sections */}
      <section className="bg-[#FCFAF6] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar / TOC */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-4">Contents</p>
                <nav className="space-y-2">
                  {educationSections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="block font-body text-sm text-[#676A61] hover:text-[#264F24] py-1.5 border-l-2 border-[#E8DDCD] hover:border-[#264F24] pl-3 transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 bg-[#264F24] rounded-xl p-5">
                  <p className="font-display font-black text-sm text-[#A8C879] uppercase mb-2">Try Protein Loaf</p>
                  <p className="font-body text-xs text-[#F5EDE1]/80 mb-4">
                    21.37 g protein per 100 g. Lab-verified. Zero cholesterol.
                  </p>
                  <Link
                    to="/products/protein-loaf"
                    className="inline-block w-full text-center px-4 py-2.5 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#F5EDE1] transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {educationSections.map((section, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-display font-black text-5xl text-[#E8DDCD] leading-none mt-1 flex-shrink-0 w-12 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display font-black text-2xl lg:text-3xl text-[#22231F] uppercase leading-snug">
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-16 border-l-2 border-[#E8DDCD] pl-6">
                    <p className="font-body text-[#676A61] leading-relaxed text-base">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Nutrition label explainer */}
              <div id="section-6" className="scroll-mt-24">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-display font-black text-5xl text-[#E8DDCD] leading-none mt-1 flex-shrink-0 w-12 text-right">07</span>
                  <h2 className="font-display font-black text-2xl lg:text-3xl text-[#22231F] uppercase leading-snug">
                    Understanding a Nutrition Label
                  </h2>
                </div>
                <div className="ml-16 border-l-2 border-[#E8DDCD] pl-6">
                  <p className="font-body text-[#676A61] leading-relaxed mb-6">
                    Nutrition labels can be confusing. Here is what to look for on Protein Loaf:
                  </p>
                  <div className="bg-[#F5EDE1] rounded-xl p-6 space-y-3">
                    {[
                      { term: 'Per 100 g', def: 'All values on the Protein Loaf label are shown per 100 g — the reference weight for easy comparison with other products.' },
                      { term: 'Protein', def: 'The amount of protein in grams. Protein Loaf contains 21.37 g — a high value for a food product.' },
                      { term: 'Total Carbohydrate', def: 'Includes all forms of carbohydrate. Protein Loaf contains 19.19 g per 100 g.' },
                      { term: 'Total Fat', def: 'The combined fat content. Protein Loaf contains only 0.52 g per 100 g — very low.' },
                      { term: 'Cholesterol', def: 'The amount of dietary cholesterol. Protein Loaf contains 0 — plant-based foods naturally contain no cholesterol.' },
                      { term: 'Added Sugar', def: 'Sugar added during manufacturing (not naturally occurring). Protein Loaf contains 0 g added sugar.' },
                    ].map((row) => (
                      <div key={row.term}>
                        <dt className="font-body font-bold text-sm text-[#22231F]">{row.term}</dt>
                        <dd className="font-body text-sm text-[#676A61] mt-0.5">{row.def}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergens */}
              <div className="scroll-mt-24">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-display font-black text-5xl text-[#E8DDCD] leading-none mt-1 flex-shrink-0 w-12 text-right">08</span>
                  <h2 className="font-display font-black text-2xl lg:text-3xl text-[#22231F] uppercase leading-snug">
                    Allergen Awareness
                  </h2>
                </div>
                <div className="ml-16 border-l-2 border-[#E8DDCD] pl-6">
                  <p className="font-body text-[#676A61] leading-relaxed mb-4">
                    Protein Loaf contains wheat/gluten, soy and sesame. It is not suitable for individuals with coeliac disease or medically diagnosed gluten intolerance.
                  </p>
                  <div className="bg-[#FFF8F0] border border-[#E8DDCD] rounded-xl p-4 flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30251D" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <p className="font-body text-sm text-[#676A61]">
                      Always read the full ingredient and allergen label before consuming any food product. If you have a food allergy or intolerance, consult a healthcare professional before trying new products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#264F24] py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display font-black text-4xl text-[#F5EDE1] uppercase mb-4">
            Ready to Try Plant-Based Protein?
          </h2>
          <p className="font-body text-[#F5EDE1]/70 mb-8 max-w-lg mx-auto">
            Protein Loaf delivers 21.37 g of lab-verified protein per 100 g with zero cholesterol and minimal fat.
          </p>
          <Link
            to="/products/protein-loaf"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#F5EDE1] transition-colors"
          >
            View Protein Loaf
          </Link>
        </div>
      </section>
    </div>
  )
}
