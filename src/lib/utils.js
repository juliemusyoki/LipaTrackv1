export function money(amount = 0) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getDealStatus(deal) {
  const paid = Number(deal.paidAmount || 0)
  const total = Number(deal.sellingAmount || 0)

  if (paid <= 0) return "unpaid"

  if (paid >= total) return "paid"

  return "partial"
}

export function calculateBalance(deal) {
  return (
    Number(deal.sellingAmount || 0) -
    Number(deal.paidAmount || 0)
  )
}