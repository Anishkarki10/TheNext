import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Orders', to: '/orders' },
  { label: 'Enquiries', to: '/enquiries' },
  { label: 'Audit Log', to: '/audit-log' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [unreadEnquiries, setUnreadEnquiries] = useState(0)

  useEffect(() => {
    api.listEnquiries({ status: 'new' }).then((res) => setUnreadEnquiries(res.total_enquiries)).catch(() => {})
  }, [location.pathname])

  return (
    <div className="min-h-screen flex bg-[#F5EDE1]">
      <aside className="w-60 bg-[#264F24] flex flex-col">
        <div className="p-6">
          <div className="font-display font-black text-sm text-[#F5EDE1] uppercase tracking-wider">The Next Protein</div>
          <div className="font-display font-bold text-xs text-[#A8C879] uppercase tracking-[0.2em]">Admin</div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-body text-sm font-semibold transition-colors ${
                  active ? 'bg-[#A8C879] text-[#173A22]' : 'text-[#F5EDE1]/80 hover:bg-[#173A22]'
                }`}
              >
                {link.label}
                {link.to === '/enquiries' && unreadEnquiries > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center">
                    {unreadEnquiries}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-[#F5EDE1]/10">
          <div className="font-body text-xs text-[#F5EDE1]/60 mb-2 truncate">{user?.email}</div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-xl bg-[#173A22] text-[#F5EDE1] font-body text-sm font-semibold hover:bg-[#0f2818] transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
