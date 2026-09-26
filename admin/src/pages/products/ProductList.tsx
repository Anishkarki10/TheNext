import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Product } from '../../lib/api'
import Layout from '../../components/Layout'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api
      .listProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    try {
      await api.deleteProduct(product.id)
      load()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-black text-2xl uppercase text-[#22231F]">Products</h1>
        <Link
          to="/products/new"
          className="px-5 py-2.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
        >
          + New Product
        </Link>
      </div>

      {error && <p className="font-body text-sm text-[#8B4A2E] mb-4">{error}</p>}
      {loading && <p className="font-body text-sm text-[#676A61]">Loading…</p>}

      <div className="bg-white rounded-2xl border border-[#E8DDCD] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F5EDE1]">
            <tr>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Name</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">SKU</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Slug</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Available</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Variants</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DDCD]">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-3 font-body text-sm text-[#22231F] font-semibold">{product.name}</td>
                <td className="px-5 py-3 font-body text-sm text-[#676A61]">{product.sku}</td>
                <td className="px-5 py-3 font-body text-sm text-[#676A61]">{product.slug}</td>
                <td className="px-5 py-3 font-body text-sm">{product.is_available ? '● Available' : 'Unavailable'}</td>
                <td className="px-5 py-3 font-body text-sm text-[#676A61]">{product.variants.length}</td>
                <td className="px-5 py-3 text-right space-x-3">
                  <Link to={`/products/${product.id}/edit`} className="font-body text-sm font-semibold text-[#264F24] hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product)} className="font-body text-sm font-semibold text-[#8B4A2E] hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center font-body text-sm text-[#676A61]">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
