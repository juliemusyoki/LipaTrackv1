import { ArrowLeft, Calculator } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { customers, money } from "../data/mockData"

export default function AddDeal() {
  const [sellingAmount, setSellingAmount] = useState("")
  const [costAmount, setCostAmount] = useState("")

  const selling = Number(sellingAmount) || 0
  const cost = Number(costAmount) || 0
  const profit = selling - cost

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Add Deal</h1>
            <p className="text-xs text-gray-500">Track amount, cost, profit and balance.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <div className="flex items-center gap-2">
            <Calculator size={18} />
            <p className="text-xs uppercase font-semibold text-green-100">Estimated profit</p>
          </div>
          <h2 className="text-4xl font-bold mt-4">{money(profit)}</h2>
          <p className="text-xs mt-2 text-green-100">Selling amount minus cost amount</p>
        </section>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Customer</label>
            <select className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none bg-white">
              {customers.map((customer) => (
                <option key={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Deal note</label>
            <input
              placeholder="e.g. Medical supplies batch"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Selling amount</label>
            <input
              type="number"
              placeholder="150000"
              value={sellingAmount}
              onChange={(e) => setSellingAmount(e.target.value)}
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Cost amount</label>
            <input
              type="number"
              placeholder="100000"
              value={costAmount}
              onChange={(e) => setCostAmount(e.target.value)}
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
          >
            Save Deal
          </button>
        </form>
      </div>

      <BottomNav />
    </AppShell>
  )
}