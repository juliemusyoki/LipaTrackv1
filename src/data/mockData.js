export const customers = [
  {
    id: "1",
    name: "FW Services",
    initials: "FW",
    totalOwed: 184000,
    deals: 2,
  },
  {
    id: "2",
    name: "City Clinic",
    initials: "CC",
    totalOwed: 72000,
    deals: 1,
  },
  {
    id: "3",
    name: "Beauty Salon Ltd",
    initials: "BS",
    totalOwed: 15000,
    deals: 1,
  },
]

export const deals = [
  {
    id: "1",
    customerId: "1",
    code: "INV-003",
    date: "14 Feb 2026",
    sellingAmount: 150000,
    costAmount: 100000,
    paid: 0,
    note: "Lab reagents batch",
    status: "Unpaid",
  },
  {
    id: "2",
    customerId: "1",
    code: "INV-002",
    date: "05 Feb 2026",
    sellingAmount: 34000,
    costAmount: 24000,
    paid: 16000,
    note: "Medical supplies",
    status: "Partial",
  },
  {
    id: "3",
    customerId: "2",
    code: "INV-001",
    date: "28 Jan 2026",
    sellingAmount: 66000,
    costAmount: 46000,
    paid: 66000,
    note: "Clinic order",
    status: "Paid",
  },
]

export function money(amount) {
  return `Ksh ${amount.toLocaleString()}`
}