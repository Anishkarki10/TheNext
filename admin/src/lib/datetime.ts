const NPT_TZ = 'Asia/Kathmandu'

/** Formats an ISO timestamp in Nepal Standard Time (UTC+5:45), e.g. "20 Sep 2026, 5:08 PM NPT". */
export function formatNepaliDateTime(iso: string): string {
  const formatted = new Date(iso).toLocaleString('en-US', {
    timeZone: NPT_TZ,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${formatted} NPT`
}

/** Formats an ISO timestamp as a Nepal-Standard-Time date only, e.g. "20 Sep 2026". */
export function formatNepaliDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    timeZone: NPT_TZ,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
