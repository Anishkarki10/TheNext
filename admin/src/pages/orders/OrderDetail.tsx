import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type Order } from '../../lib/api'
import { formatNepaliDateTime } from '../../lib/datetime'
import Layout from '../../components/Layout'

const STATUSES = ['pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES = ['unpaid', 'paid', 'failed', 'refunded']

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const load = () => {
    if (!id) return
    api.getOrder(Number(id)).then(setOrder).catch((err) => setError(err.message))
  }

  useEffect(load, [id])

  const handleStatusChange = async (status: string) => {
    if (!order) return
    setUpdating(true)
    try {
      const updated = await api.updateOrderStatus(order.id, status)
      setOrder(updated)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  const handlePaymentStatusChange = async (paymentStatus: string) => {
    if (!order) return
    setUpdating(true)
    try {
      const updated = await api.updatePaymentStatus(order.id, paymentStatus)
      setOrder(updated)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  if (error) return <Layout><p className="font-body text-sm text-[#8B4A2E]">{error}</p></Layout>
  if (!order) return <Layout><p className="font-body text-sm text-[#676A61]">Loading…</p></Layout>

  return (
    <Layout>
      <h1 className="font-display font-black text-2xl uppercase text-[#22231F] mb-1">Order {order.order_number}</h1>
      <p className="font-body text-sm text-[#676A61] mb-6">Placed {formatNepaliDateTime(order.created_at)}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
          <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Items</h2>
          <div className="space-y-3">
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between font-body text-sm border-b border-[#E8DDCD] pb-2">
                <span className="text-[#676A61]">
                  {item.product_name} ({item.variant_label}) × {item.quantity}
                </span>
                <span className="text-[#22231F] font-semibold">NPR {item.line_total_npr}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-[#E8DDCD]">
            <span className="font-body font-semibold text-[#22231F]">Total</span>
            <span className="font-display font-black text-xl text-[#264F24]">NPR {order.total_npr}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
            <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Customer</h2>
            <div className="space-y-1 font-body text-sm text-[#676A61]">
              <p className="text-[#22231F] font-semibold">{order.customer_name}</p>
              <p>{order.customer_phone}</p>
              {order.customer_email && <p>{order.customer_email}</p>}
              <p>{order.shipping_address}</p>
              {order.city && <p>{order.city}</p>}
              {order.notes && <p className="italic mt-2">"{order.notes}"</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
            <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Payment</h2>
            <p className="font-body text-sm text-[#676A61] mb-3">
              Method: <span className="text-[#22231F] font-semibold capitalize">{order.payment_method ?? '—'}</span>
            </p>
            <label className="block font-body text-xs font-semibold text-[#676A61] mb-1.5">Payment Status</label>
            <select
              value={order.payment_status}
              disabled={updating}
              onChange={(e) => handlePaymentStatusChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCD] font-body text-sm capitalize"
            >
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {order.payment_method === 'cod' && order.payment_status === 'unpaid' && (
              <p className="mt-2 font-body text-xs text-[#676A61]">
                Cash on Delivery - mark as "paid" once cash is collected.
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
            <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Order Status</h2>
            <select
              value={order.status}
              disabled={updating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCD] font-body text-sm capitalize"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Layout>
  )
}
