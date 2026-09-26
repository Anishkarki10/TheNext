import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Enquiry } from '../../lib/api'
import { formatNepaliDate } from '../../lib/datetime'
import Layout from '../../components/Layout'

const STATUSES = ['', 'new', 'read', 'responded']

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api
      .listEnquiries({ status: status || undefined, page })
      .then((res) => {
        setEnquiries(res.enquiries)
        setTotalPages(res.total_pages)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [status, page])

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-black text-2xl uppercase text-[#22231F]">Enquiries</h1>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 rounded-xl border border-[#E8DDCD] font-body text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s ? s : 'All statuses'}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="font-body text-sm text-[#8B4A2E] mb-4">{error}</p>}
      {loading && <p className="font-body text-sm text-[#676A61]">Loading…</p>}

      <div className="bg-white rounded-2xl border border-[#E8DDCD] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F5EDE1]">
            <tr>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">From</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Type</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Subject</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Status</th>
              <th className="px-5 py-3 font-body text-xs font-bold text-[#676A61] uppercase">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DDCD]">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className={enquiry.status === 'new' ? 'bg-[#264F24]/5' : undefined}>
                <td className="px-5 py-3 font-body text-sm">
                  <Link to={`/enquiries/${enquiry.id}`} className="font-semibold text-[#264F24] hover:underline">
                    {enquiry.name}
                  </Link>
                  <div className="text-xs text-[#676A61]">{enquiry.email}</div>
                </td>
                <td className="px-5 py-3 font-body text-sm text-[#22231F]">{enquiry.enquiry_type}</td>
                <td className="px-5 py-3 font-body text-sm text-[#676A61] max-w-xs truncate">{enquiry.subject || '—'}</td>
                <td className="px-5 py-3 font-body text-sm capitalize">{enquiry.status}</td>
                <td className="px-5 py-3 font-body text-sm text-[#676A61]">{formatNepaliDate(enquiry.created_at)}</td>
              </tr>
            ))}
            {!loading && enquiries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-[#676A61]">
                  No enquiries found.
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
