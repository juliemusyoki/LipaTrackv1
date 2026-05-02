import { ArrowLeft, Calculator } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function AddDeal() {
  const navigate = useNavigate()
  const { customers, addDeal } = useApp()

  const [customerId, setCustomerId] = useState(customers[0]?.id || "")
  const [note, setNote] = useState("")
  const [sellingAmount, setSellingAmount] = useState("")
  const [costAmount, setCostAmount] = useState("")

  const selling = Number(sellingAmount) || 0
  const cost = Number(costAmount) || 0
  const profit = selling - cost

  function handleSave() {
    if (!customerId) return alert("Please add or select a customer")
    if (!sellingAmount) return alert("Selling amount is required")
    if (!costAmount) return alert("Cost amount is required")

    const deal = addDeal({
      customerId,
      note: note || "Untitled deal",
      sellingAmount,
      costAmount,
    })

    navigate(`/customers/${deal.customerId}`)
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/actions" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Add Invoice</h1>
            <p className="text-xs text-gray-500">Track sale, cost, profit and balance.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <div className="flex items-center gap-2">
            <Calculator size={18} />
            <p className="text-xs uppercase font-semibold text-green-100">Estimated profit</p>
          </div>

          <h2 className="text-4xl font-bold mt-4">{money(profit)}</h2>
          <p className="text-xs mt-2 text-green-100">
            Selling amount minus cost amount
          </p>
        </section>

        {customers.length === 0 ? (
          <Link
            to="/add-customer"
            className="block rounded-2xl border border-gray-100 p-5 text-center font-semibold text-green-700"
          >
            Add a customer first
          </Link>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Customer</label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none bg-white"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Invoice note</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Medical supplies batch"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Selling amount</label>
              <input
                type="number"
                value={sellingAmount}
                onChange={(e) => setSellingAmount(e.target.value)}
                placeholder="150000"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Cost amount</label>
              <input
                type="number"
                value={costAmount}
                onChange={(e) => setCostAmount(e.target.value)}
                placeholder="100000"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
            >
              Save Invoice
            </button>
          </form>
        )}
      </div>

      <BottomNav />
    </AppShell>
  )
}