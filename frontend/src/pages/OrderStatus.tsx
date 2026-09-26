import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type Order } from '../lib/api'
import { formatNepaliDateTime } from '../lib/datetime'

const STATUS_LABELS: Record<string, string> = {
  pending_payment: 'Pending Payment',
  paid: 'Paid',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default function OrderStatus() {
  const { orderNumber } = useParams<{ orderNumber: string }>()
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('tnp_last_order')
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved.orderNumber === orderNumber && saved.phone) {
          setPhone(saved.phone)
          lookup(saved.phone)
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber])

  const lookup = async (phoneToUse: string) => {
    if (!orderNumber || !phoneToUse) return
    setLoading(true)
    setError(null)
    try {
      const result = await api.getOrder(orderNumber, phoneToUse)
      setOrder(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not find order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[600px] mx-auto px-6">
          <h1 className="font-display font-black text-3xl text-[#22231F] uppercase mb-2">Track Order</h1>
          <p className="font-body text-sm text-[#676A61] mb-8">Order #{orderNumber}</p>

          {!order && (
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <label className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">
                Enter the phone number used for this order
              </label>
              <div className="flex gap-3">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-[#E8DDCD] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#264F24]/20 focus:border-[#264F24]"
                />
                <button
                  onClick={() => lookup(phone)}
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Looking up…' : 'Look Up'}
                </button>
              </div>
              {error && <p className="mt-3 font-body text-xs text-[#8B4A2E]">{error}</p>}
            </div>
          )}

          {order && (
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-sm text-[#676A61]">Status</span>
                <span className="px-3 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-bold uppercase">
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
              <div className="space-y-2 font-body text-sm text-[#676A61] mb-4">
                <p>Payment: <span className="font-semibold text-[#22231F]">{order.payment_status}</span></p>
                <p>Total: <span className="font-semibold text-[#22231F]">NPR {order.total_npr}</span></p>
                <p>Placed: {formatNepaliDateTime(order.created_at)}</p>
              </div>
              {order.items && (
                <div className="border-t border-[#E8DDCD] pt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between font-body text-sm">
                      <span className="text-[#676A61]">
                        {item.product_name} ({item.variant_label}) × {item.quantity}
                      </span>
                      <span className="text-[#22231F] font-semibold">NPR {item.line_total_npr}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
