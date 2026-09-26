import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, type Enquiry } from '../../lib/api'
import { formatNepaliDateTime } from '../../lib/datetime'
import Layout from '../../components/Layout'

const STATUSES = ['new', 'read', 'responded']

export default function EnquiryDetail() {
  const { id } = useParams<{ id: string }>()
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    api.getEnquiry(Number(id)).then(setEnquiry).catch((err) => setError(err.message))
  }, [id])

  const handleStatusChange = async (status: string) => {
    if (!enquiry) return
    setUpdating(true)
    try {
      const updated = await api.updateEnquiryStatus(enquiry.id, status)
      setEnquiry(updated)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  if (error) return <Layout><p className="font-body text-sm text-[#8B4A2E]">{error}</p></Layout>
  if (!enquiry) return <Layout><p className="font-body text-sm text-[#676A61]">Loading…</p></Layout>

  return (
    <Layout>
      <h1 className="font-display font-black text-2xl uppercase text-[#22231F] mb-1">{enquiry.name}</h1>
      <p className="font-body text-sm text-[#676A61] mb-6">Received {formatNepaliDateTime(enquiry.created_at)}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
          <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-2">
            {enquiry.subject || enquiry.enquiry_type}
          </h2>
          <p className="font-body text-xs text-[#676A61] mb-4">{enquiry.enquiry_type}</p>
          <p className="font-body text-sm text-[#22231F] whitespace-pre-wrap leading-relaxed">{enquiry.message}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
            <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Contact Details</h2>
            <div className="space-y-1 font-body text-sm text-[#676A61]">
              <p>
                <a href={`mailto:${enquiry.email}`} className="text-[#264F24] hover:underline">
                  {enquiry.email}
                </a>
              </p>
              {enquiry.phone && <p>{enquiry.phone}</p>}
              {enquiry.org && <p>{enquiry.org}</p>}
              {enquiry.contact_method && <p>Prefers: {enquiry.contact_method}</p>}
              <p className="text-xs mt-2">{enquiry.consent ? '✓ Consented to be contacted' : 'No consent recorded'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DDCD] p-6">
            <h2 className="font-display font-black text-sm uppercase text-[#22231F] mb-4">Status</h2>
            <select
              value={enquiry.status}
              disabled={updating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCD] font-body text-sm capitalize"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Layout>
  )
}
