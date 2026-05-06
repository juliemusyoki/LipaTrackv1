import { useCallback, useEffect, useState } from "react"
import { getDealStatus, initialsFromName, sortDeals } from "../lib/utils"
import { supabase } from "../lib/supabaseClient"
import { AppContext } from "./appContextObject"

const initialBusinessProfile = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  city: "",
}

export function AppProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [customers, setCustomers] = useState([])
  const [deals, setDeals] = useState([])
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile)

  const hydrateAppData = useCallback(async (user) => {
    if (!user) {
      setCustomers([])
      setDeals([])
      setBusinessProfile(initialBusinessProfile)
      return
    }

    const [profileResult, customersResult, dealsResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, business_name, email, phone_number, city")
        .eq("auth_user_id", user.id)
        .maybeSingle(),
      supabase
        .from("customers")
        .select("id, name, phone, business_type")
        .eq("auth_user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("deals")
        .select("id, customer_id, code, note, selling_amount, cost_amount, paid_amount, created_at")
        .eq("auth_user_id", user.id)
        .order("created_at", { ascending: false }),
    ])

    const profile = profileResult.data
    setBusinessProfile({
      businessName: profile?.business_name || "",
      ownerName: profile?.full_name || "",
      email: profile?.email || user.email || "",
      phone: profile?.phone_number || "",
      city: profile?.city || "",
    })

    const customerRows = customersResult.data || []
    setCustomers(
      customerRows.map((customer) => ({
        id: customer.id,
        name: customer.name,
        phone: customer.phone || "",
        business: customer.business_type || "",
        initials: initialsFromName(customer.name),
      }))
    )

    const dealRows = dealsResult.data || []
    setDeals(
      dealRows.map((deal) => ({
        id: deal.id,
        customerId: deal.customer_id,
        code: deal.code,
        note: deal.note || "",
        date: new Date(deal.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        sellingAmount: Number(deal.selling_amount),
        costAmount: Number(deal.cost_amount),
        paid: Number(deal.paid_amount || 0),
      }))
    )
  }, [])

  useEffect(() => {
    let isActive = true

    async function bootstrapSession() {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user || null

      if (!isActive) return
      setAuthUser(user)

      if (user) {
        await hydrateAppData(user)
      }
    }

    bootstrapSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null
      setAuthUser(user)

      // Do not await Supabase queries inside auth callback to avoid deadlocks.
      setTimeout(() => {
        hydrateAppData(user)
      }, 0)
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [hydrateAppData])

  async function addCustomer({ name, phone, business }) {
    if (!authUser) throw new Error("You must be logged in")

    const { data, error } = await supabase
      .from("customers")
      .insert({
        auth_user_id: authUser.id,
        name,
        phone,
        business_type: business,
      })
      .select("id, name, phone, business_type")
      .single()

    if (error) throw error

    const newCustomer = {
      id: data.id,
      name,
      phone,
      business,
      initials: initialsFromName(name),
    }

    setCustomers((current) => [newCustomer, ...current])
    return newCustomer
  }

  async function addDeal({ customerId, code, note, sellingAmount, costAmount }) {
    if (!authUser) throw new Error("You must be logged in")

    const fallbackCode = `INV-${String(deals.length + 1).padStart(3, "0")}`
    const invoiceCode = code?.trim() || fallbackCode
    const createdAt = new Date().toISOString()

    const { data, error } = await supabase
      .from("deals")
      .insert({
        auth_user_id: authUser.id,
        customer_id: customerId,
        code: invoiceCode,
        note,
        selling_amount: Number(sellingAmount),
        cost_amount: Number(costAmount),
        paid_amount: 0,
        created_at: createdAt,
      })
      .select("id")
      .single()

    if (error) throw error

    const newDeal = {
      id: data.id,
      customerId,
      code: invoiceCode,
      date: new Date(createdAt).toLocaleDateString("en-GB", {
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

  async function recordPayment({ dealId, amountPaid }) {
    if (!authUser) throw new Error("You must be logged in")

    const targetDeal = deals.find((deal) => deal.id === dealId)
    if (!targetDeal) return

    const nextPaid = Math.min(targetDeal.sellingAmount, targetDeal.paid + Number(amountPaid))

    const { error } = await supabase
      .from("deals")
      .update({ paid_amount: nextPaid })
      .eq("id", dealId)
      .eq("auth_user_id", authUser.id)

    if (error) throw error

    setDeals((current) =>
      current.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              paid: nextPaid,
            }
          : deal
      )
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

  async function updateBusinessProfile(updates) {
    if (!authUser) throw new Error("You must be logged in")

    const mergedProfile = {
      ...businessProfile,
      ...updates,
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        auth_user_id: authUser.id,
        email: mergedProfile.email || authUser.email || null,
        full_name: mergedProfile.ownerName || null,
        business_name: mergedProfile.businessName || null,
        phone_number: mergedProfile.phone || null,
        city: mergedProfile.city || null,
      },
      { onConflict: "auth_user_id" }
    )

    if (error) throw error

    setBusinessProfile((current) => ({
      ...current,
      ...updates,
    }))
  }

  async function signOut() {
    setAuthUser(null)
    setCustomers([])
    setDeals([])
    setBusinessProfile(initialBusinessProfile)

    const signOutRequest = supabase.auth.signOut()
    const timeout = new Promise((resolve) => {
      setTimeout(() => resolve({ error: null }), 2000)
    })

    const result = await Promise.race([signOutRequest, timeout])
    if (result?.error) throw result.error
  }

  const value = {
    customers,
    deals: sortDeals(deals),
    businessProfile,
    authUser,
    addCustomer,
    addDeal,
    recordPayment,
    getCustomerBalance,
    getCustomerDeals,
    getCustomerTotals,
    getAppTotals,
    getDealStatus,
    updateBusinessProfile,
    signOut,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}