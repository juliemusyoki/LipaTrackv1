import { FileText, Search } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { getDealStatus, money } from "../lib/utils"

export default function Deals() {
  const { deals, customers } = useApp()

  const totalOutstanding = deals.reduce(
    (sum, deal) => sum + Math.max(deal.sellingAmount - deal.paid, 0),
    0
  )

  function getCustomerName(customerId) {
    return customers.find((customer) => customer.id === customerId)?.name || "Unknown Customer"
  }

  function getStatusClass(status) {
    if (status === "Paid") return "bg-green-50 text-green-700"
    if (status === "Partial") return "bg-yellow-50 text-yellow-700"
    return "bg-red-50 text-red-600"
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            LipaTrack
          </p>
          <h1 className="text-2xl font-bold mt-1">Invoices</h1>
          <p className="text-xs text-gray-500 mt-1">
            Unpaid invoices stay at the top until cleared.
          </p>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 shadow-md mb-5">
          <p className="text-xs uppercase font-semibold text-green-100">
            Total outstanding
          </p>
          <h2 className="text-4xl font-bold mt-4">{money(totalOutstanding)}</h2>
          <p className="text-xs mt-2 text-green-100">
            Across {deals.length} invoices
          </p>
        </section>

        <div className="h-12 rounded-xl bg-gray-50 border border-gray-100 px-4 flex items-center gap-3 mb-5">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search invoice"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        <section className="space-y-3">
          {deals.map((deal) => {
            const status = getDealStatus(deal)
            const due = Math.max(deal.sellingAmount - deal.paid, 0)
            const profit = deal.sellingAmount - deal.costAmount

            return (
              <article
                key={deal.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center">
                      <FileText size={18} />
                    </div>

                    <div>
                      <p className="font-bold text-sm">{deal.code}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getCustomerName(deal.customerId)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{deal.note}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${getStatusClass(status)}`}>
                    {status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[11px] text-gray-500">Amount</p>
                    <p className="text-xs font-bold mt-1">{money(deal.sellingAmount)}</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500">Due</p>
                    <p className={`text-xs font-bold mt-1 ${due > 0 ? "text-red-500" : "text-green-700"}`}>
                      {money(due)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500">Profit</p>
                    <p className={`text-xs font-bold mt-1 ${profit >= 0 ? "text-green-700" : "text-red-500"}`}>
                      {money(profit)}
                    </p>
                  </div>
                </div>

                {due > 0 && (
                  <Link
                    to="/record-payment"
                    className="mt-4 h-10 rounded-xl bg-gray-900 text-white text-sm font-semibold flex items-center justify-center"
                  >
                    Record Payment
                  </Link>
                )}
              </article>
            )
          })}
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}