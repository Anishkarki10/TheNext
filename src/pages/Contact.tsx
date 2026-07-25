import { useState } from 'react'
import { Link } from 'react-router-dom'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const enquiryTypes = [
  'General Enquiry',
  'Product Question',
  'Complaint',
  'Wholesale Enquiry',
  'Retail Partnership',
  'Restaurant Partnership',
  'Gym Partnership',
  'Feedback',
]

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    enquiryType: '',
    subject: '',
    message: '',
    contactMethod: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (!form.enquiryType) e.enquiryType = 'Please select an enquiry type'
    if (!form.message.trim()) e.message = 'Message is required'
    if (!form.consent) e.consent = 'Please confirm your consent'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setFormState('loading')
    setTimeout(() => {
      setFormState('success')
    }, 1500)
  }

  const Field = ({ label, id, error, required, children }: { label: string; id: string; error?: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
        {label}{required && <span className="text-[#264F24] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{error}</p>}
    </div>
  )

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border font-body text-sm text-[#22231F] placeholder:text-[#676A61] focus:outline-none focus:ring-2 transition-colors ${
      err
        ? 'border-[#8B4A2E] focus:ring-[#8B4A2E]/20'
        : 'border-[#E8DDCD] focus:ring-[#264F24]/20 focus:border-[#264F24]'
    }`

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-[#F5EDE1] py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-3">Get in Touch</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-[#22231F] uppercase leading-none">
            Let's Talk About<br />
            <span className="text-[#264F24]">the Future of Food</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#FCFAF6] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

            {/* Left column */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-black text-2xl uppercase text-[#22231F] mb-6">Contact Information</h2>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'thenextproteinnepal@gmail.com',
                    href: 'mailto:thenextproteinnepal@gmail.com',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.28-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+977 9714504317',
                    href: 'tel:+9779714504317',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                    label: 'WhatsApp',
                    value: '+977 9714504317',
                    href: 'https://wa.me/9779714504317',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: 'Address',
                    value: 'Kusunti-14, Lalitpur, Nepal',
                    href: 'https://maps.google.com/?q=Kusunti+Lalitpur+Nepal',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E8DDCD] hover:border-[#264F24] hover:shadow-sm transition-all group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#264F24]/10 flex items-center justify-center text-[#264F24] flex-shrink-0 group-hover:bg-[#264F24] group-hover:text-[#A8C879] transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-body text-xs font-bold text-[#676A61] uppercase tracking-wide mb-0.5">{item.label}</div>
                      <div className="font-body text-sm text-[#22231F]">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-[#E8DDCD] rounded-xl p-4 mb-6">
                <p className="font-body text-xs font-bold text-[#676A61] uppercase tracking-wide mb-1">Business Hours</p>
                <p className="font-body text-sm text-[#22231F] italic">Content Required — Placeholder</p>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/thenextproteinnepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E8DDCD] bg-white text-[#22231F] font-body text-sm font-semibold hover:border-[#264F24] hover:text-[#264F24] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@thenextproteinnepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E8DDCD] bg-white text-[#22231F] font-body text-sm font-semibold hover:border-[#264F24] hover:text-[#264F24] transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>

            {/* Right column — form */}
            <div className="lg:col-span-3">
              {formState === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-white rounded-2xl border border-[#E8DDCD] p-8">
                  <div className="w-16 h-16 rounded-full bg-[#264F24]/10 flex items-center justify-center mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#264F24" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-3xl uppercase text-[#22231F] mb-3">Message Sent!</h3>
                  <p className="font-body text-[#676A61] max-w-sm">
                    Thank you for contacting The Next Protein Nepal. Our team will respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-[#E8DDCD] p-7 lg:p-10 space-y-5">
                  <h2 className="font-display font-black text-2xl uppercase text-[#22231F]">Send an Enquiry</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" id="name" error={errors.name} required>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className={inputClass(errors.name)}
                      />
                    </Field>
                    <Field label="Email Address" id="email" error={errors.email} required>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputClass(errors.email)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone / WhatsApp" id="phone" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+977 ..."
                        className={inputClass(errors.phone)}
                      />
                    </Field>
                    <Field label="Organisation Name" id="org" error={errors.org}>
                      <input
                        id="org"
                        type="text"
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        placeholder="Company / Restaurant / Individual"
                        className={inputClass(errors.org)}
                      />
                    </Field>
                  </div>

                  <Field label="Enquiry Type" id="enquiryType" error={errors.enquiryType} required>
                    <select
                      id="enquiryType"
                      value={form.enquiryType}
                      onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                      className={inputClass(errors.enquiryType)}
                    >
                      <option value="">Select enquiry type</option>
                      {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Subject" id="subject" error={errors.subject}>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Brief subject line"
                      className={inputClass(errors.subject)}
                    />
                  </Field>

                  <Field label="Message" id="message" error={errors.message} required>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      className={inputClass(errors.message) + ' resize-none'}
                    />
                  </Field>

                  <Field label="Preferred Contact Method" id="contactMethod" error={errors.contactMethod}>
                    <select
                      id="contactMethod"
                      value={form.contactMethod}
                      onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                      className={inputClass(errors.contactMethod)}
                    >
                      <option value="">Select preference</option>
                      <option>Email</option>
                      <option>WhatsApp</option>
                      <option>Phone</option>
                    </select>
                  </Field>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-0.5 w-4 h-4 rounded border-[#E8DDCD] text-[#264F24] focus:ring-[#264F24]/20"
                      />
                      <span className="font-body text-sm text-[#676A61]">
                        I agree that my submitted information may be used to respond to my enquiry. View our{' '}
                        <Link to="/privacy" className="text-[#264F24] hover:underline">Privacy Notice</Link>.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{errors.consent}</p>}
                  </div>

                  {formState === 'error' && (
                    <div className="bg-[#FFF8F0] border border-[#E8DDCD] rounded-xl p-4">
                      <p className="font-body text-sm text-[#8B4A2E]">Something went wrong. Please try again or contact us directly.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full py-4 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === 'loading' ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
