export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://127.0.0.1:5000'

const TOKEN_KEY = 'tnp_admin_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export interface ProductVariant {
  id?: number
  label: string
  pack_size: string
  price_npr: number | null
  is_enquiry_only: boolean
  stock_qty: number
  sort_order: number
}

export interface ProductImage {
  id: number
  url: string
  alt_text: string | null
  sort_order: number
}

export interface Product {
  id: number
  slug: string
  name: string
  sku: string
  category: string | null
  short_description: string | null
  description: string | null
  is_available: boolean
  images: ProductImage[]
  variants: ProductVariant[]
  ingredients?: Record<string, string[]> | null
  nutrition_facts?: { label: string; value: string }[] | null
  allergen_info?: string | null
  cooking_instructions?: string | null
  cooking_stats?: { label: string; value: string }[] | null
  storage_info?: string[] | null
  serving_ideas?: string[] | null
  faqs?: { q: string; a: string }[] | null
}

export interface OrderItem {
  id: number
  product_name: string
  variant_label: string | null
  unit_price_npr: number
  quantity: number
  line_total_npr: number
}

export interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string | null
  customer_phone: string
  shipping_address: string
  city: string | null
  notes: string | null
  status: string
  payment_method: string | null
  payment_status: string
  subtotal_npr: number
  total_npr: number
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface DashboardStats {
  total_orders: number
  total_revenue_npr: number
  total_products: number
  orders_by_status: Record<string, number>
  recent_orders: Order[]
  unread_enquiries: number
}

export interface Enquiry {
  id: number
  name: string
  email: string
  phone: string | null
  org: string | null
  enquiry_type: string
  subject: string | null
  message: string
  contact_method: string | null
  consent: boolean
  status: string
  created_at: string
}

export interface AuditLogEntry {
  id: number
  admin_email: string
  action: string
  target_type: string | null
  target_id: number | null
  details: Record<string, unknown> | null
  created_at: string
}

class ApiError extends Error {}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = { ...(options.headers as Record<string, string>) }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    clearToken()
    // Raw window.location navigation doesn't know about BrowserRouter's
    // basename="/admin" (only React Router's own nav methods do) - hardcode
    // the /admin prefix here or this lands outside the app's own base path.
    window.location.href = '/admin/login'
    throw new ApiError('Unauthorized')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(body.error || `Request failed (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export function imageUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`
}

export const api = {
  login: (email: string, password: string) =>
    request<{ access_token: string; user: { id: number; email: string; name: string } }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<void>('/api/admin/logout', { method: 'POST' }),
  me: () => request<{ id: number; email: string; name: string }>('/api/admin/me'),

  dashboardStats: () => request<DashboardStats>('/api/admin/dashboard/stats'),

  listProducts: () => request<Product[]>('/api/admin/products'),
  getProduct: (id: number) => request<Product>(`/api/admin/products/${id}`),
  createProduct: (payload: Partial<Product>) =>
    request<Product>('/api/admin/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id: number, payload: Partial<Product>) =>
    request<Product>(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProduct: (id: number) => request<void>(`/api/admin/products/${id}`, { method: 'DELETE' }),
  uploadImage: (productId: number, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return request<ProductImage>(`/api/admin/products/${productId}/images`, { method: 'POST', body: formData })
  },
  deleteImage: (productId: number, imageId: number) =>
    request<void>(`/api/admin/products/${productId}/images/${imageId}`, { method: 'DELETE' }),

  listOrders: (params: { status?: string; page?: number } = {}) => {
    const qs = new URLSearchParams()
    if (params.status) qs.set('status', params.status)
    if (params.page) qs.set('page', String(params.page))
    return request<{ orders: Order[]; page: number; total_pages: number; total_orders: number }>(
      `/api/admin/orders?${qs.toString()}`,
    )
  },
  getOrder: (id: number) => request<Order>(`/api/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: string) =>
    request<Order>(`/api/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  updatePaymentStatus: (id: number, payment_status: string) =>
    request<Order>(`/api/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ payment_status }) }),

  listEnquiries: (params: { status?: string; page?: number } = {}) => {
    const qs = new URLSearchParams()
    if (params.status) qs.set('status', params.status)
    if (params.page) qs.set('page', String(params.page))
    return request<{ enquiries: Enquiry[]; page: number; total_pages: number; total_enquiries: number; unread_count: number }>(
      `/api/admin/enquiries?${qs.toString()}`,
    )
  },
  getEnquiry: (id: number) => request<Enquiry>(`/api/admin/enquiries/${id}`),
  updateEnquiryStatus: (id: number, status: string) =>
    request<Enquiry>(`/api/admin/enquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  listAuditLog: (params: { page?: number } = {}) => {
    const qs = new URLSearchParams()
    if (params.page) qs.set('page', String(params.page))
    return request<{ entries: AuditLogEntry[]; page: number; total_pages: number; total_entries: number }>(
      `/api/admin/audit-log?${qs.toString()}`,
    )
  },
}
