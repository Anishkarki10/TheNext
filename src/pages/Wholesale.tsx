import { useState } from 'react'
import { Link } from 'react-router-dom'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const businessTypes = ['Restaurant', 'Café', 'Hotel', 'Retailer', 'Distributor', 'Gym / Fitness Business', 'Caterer', 'Other']
const packageSizes = ['500 g (Retail)', '1 kg (Food Service)', 'Both']
const intendedUses = ['Menu items / Cooking', 'Retail shelf', 'Distribution / Resale', 'Event / Catering', 'Other']

const benefits = [
  {
    title: 'Versatile Ingredient',
    desc: "Protein Loaf works across cuisines and cooking methods — from curries to grills to wraps. One product, broad menu applications.",
    icon: '🍽️',
  },
  {
    title: 'Food Service Pack',
    desc: 'Available in a 1 kg food-service pack designed for professional kitchen use — practical portion sizing and value.',
    icon: '📦',
  },
  {
    title: 'Nepalese Manufacturing',
    desc: "Locally produced in Nepal. Reduce supply-chain complexity by sourcing from within the country.",
    icon: '🇳🇵',
  },
  {
    title: 'Wholesale Support',
    desc: 'We work closely with our partners to provide product information, cooking guidance and flexible ordering.',
    icon: '🤝',
  },
  {
    title: 'Menu Flexibility',
    desc: 'Create vegan, vegetarian and flexitarian options for your customers without a complex supply chain.',
    icon: '📋',
  },
]

export default function Wholesale() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    businessType: '',
    businessEmail: '',
    phone: '',
    businessAddress: '',
    city: '',
    monthlyReq: '',
    packSize: '',
    intendedUse: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.businessName.trim()) e.businessName = 'Business name is required'
    if (!form.contactPerson.trim()) e.contactPerson = 'Contact person is required'
    if (!form.businessEmail.trim()) e.businessEmail = 'Business email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) e.businessEmail = 'Enter a valid email'
    if (!form.businessType) e.businessType = 'Please select a business type'
    if (!form.consent) e.consent = 'Please confirm your consent'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setFormState('loading')
    setTimeout(() => setFormState('success'), 1500)
  }

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border font-body text-sm text-[#22231F] placeholder:text-[#676A61] focus:outline-none focus:ring-2 transition-colors ${
      err ? 'border-[#8B4A2E] focus:ring-[#8B4A2E]/20' : 'border-[#E8DDCD] focus:ring-[#264F24]/20 focus:border-[#264F24]'
    }`

  const Field = ({ label, id, error, required, children }: { label: string; id: string; error?: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
        {label}{required && <span className="text-[#264F24] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{error}</p>}
    </div>
  )

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-[#173A22] py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=700&fit=crop&auto=format')" }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-4">Partner With Us</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-[#F5EDE1] uppercase leading-none mb-6 max-w-3xl">
            Bring Plant-Powered<br />
            <span className="text-[#A8C879]">Protein to Your Business</span>
          </h1>
          <p className="font-body text-[#F5EDE1]/70 max-w-xl leading-relaxed">
            We partner with restaurants, cafés, hotels, retailers, distributors and fitness businesses looking to offer innovative plant-based protein to their customers.
          </p>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bg-[#F5EDE1] py-8">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="font-body text-sm text-[#676A61] font-semibold">We work with:</span>
            {['Restaurants', 'Cafés', 'Hotels', 'Retailers', 'Distributors', 'Gyms', 'Caterers'].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-sm font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#FCFAF6] py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <h2 className="font-display font-black text-4xl uppercase text-[#22231F] mb-10">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-[#E8DDCD] hover:border-[#264F24] hover:shadow-sm transition-all">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-display font-black text-base uppercase text-[#22231F] mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#676A61] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#F5EDE1] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            {formState === 'success' ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DDCD] p-10">
                <div className="w-16 h-16 rounded-full bg-[#264F24]/10 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#264F24" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                </div>
                <h3 className="font-display font-black text-3xl uppercase text-[#22231F] mb-3">Enquiry Received</h3>
                <p className="font-body text-[#676A61] max-w-sm mx-auto">
                  Thank you for your wholesale enquiry. Our team will be in touch with more information as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-[#E8DDCD] p-8 space-y-5">
                <h2 className="font-display font-black text-3xl uppercase text-[#22231F]">
                  Request Wholesale Information
                </h2>
                <p className="font-body text-sm text-[#676A61]">
                  Fill in the form below and our team will get back to you with pricing and partnership details.
                </p>
                <p className="font-body text-xs text-[#676A61]">
                  Wholesale pricing is not publicly listed. View our{' '}
                  <Link to="/privacy" className="text-[#264F24] hover:underline">Privacy Notice</Link>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Business Name" id="businessName" error={errors.businessName} required>
                    <input id="businessName" type="text" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="Your business name" className={inputClass(errors.businessName)} />
                  </Field>
                  <Field label="Contact Person" id="contactPerson" error={errors.contactPerson} required>
                    <input id="contactPerson" type="text" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} placeholder="Full name" className={inputClass(errors.contactPerson)} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Business Type" id="businessType" error={errors.businessType} required>
                    <select id="businessType" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} className={inputClass(errors.businessType)}>
                      <option value="">Select type</option>
                      {businessTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Business Email" id="businessEmail" error={errors.businessEmail} required>
                    <input id="businessEmail" type="email" value={form.businessEmail} onChange={(e) => setForm({ ...form, businessEmail: e.target.value })} placeholder="business@email.com" className={inputClass(errors.businessEmail)} />
                  </Field>
                </div>

                <Field label="Phone / WhatsApp" id="phone" error={errors.phone}>
                  <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+977 ..." className={inputClass(errors.phone)} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Business Address" id="businessAddress" error={errors.businessAddress}>
                    <input id="businessAddress" type="text" value={form.businessAddress} onChange={(e) => setForm({ ...form, businessAddress: e.target.value })} placeholder="Street address" className={inputClass(errors.businessAddress)} />
                  </Field>
                  <Field label="City" id="city" error={errors.city}>
                    <input id="city" type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Kathmandu, Lalitpur..." className={inputClass(errors.city)} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Estimated Monthly Requirement" id="monthlyReq" error={errors.monthlyReq}>
                    <input id="monthlyReq" type="text" value={form.monthlyReq} onChange={(e) => setForm({ ...form, monthlyReq: e.target.value })} placeholder="e.g. 10 kg, 20 packs..." className={inputClass(errors.monthlyReq)} />
                  </Field>
                  <Field label="Package Size Required" id="packSize" error={errors.packSize}>
                    <select id="packSize" value={form.packSize} onChange={(e) => setForm({ ...form, packSize: e.target.value })} className={inputClass(errors.packSize)}>
                      <option value="">Select</option>
                      {packageSizes.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Intended Use" id="intendedUse" error={errors.intendedUse}>
                  <select id="intendedUse" value={form.intendedUse} onChange={(e) => setForm({ ...form, intendedUse: e.target.value })} className={inputClass(errors.intendedUse)}>
                    <option value="">Select</option>
                    {intendedUses.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </Field>

                <Field label="Additional Message" id="message" error={errors.message}>
                  <textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any other information..." className={inputClass(errors.message) + ' resize-none'} />
                </Field>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 w-4 h-4 rounded border-[#E8DDCD] text-[#264F24] focus:ring-[#264F24]/20" />
                    <span className="font-body text-sm text-[#676A61]">
                      I agree to be contacted regarding this wholesale enquiry. View our{' '}
                      <Link to="/privacy" className="text-[#264F24] hover:underline">Privacy Notice</Link>.
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full py-4 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-60"
                >
                  {formState === 'loading' ? 'Submitting...' : 'Request Wholesale Information'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
