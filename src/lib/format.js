/* Price formatting — Czech convention: grouped thousands, currency after the
   amount ("1 090 Kč"). Deterministic (no Intl locale dependency). */
export function formatPrice(amount, currency = 'Kč') {
  const n = Math.round(Number(amount) || 0)
  const grouped = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // thin space
  return `${grouped} ${currency}`
}
