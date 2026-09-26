import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getToken } from '../lib/api'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (!getToken()) return <Navigate to="/login" replace />
  if (loading) return <div className="p-10 font-body text-[#676A61]">Loading…</div>
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
