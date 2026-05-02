import { useEffect, useState } from "react"
import { initialCustomers, initialDeals } from "../data/initialData"
import { getDealStatus, initialsFromName, sortDeals } from "../lib/utils"
import { AppContext } from "./appContextObject"

export function AppProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("lipatrack_customers")
    return saved ? JSON.parse(saved) : initialCustomers
  })

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem("lipatrack_deals")
    return saved ? JSON.parse(saved) : initialDeals
  })

  useEffect(() => {
    localStorage.setItem("lipatrack_customers", JSON.stringify(customers))
  }, [customers])

  useEffect(() => {
    localStorage.setItem("lipatrack_deals", JSON.stringify(deals))
  }, [deals])

  function addCustomer({ name, phone, business }) {
    const newCustomer = {
      id: crypto.randomUUID(),
      name,
      phone,
      business,
      initials: initialsFromName(name),
    }

    setCustomers((current) => [newCustomer, ...current])
    return newCustomer
  }

  function addDeal({ customerId, note, sellingAmount, costAmount }) {
    const newDeal = {
      id: crypto.randomUUID(),
      customerId,
      code: `INV-${String(deals.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      sellingAmount: Number(sellingAmount),
      costAmount: Number(costAmount),
      paid: 0,
      note,
    }

    setDeals((current) => [newDeal, ...current])
    return newDeal
  }

  function recordPayment({ dealId, amountPaid }) {
    setDeals((current) =>
      current.map((deal) => {
        if (deal.id !== dealId) return deal

        return {
          ...deal,
          paid: Math.min(deal.sellingAmount, deal.paid + Number(amountPaid)),
        }
      })
    )
  }

  function getCustomerBalance(customerId) {
    return deals
      .filter((deal) => deal.customerId === customerId)
      .reduce((sum, deal) => sum + Math.max(deal.sellingAmount - deal.paid, 0), 0)
  }

  function getCustomerDeals(customerId) {
    return sortDeals(deals.filter((deal) => deal.customerId === customerId))
  }

  const value = {
    customers,
    deals: sortDeals(deals),
    addCustomer,
    addDeal,
    recordPayment,
    getCustomerBalance,
    getCustomerDeals,
    getDealStatus,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}