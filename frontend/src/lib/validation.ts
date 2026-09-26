export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 || digits.length === 7
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Scrolls to and focuses the first field named in `errors`, matched by element id. */
export function focusFirstError(errors: Record<string, string>): void {
  const firstKey = Object.keys(errors)[0]
  if (!firstKey) return
  requestAnimationFrame(() => {
    const el = document.getElementById(firstKey)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.focus({ preventScroll: true })
    }
  })
}
