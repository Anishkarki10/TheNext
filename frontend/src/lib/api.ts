export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://127.0.0.1:5000'

export interface ProductVariant {
  id: number
  label: string
  pack_size: string | null
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

export interface NutritionFact {
  label: string
  value: string
}

export interface CookingStat {
  label: string
  value: string
}

export interface Faq {
  q: string
  a: string
}

export interface Product {
  id: number
  slug: string
  name: string
  sku: string
  category: string | null
  short_description: string | null
  is_available: boolean
  images: ProductImage[]
  variants: ProductVariant[]
  // present only on the detail endpoint
  description?: string
  ingredients?: Record<string, string[]>
  nutrition_facts?: NutritionFact[]
  allergen_info?: string
  cooking_instructions?: string
  cooking_stats?: CookingStat[]
  storage_info?: string[]
  serving_ideas?: string[]
  faqs?: Faq[]
}

export interface OrderItem {
  id: number
  product_id: number | null
  variant_id: number | null
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

function imageUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  listProducts: () => request<Product[]>('/api/products'),
  getProduct: (slug: string) => request<Product>(`/api/products/${slug}`),
  createOrder: (payload: {
    customer: { name: string; email?: string; phone: string; address: string; city?: string }
    items: { variant_id: number; quantity: number }[]
    payment_method: 'esewa' | 'stripe' | 'cod'
    notes?: string
  }) => request<Order>('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrder: (orderNumber: string, phone: string) =>
    request<Order>(`/api/orders/${orderNumber}?phone=${encodeURIComponent(phone)}`),
  initiateEsewa: (orderId: number) =>
    request<Record<string, string>>('/api/payments/esewa/initiate', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId }),
    }),
  initiateStripe: (orderId: number) =>
    request<{ id: string; url: string }>('/api/payments/stripe/initiate', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId }),
    }),
  confirmEsewa: (data: string, orderNumber: string) =>
    request<Order>(`/api/payments/esewa/callback?data=${encodeURIComponent(data)}&order_number=${encodeURIComponent(orderNumber)}`),
  confirmStripe: (sessionId: string | null, orderNumber: string) =>
    request<Order>(
      `/api/payments/stripe/callback?order_number=${encodeURIComponent(orderNumber)}${sessionId ? `&session_id=${encodeURIComponent(sessionId)}` : ''}`,
    ),
  createEnquiry: (payload: {
    name: string
    email: string
    phone?: string
    org?: string
    enquiry_type: string
    subject?: string
    message: string
    contact_method?: string
    consent: boolean
  }) => request<{ id: number }>('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
  imageUrl,
}
