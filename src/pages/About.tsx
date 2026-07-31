import { Link } from 'react-router-dom'
import chef from './../../assets/Chef.png'
import research from './../../assets/research-development.png'
import photo1 from './../../assets/Sustainability.png'
import chairmanImage from './../../assets/deepak-sapkota-chairman.jpg'
import coFounderImage from './../../assets/anjalee-sawad-cofounder.jpeg'
import ceoImage from './../../assets/ghanshyam-poudyal-ceo.jpg'
import quality from './../../assets/quality-control.png'

const values = [
  { icon: '🌾', title: 'Sustainability', desc: 'Building food systems that are responsible today and resilient for the future.' },
  { icon: '🚀', title: 'Innovation', desc: 'Applying food science and creativity to create products Nepal has never seen before.' },
  { icon: '💎', title: 'Quality Without Compromise', desc: 'Every batch is made to the same high standard — no shortcuts.' },
  { icon: '❤️', title: 'Health & Nutrition', desc: 'Products designed to nourish bodies and support active, balanced lives.' },
  { icon: '🥰', title: 'Customer Satisfaction', desc: 'We listen, learn and improve because our customers deserve the best.' },
  { icon: '📖', title: 'Integrity & Transparency', desc: 'We share what is in our products, how they are made and where they come from.' },
  { icon: '🕊️', title: 'Respect for Animals', desc: 'Choosing plant-based is an act of care for every living creature.' },
  { icon: '🌊', title: 'Continuous Improvement', desc: 'We believe every product and process can always be made better.' },
]

const teamMembers = [
  {
    name: 'Deepak Sapkota',
    role: 'Chairman',
    image: chairmanImage,
  },
  {
    name: 'Anjalee Sawad',
    role: 'Co-Founder',
    image: coFounderImage,
  },
  {
    name: 'Ghanshyam Poudyal',
    role: 'CEO',
    image: ceoImage,
  },
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-[#30251D] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&h=800&fit=crop&auto=format')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-24">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-4">Our Story</p>
          <h1 className="font-display font-black text-5xl lg:text-8xl text-[#F5EDE1] uppercase leading-none mb-6 max-w-3xl">
            Proudly Nepalese.<br />
            <span className="text-[#A8C879]">Made for the Future.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#FCFAF6] py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none mb-6">
                Company Origin
              </h2>
              <p className="font-body text-[#676A61] leading-relaxed text-base mb-6">
                The Next Protein Nepal was founded with a bold vision: to make delicious, nutritious and sustainable plant-based meat accessible to everyone in Nepal and beyond. By combining food innovation with carefully selected ingredients, we create products with satisfying taste and texture for the meals Nepal already loves.
              </p>
              <p className="font-body text-[#676A61] leading-relaxed text-base mb-6">
                Our journey began with a simple question: why should plant-based protein be a compromise? We set out to create something that could hold its own in the most flavour-rich kitchens — from Nepalese curries to international cuisine.
              </p>
              <div className="inline-flex items-center gap-3 bg-[#F5EDE1] px-5 py-3 rounded-full">
                <span className="text-xl">🇳🇵</span>
                <span className="font-display font-bold text-sm text-[#264F24] uppercase tracking-wide">Made and Founded in Nepal</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DDCD]">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop&auto=format"
                  alt="Kitchen and food preparation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DDCD] mt-8">
                <img
                  src={chef}
                  alt="Plant-based ingredients and spices"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#264F24] py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#173A22] rounded-2xl p-10">
              <div className="w-10 h-10 rounded-full bg-[#A8C879]/20 flex items-center justify-center mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C879" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h2 className="font-display font-black text-3xl text-[#F5EDE1] uppercase mb-4">Our Mission</h2>
              <p className="font-body text-[#F5EDE1]/80 leading-relaxed">
                To provide innovative, nutritious and delicious plant-based meat products that empower people to make healthier and more sustainable food choices.
              </p>
            </div>
            <div className="bg-[#173A22] rounded-2xl p-10">
              <div className="w-10 h-10 rounded-full bg-[#A8C879]/20 flex items-center justify-center mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8C879" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="font-display font-black text-3xl text-[#F5EDE1] uppercase mb-4">Our Vision</h2>
              <p className="font-body text-[#F5EDE1]/80 leading-relaxed">
                To become Nepal's leading plant-based protein company and a trusted brand across South Asia, inspiring a future where sustainable food is accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F5EDE1] py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <h2 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div key={val.title} className="bg-[#FCFAF6] rounded-2xl p-6 border border-[#E8DDCD]">
                <div className="text-3xl mb-4">{val.icon}</div>
                <h3 className="font-display font-black text-base uppercase text-[#22231F] mb-2">{val.title}</h3>
                <p className="font-body text-sm text-[#676A61] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D + Quality + Sustainability */}
      <section className="bg-[#FCFAF6] py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Research & Development',
                img:research,
                desc: 'Our product development focuses on matching the texture, flavour and nutritional profile that consumers expect from premium protein. Every formulation is tested until it earns a place on the table.',
              },
              {
                title: 'Quality Control',
                img: quality,
                desc: 'Nutrition values are laboratory-analysed by Miron Laboratory and Research Centre. We do not publish claims we cannot verify.',
              },
              {
                title: 'Sustainability',
                img:photo1,
                desc: "Plant-based food production uses fewer natural resources than conventional meat. We are committed to responsible manufacturing and locally sourced ingredients wherever possible.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl overflow-hidden border border-[#E8DDCD]">
                <div className="aspect-[4/3] overflow-hidden bg-[#E8DDCD]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-display font-black text-xl uppercase text-[#22231F] mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-[#676A61] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="bg-[#F5EDE1] py-24 lg:py-32">
  <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
    <div className="mb-12">
      <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-3">
        The People Behind the Brand
      </p>

      <h2 className="font-display font-black text-4xl lg:text-6xl uppercase text-[#22231F]">
        The Team
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#D4C9B8] hover:shadow-xl transition-all duration-300"
        >
          {/* Large team image */}
          <div className="w-full h-[380px] lg:h-[430px] overflow-hidden bg-[#E8DDCD]">
            <img
              src={member.image}
              alt={`${member.name} — ${member.role}`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Team information */}
          <div className="p-6 text-center">
            <h3 className="font-display font-black text-xl uppercase text-[#22231F] mb-2">
              {member.name}
            </h3>

            <p className="font-body text-sm font-semibold uppercase tracking-wider text-[#557A35]">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Partnership CTA */}
      <section className="bg-[#173A22] py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-black text-3xl lg:text-4xl text-[#F5EDE1] uppercase leading-none mb-3">
              Ready to Partner With Us?
            </h2>
            <p className="font-body text-[#F5EDE1]/70 max-w-lg">
              We welcome restaurants, retailers, distributors and food businesses who share our vision for a better food future.
            </p>
          </div>
          <Link
            to="/wholesale"
            className="px-8 py-4 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#F5EDE1] transition-colors whitespace-nowrap"
          >
            Wholesale Enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
