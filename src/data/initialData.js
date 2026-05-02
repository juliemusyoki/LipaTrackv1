export const initialCustomers = [
  {
    id: "1",
    name: "FW Services",
    initials: "FW",
    phone: "0712 000 000",
    business: "Medical Supplier",
  },
  {
    id: "2",
    name: "City Clinic",
    initials: "CC",
    phone: "0722 000 000",
    business: "Clinic",
  },
  {
    id: "3",
    name: "Beauty Salon Ltd",
    initials: "BS",
    phone: "0733 000 000",
    business: "Salon",
  },
]

export const initialDeals = [
  {
    id: "1",
    customerId: "1",
    code: "INV-003",
    date: "14 Feb 2026",
    sellingAmount: 150000,
    costAmount: 100000,
    paid: 0,
    note: "Lab reagents batch",
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
  },
]