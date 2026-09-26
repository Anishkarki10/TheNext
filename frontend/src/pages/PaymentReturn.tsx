import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api, type Order } from '../lib/api'

export default function PaymentReturn({ gateway }: { gateway: 'esewa' | 'stripe' }) {
  const [params] = useSearchParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const orderNumber = params.get('order_number') || ''
        if (!orderNumber) throw new Error('Missing order reference')

        if (gateway === 'esewa') {
          const data = params.get('data')
          const confirmed = data ? await api.confirmEsewa(data, orderNumber) : await api.confirmEsewa('', orderNumber)
          setOrder(confirmed)
        } else {
          const sessionId = params.get('session_id')
          const confirmed = await api.confirmStripe(sessionId, orderNumber)
          setOrder(confirmed)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not confirm payment')
      } finally {
        setLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const success = order?.payment_status === 'paid'

  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-24">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-10">
            {loading && <p className="font-body text-[#676A61]">Confirming your payment…</p>}

            {!loading && error && (
              <>
                <h1 className="font-display font-black text-2xl uppercase text-[#8B4A2E] mb-3">Something Went Wrong</h1>
                <p className="font-body text-sm text-[#676A61] mb-6">{error}</p>
              </>
            )}

            {!loading && !error && order && success && (
              <>
                <h1 className="font-display font-black text-2xl uppercase text-[#264F24] mb-3">Payment Successful</h1>
                <p className="font-body text-sm text-[#676A61] mb-2">
                  Order <strong>{order.order_number}</strong> is confirmed.
                </p>
                <p className="font-body text-sm text-[#676A61] mb-6">Total paid: NPR {order.total_npr}</p>
              </>
            )}

            {!loading && !error && order && !success && (
              <>
                <h1 className="font-display font-black text-2xl uppercase text-[#8B4A2E] mb-3">Payment Not Completed</h1>
                <p className="font-body text-sm text-[#676A61] mb-6">
                  Order <strong>{order.order_number}</strong> was not paid. You can try again from your cart, or contact
                  us if you believe this is an error.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-6 py-3 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors"
              >
                Back to Home
              </Link>
              {order && (
                <Link
                  to={`/order/${order.order_number}`}
                  className="px-6 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
                >
                  Track Order
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
