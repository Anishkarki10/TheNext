import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type DashboardStats } from '../lib/api'
import Layout from '../components/Layout'

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.dashboardStats().then(setStats).catch((err) => setError(err.message))
  }, [])

  return (
    <Layout>
      <h1 className="font-display font-black text-2xl uppercase text-[#22231F] mb-6">Dashboard</h1>

      {error && <p className="font-body text-sm text-[#8B4A2E] mb-4">{error}</p>}

      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <div className="font-display font-black text-3xl text-[#264F24]">{stats.total_orders}</div>
              <div className="font-body text-xs text-[#676A61] mt-1">Total Orders</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <div className="font-display font-black text-3xl text-[#264F24]">NPR {stats.total_revenue_npr}</div>
              <div className="font-body text-xs text-[#676A61] mt-1">Revenue (paid orders)</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <div className="font-display font-black text-3xl text-[#264F24]">{stats.total_products}</div>
              <div className="font-body text-xs text-[#676A61] mt-1">Products</div>
            </div>
            <Link to="/enquiries" className="bg-white rounded-2xl border border-[#E8DDCD] p-6 hover:border-[#264F24] transition-colors">
              <div className="font-display font-black text-3xl text-[#264F24]">{stats.unread_enquiries}</div>
              <div className="font-body text-xs text-[#676A61] mt-1">Unread Enquiries</div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Orders by Status</h2>
              <div className="space-y-2">
                {Object.entries(stats.orders_by_status).map(([status, count]) => (
                  <div key={status} className="flex justify-between font-body text-sm">
                    <span className="text-[#676A61] capitalize">{status.replace('_', ' ')}</span>
                    <span className="text-[#22231F] font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
              <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Recent Orders</h2>
              <div className="space-y-2">
                {stats.recent_orders.length === 0 && <p className="font-body text-sm text-[#676A61]">No orders yet.</p>}
                {stats.recent_orders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="flex justify-between font-body text-sm hover:text-[#264F24]"
                  >
                    <span className="text-[#676A61]">{order.order_number}</span>
                    <span className="text-[#22231F] font-semibold">NPR {order.total_npr}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}
