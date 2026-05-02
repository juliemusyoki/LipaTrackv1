export function money(amount) {
  return `Ksh ${Number(amount || 0).toLocaleString()}`
}

export function initialsFromName(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function getDealStatus(deal) {
  if (deal.paid <= 0) return "Unpaid"
  if (deal.paid >= deal.sellingAmount) return "Paid"
  return "Partial"
}

export function sortDeals(deals) {
  const rank = {
    Unpaid: 1,
    Partial: 2,
    Paid: 3,
  }

  return [...deals].sort((a, b) => {
    return rank[getDealStatus(a)] - rank[getDealStatus(b)]
  })
}