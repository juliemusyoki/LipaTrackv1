import { useEffect, useState } from "react"
import { initialCustomers, initialDeals } from "../data/initialData"
import { getDealStatus, initialsFromName, sortDeals } from "../lib/utils"
import { AppContext } from "./appContextObject"

const initialBusinessProfile = {
  businessName: "RightSign Suppliers",
  ownerName: "Jane",
  email: "",
  phone: "",
}

export function AppProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("lipatrack_customers")
    return saved ? JSON.parse(saved) : initialCustomers
  })

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem("lipatrack_deals")
    return saved ? JSON.parse(saved) : initialDeals
  })

  const [businessProfile, setBusinessProfile] = useState(() => {
    const saved = localStorage.getItem("lipatrack_business_profile")
    return saved ? JSON.parse(saved) : initialBusinessProfile
  })

  useEffect(() => {
    localStorage.setItem("lipatrack_customers", JSON.stringify(customers))
  }, [customers])

  useEffect(() => {
    localStorage.setItem("lipatrack_deals", JSON.stringify(deals))
  }, [deals])

  useEffect(() => {
    localStorage.setItem("lipatrack_business_profile", JSON.stringify(businessProfile))
  }, [businessProfile])

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

  function addDeal({ customerId, code, note, sellingAmount, costAmount }) {
    const fallbackCode = `INV-${String(deals.length + 1).padStart(3, "0")}`

    const newDeal = {
      id: crypto.randomUUID(),
      customerId,
      code: code?.trim() || fallbackCode,
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

  function getCustomerDeals(customerId) {
    return sortDeals(deals.filter((deal) => deal.customerId === customerId))
  }

  function getCustomerBalance(customerId) {
    return getCustomerDeals(customerId).reduce(
      (sum, deal) => sum + Math.max(deal.sellingAmount - deal.paid, 0),
      0
    )
  }

  function getCustomerTotals(customerId) {
    const customerDeals = getCustomerDeals(customerId)

    const totalSales = customerDeals.reduce((sum, deal) => sum + deal.sellingAmount, 0)
    const totalPaid = customerDeals.reduce((sum, deal) => sum + deal.paid, 0)
    const totalCost = customerDeals.reduce((sum, deal) => sum + deal.costAmount, 0)
    const totalProfit = totalSales - totalCost
    const totalOutstanding = totalSales - totalPaid

    return {
      totalSales,
      totalPaid,
      totalCost,
      totalProfit,
      totalOutstanding,
      dealsCount: customerDeals.length,
    }
  }

  function getAppTotals() {
    const totalSales = deals.reduce((sum, deal) => sum + deal.sellingAmount, 0)
    const totalPaid = deals.reduce((sum, deal) => sum + deal.paid, 0)
    const totalCost = deals.reduce((sum, deal) => sum + deal.costAmount, 0)
    const totalProfit = totalSales - totalCost
    const totalOutstanding = totalSales - totalPaid

    return {
      totalSales,
      totalPaid,
      totalCost,
      totalProfit,
      totalOutstanding,
      customersCount: customers.length,
      dealsCount: deals.length,
    }
  }

  function updateBusinessProfile(updates) {
    setBusinessProfile((current) => ({
      ...current,
      ...updates,
    }))
  }

  const value = {
    customers,
    deals: sortDeals(deals),
    businessProfile,
    addCustomer,
    addDeal,
    recordPayment,
    getCustomerBalance,
    getCustomerDeals,
    getCustomerTotals,
    getAppTotals,
    getDealStatus,
    updateBusinessProfile,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}