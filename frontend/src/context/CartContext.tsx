import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'

export interface CartItem {
  variantId: number
  productSlug: string
  productName: string
  variantLabel: string
  unitPriceNpr: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'>; quantity: number }
  | { type: 'REMOVE'; variantId: number }
  | { type: 'SET_QUANTITY'; variantId: number; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }

const STORAGE_KEY = 'tnp_cart'

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }
    case 'ADD': {
      const existing = state.items.find((i) => i.variantId === action.item.variantId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === action.item.variantId ? { ...i, quantity: i.quantity + action.quantity } : i,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, quantity: action.quantity }] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.variantId !== action.variantId) }
    case 'SET_QUANTITY':
      if (action.quantity < 1) {
        return { items: state.items.filter((i) => i.variantId !== action.variantId) }
      }
      return {
        items: state.items.map((i) => (i.variantId === action.variantId ? { ...i, quantity: action.quantity } : i)),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotalNpr: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (variantId: number) => void
  setQuantity: (variantId: number, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) })
    } catch {
      // ignore corrupted cart data
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }, [state.items])

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      totalItems: state.items.reduce((sum, i) => sum + i.quantity, 0),
      subtotalNpr: state.items.reduce((sum, i) => sum + i.unitPriceNpr * i.quantity, 0),
      addItem: (item, quantity = 1) => dispatch({ type: 'ADD', item, quantity }),
      removeItem: (variantId) => dispatch({ type: 'REMOVE', variantId }),
      setQuantity: (variantId, quantity) => dispatch({ type: 'SET_QUANTITY', variantId, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
