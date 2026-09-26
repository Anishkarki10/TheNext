import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { api } from '../lib/api'
import { focusFirstError, isValidPhone } from '../lib/validation'

const PAYMENT_LABELS: Record<'esewa' | 'stripe' | 'cod', string> = {
  esewa: 'eSewa',
  stripe: 'Card (Stripe)',
  cod: 'Cash on Delivery',
}

// eSewa/Stripe are fully built but turned off for initial launch - re-add by
// listing them here again (must also flip ENABLED_PAYMENT_METHODS in the
// backend's app/config.py / env, or the order will be rejected server-side).
const ENABLED_METHODS = ['cod'] as const

function redirectToEsewa(fields: Record<string, string>) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = fields.initiate_url
  for (const [key, value] of Object.entries(fields)) {
    if (key === 'initiate_url') continue
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = value
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}

export default function Checkout() {
  const { items, subtotalNpr, clear } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', notes: '' })
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'stripe' | 'cod'>(ENABLED_METHODS[0])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!isValidPhone(form.phone)) e.phone = 'Enter a valid phone number (at least 10 digits, or 7 digits for a landline)'
    if (!form.address.trim()) e.address = 'Shipping address is required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      focusFirstError(errs)
      return
    }
    setErrors({})
    setServerError(null)
    setSubmitting(true)

    try {
      const order = await api.createOrder({
        customer: {
          name: form.name,
          email: form.email || undefined,
          phone: form.phone,
          address: form.address,
          city: form.city || undefined,
        },
        items: items.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })),
        payment_method: paymentMethod,
        notes: form.notes || undefined,
      })

      // Keep the order number + phone around so the return/status page can look the order up.
      sessionStorage.setItem('tnp_last_order', JSON.stringify({ orderNumber: order.order_number, phone: form.phone }))

      if (paymentMethod === 'esewa') {
        const fields = await api.initiateEsewa(order.id)
        clear()
        redirectToEsewa(fields)
      } else if (paymentMethod === 'stripe') {
        const { url } = await api.initiateStripe(order.id)
        clear()
        window.location.href = url
      } else {
        // Cash on Delivery - no gateway involved, the order is already confirmed.
        clear()
        navigate(`/order/${order.order_number}`)
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-32 text-center font-body text-[#676A61]">
        Your cart is empty. <Link to="/products" className="text-[#264F24] underline">Browse products</Link>
      </div>
    )
  }

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border font-body text-sm text-[#22231F] placeholder:text-[#676A61] focus:outline-none focus:ring-2 transition-colors ${
      err ? 'border-[#8B4A2E] focus:ring-[#8B4A2E]/20' : 'border-[#E8DDCD] focus:ring-[#264F24]/20 focus:border-[#264F24]'
    }`

  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <h1 className="font-display font-black text-4xl text-[#22231F] uppercase mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-[#E8DDCD] p-7 lg:p-8 space-y-5">
              <fieldset disabled={submitting} className="space-y-5 disabled:opacity-60">
              <div>
                <label htmlFor="name" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
                  Full Name <span className="text-[#264F24]">*</span>
                </label>
                <input id="name" autoComplete="name" value={form.name} onChange={set('name')} className={inputClass(errors.name)} />
                {errors.name && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
                    Phone <span className="text-[#264F24]">*</span>
                  </label>
                  <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputClass(errors.phone)} />
                  {errors.phone && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">Email</label>
                  <input id="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputClass()} />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
                  Shipping Address <span className="text-[#264F24]">*</span>
                </label>
                <textarea id="address" autoComplete="street-address" value={form.address} onChange={set('address')} rows={3} className={inputClass(errors.address)} />
                {errors.address && <p className="mt-1 font-body text-xs text-[#8B4A2E]">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">City</label>
                <input id="city" autoComplete="address-level2" value={form.city} onChange={set('city')} className={inputClass()} />
              </div>

              <div>
                <label htmlFor="notes" className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">Order Notes</label>
                <textarea id="notes" value={form.notes} onChange={set('notes')} rows={2} className={inputClass()} />
              </div>

              <div>
                <p className="font-body text-sm font-semibold text-[#22231F] mb-3">Payment Method</p>
                {ENABLED_METHODS.length > 1 ? (
                  <div className="flex gap-3">
                    {ENABLED_METHODS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-center font-body font-bold text-sm transition-colors ${
                          paymentMethod === method
                            ? 'border-[#264F24] bg-[#264F24]/5 text-[#264F24]'
                            : 'border-[#E8DDCD] text-[#676A61] hover:border-[#264F24]/50'
                        }`}
                      >
                        {PAYMENT_LABELS[method]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-3 px-4 rounded-xl border-2 border-[#264F24] bg-[#264F24]/5 font-body font-bold text-sm text-[#264F24]">
                    {PAYMENT_LABELS[paymentMethod]}
                  </div>
                )}
                {paymentMethod === 'cod' && (
                  <p className="mt-2 font-body text-xs text-[#676A61]">
                    Pay in cash when your order is delivered.
                  </p>
                )}
              </div>
              </fieldset>

              {serverError && <p className="font-body text-sm text-[#8B4A2E]" role="alert">{serverError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-50"
              >
                {submitting
                  ? paymentMethod === 'cod'
                    ? 'Placing order…'
                    : 'Redirecting to payment…'
                  : paymentMethod === 'cod'
                    ? 'Place Order (Cash on Delivery)'
                    : `Pay with ${PAYMENT_LABELS[paymentMethod]}`}
              </button>
            </form>

            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6 h-fit">
              <h2 className="font-display font-black text-lg uppercase text-[#22231F] mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between font-body text-sm">
                    <span className="text-[#676A61]">
                      {item.productName} ({item.variantLabel}) × {item.quantity}
                    </span>
                    <span className="text-[#22231F] font-semibold">NPR {item.unitPriceNpr * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E8DDCD] pt-4 flex justify-between">
                <span className="font-body font-semibold text-[#22231F]">Total</span>
                <span className="font-display font-black text-xl text-[#264F24]">NPR {subtotalNpr}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
