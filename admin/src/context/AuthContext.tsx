import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, clearToken, getToken, setToken } from '../lib/api'

interface AdminUser {
  id: number
  email: string
  name: string
}

interface AuthContextValue {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getToken()) {
      setLoading(false)
      return
    }
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const { access_token, user: loggedInUser } = await api.login(email, password)
    setToken(access_token)
    setUser(loggedInUser)
  }

  const logout = async () => {
    // Best-effort: revoke the token server-side so it can't be reused if
    // stolen, but always clear local state even if this call fails (e.g.
    // offline) - the user should never get stuck unable to log out locally.
    try {
      await api.logout()
    } catch {
      // ignore - local logout still proceeds below
    }
    clearToken()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
