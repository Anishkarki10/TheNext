import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, subtotalNpr, setQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <h1 className="font-display font-black text-4xl text-[#22231F] uppercase mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DDCD] p-10 text-center">
              <p className="font-body text-[#676A61] mb-6">Your cart is empty.</p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl border border-[#E8DDCD] divide-y divide-[#E8DDCD]">
                {items.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-4 p-5">
                    {item.image && (
                      <img src={item.image} alt={item.productName} className="w-16 h-16 rounded-xl object-cover bg-[#E8DDCD]" />
                    )}
                    <div className="flex-1">
                      <div className="font-body font-semibold text-sm text-[#22231F]">{item.productName}</div>
                      <div className="font-body text-xs text-[#676A61]">{item.variantLabel} · NPR {item.unitPriceNpr}</div>
                    </div>
                    <div className="flex items-center border-2 border-[#E8DDCD] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                        className="px-3 py-1.5 font-display font-bold text-[#264F24]"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 font-body text-sm font-semibold text-[#22231F]">{item.quantity}</span>
                      <button
                        onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                        className="px-3 py-1.5 font-display font-bold text-[#264F24]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-24 text-right font-display font-black text-sm text-[#264F24]">
                      NPR {item.unitPriceNpr * item.quantity}
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-[#676A61] hover:text-red-700 font-body text-xs"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-white rounded-2xl border border-[#E8DDCD] p-6 flex items-center justify-between">
                <span className="font-body text-sm text-[#676A61]">Subtotal</span>
                <span className="font-display font-black text-2xl text-[#264F24]">NPR {subtotalNpr}</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => navigate('/checkout')}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
