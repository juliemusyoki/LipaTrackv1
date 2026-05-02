import { ArrowLeft, Wallet } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function RecordPayment() {
  const navigate = useNavigate()
  const { deals, recordPayment } = useApp()

  const unpaidDeals = deals.filter((deal) => deal.paid < deal.sellingAmount)

  const [selectedDealId, setSelectedDealId] = useState(unpaidDeals[0]?.id || "")
  const [amountPaid, setAmountPaid] = useState("")

  const selectedDeal = deals.find((deal) => deal.id === selectedDealId)
  const currentDue = selectedDeal ? selectedDeal.sellingAmount - selectedDeal.paid : 0
  const newDue = Math.max(currentDue - (Number(amountPaid) || 0), 0)

  function handleSave() {
    if (!selectedDealId) return alert("Please select an invoice")
    if (!amountPaid) return alert("Amount paid is required")

    recordPayment({
      dealId: selectedDealId,
      amountPaid,
    })

    navigate("/deals")
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/actions" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Record Payment</h1>
            <p className="text-xs text-gray-500">Update what has been paid.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-gray-900 text-white p-5 mb-5">
          <div className="flex items-center gap-2">
            <Wallet size={18} />
            <p className="text-xs uppercase font-semibold text-gray-300">New balance due</p>
          </div>

          <h2 className="text-4xl font-bold mt-4">{money(newDue)}</h2>
          <p className="text-xs mt-2 text-gray-300">After this payment is recorded</p>
        </section>

        {unpaidDeals.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 p-5 text-center">
            <p className="font-bold">No unpaid invoices</p>
            <p className="text-sm text-gray-500 mt-2">
              All invoices are currently fully paid.
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Invoice</label>
              <select
                value={selectedDealId}
                onChange={(e) => setSelectedDealId(e.target.value)}
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none bg-white"
              >
                {unpaidDeals.map((deal) => (
                  <option key={deal.id} value={deal.id}>
                    {deal.code} — {deal.note}
                  </option>
                ))}
              </select>
            </div>

            {selectedDeal && (
              <div className="rounded-xl bg-[#f5f7f6] border border-gray-100 p-4">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500">Current due</p>
                  <p className="text-sm font-bold text-red-500">{money(currentDue)}</p>
                </div>

                <div className="flex justify-between mt-3">
                  <p className="text-xs text-gray-500">Already paid</p>
                  <p className="text-sm font-bold">{money(selectedDeal.paid)}</p>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-600">Amount paid</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="50000"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
            >
              Save Payment
            </button>
          </form>
        )}
      </div>

      <BottomNav />
    </AppShell>
  )
}