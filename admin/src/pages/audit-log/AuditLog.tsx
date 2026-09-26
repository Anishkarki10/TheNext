import { useEffect, useState } from 'react'
import { api, type AuditLogEntry } from '../../lib/api'
import { formatNepaliDateTime } from '../../lib/datetime'
import Layout from '../../components/Layout'

const ACTION_LABELS: Record<string, string> = {
  'product.create': 'Created product',
  'product.update': 'Updated product',
  'product.delete': 'Deleted product',
  'product.image_upload': 'Uploaded product image',
  'product.image_delete': 'Deleted product image',
  'order.status_update': 'Updated order',
  'enquiry.status_update': 'Updated enquiry',
}

function describeDetails(entry: AuditLogEntry): string {
  const d = entry.details
  if (!d) return ''
  if (entry.action === 'order.status_update' || entry.action === 'enquiry.status_update') {
    const parts: string[] = []
    for (const [field, change] of Object.entries(d)) {
      if (change && typeof change === 'object' && 'from' in change && 'to' in change) {
        parts.push(`${field}: ${(change as { from: string }).from} → ${(change as { to: string }).to}`)
      }
    }
    if (parts.length) return parts.join(', ')
  }
  if (entry.action === 'product.update' && Array.isArray(d.fields)) {
    return `fields: ${(d.fields as string[]).join(', ')}`
  }
  if (typeof d.name === 'string' || typeof d.sku === 'string') {
    return [d.name, d.sku].filter(Boolean).join(' · ')
  }
  return JSON.stringify(d)
}

export default function AuditLog() {
  const [entries, setEntries] = useState<AuditLogEntry[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .listAuditLog({ page })
      .then((res) => {
        setEntries(res.entries)
        setTotalPages(res.total_pages)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <Layout>
      <h1 className="font-display font-black text-2xl uppercase text-[#22231F] mb-2">Audit Log</h1>
      <p className="font-body text-sm text-[#676A61] mb-6">
        A record of every admin action — product changes, order/enquiry status updates.
      </p>

      {error && <p className="font-body text-sm text-[#8B4A2E] mb-4">{error}</p>}
      {loading && <p className="font-body text-sm text-[#676A61]">Loading…</p>}

      <div className="bg-white rounded-2xl border border-[#E8DDCD] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F5EDE1]">
            <tr>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">When</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Admin</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Action</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Target</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DDCD]">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-5 py-3 font-body text-xs text-[#676A61] whitespace-nowrap">{formatNepaliDateTime(entry.created_at)}</td>
                <td className="px-5 py-3 font-body text-sm text-[#22231F]">{entry.admin_email}</td>
                <td className="px-5 py-3 font-body text-sm font-semibold text-[#264F24]">{ACTION_LABELS[entry.action] || entry.action}</td>
                <td className="px-5 py-3 font-body text-xs text-[#676A61]">
                  {entry.target_type && entry.target_id ? `${entry.target_type} #${entry.target_id}` : '—'}
                </td>
                <td className="px-5 py-3 font-body text-xs text-[#676A61] max-w-sm">{describeDetails(entry)}</td>
              </tr>
            ))}
            {!loading && entries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-[#676A61]">
                  No admin actions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-full font-body text-sm ${p === page ? 'bg-[#264F24] text-white' : 'bg-white border border-[#E8DDCD]'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </Layout>
  )
}
