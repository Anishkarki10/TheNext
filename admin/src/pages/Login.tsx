import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getToken } from '../lib/api'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (getToken()) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EDE1]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-[#E8DDCD] p-8">
        <h1 className="font-display font-black text-xl uppercase text-[#22231F] mb-1">Admin Login</h1>
        <p className="font-body text-xs text-[#676A61] mb-6">The Next Protein Nepal</p>

        <div className="mb-4">
          <label className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E8DDCD] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#264F24]/20 focus:border-[#264F24]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-body text-sm font-semibold text-[#22231F] mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E8DDCD] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#264F24]/20 focus:border-[#264F24]"
            required
          />
        </div>

        {error && <p className="mb-4 font-body text-sm text-[#8B4A2E]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
