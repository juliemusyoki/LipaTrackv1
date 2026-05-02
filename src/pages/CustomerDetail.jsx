import { ArrowLeft, Plus, Receipt, Wallet } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { customers, deals, money } from "../data/mockData"

export default function CustomerDetail() {
  const { id } = useParams()
  const customer = customers.find((c) => c.id === id)
  const customerDeals = deals.filter((deal) => deal.customerId === id)

  if (!customer) {
    return (
      <AppShell>
        <div className="px-5 pt-12">
          <p>Customer not found.</p>
        </div>
      </AppShell>
    )
  }

  const totalSales = customerDeals.reduce((sum, deal) => sum + deal.sellingAmount, 0)
  const totalPaid = customerDeals.reduce((sum, deal) => sum + deal.paid, 0)
  const totalProfit = customerDeals.reduce(
    (sum, deal) => sum + (deal.sellingAmount - deal.costAmount),
    0
  )
  const totalDue = totalSales - totalPaid

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/customers" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <p className="text-xs text-gray-500">{customerDeals.length} deals tracked</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 shadow-md">
          <p className="text-xs uppercase font-semibold text-green-100">Outstanding balance</p>
          <h2 className="text-4xl font-bold mt-3">{money(totalDue)}</h2>
          <p className="text-xs mt-2 text-green-100">Amount still expected from this customer</p>
        </section>

        <section className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 font-semibold">Paid</p>
            <p className="font-bold mt-2">{money(totalPaid)}</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 font-semibold">Profit</p>
            <p className="font-bold mt-2 text-green-700">{money(totalProfit)}</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <Link
            to="/add-deal"
            className="h-12 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Deal
          </Link>

          <Link
            to="/record-payment"
            className="h-12 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Wallet size={18} />
            Payment
          </Link>
        </div>

        <h3 className="font-bold text-sm mt-7 mb-3">Deals</h3>

        <section className="space-y-3">
          {customerDeals.map((deal) => {
            const profit = deal.sellingAmount - deal.costAmount
            const due = deal.sellingAmount - deal.paid

            return (
              <article key={deal.id} className="rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center">
                      <Receipt size={18} />
                    </div>

                    <div>
                      <p className="font-bold text-sm">{deal.code}</p>
                      <p className="text-xs text-gray-500 mt-1">{deal.note}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-gray-100">
                    {deal.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[11px] text-gray-500">Amount</p>
                    <p className="text-xs font-bold mt-1">{money(deal.sellingAmount)}</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500">Due</p>
                    <p className="text-xs font-bold mt-1 text-red-500">{money(due)}</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500">Profit</p>
                    <p className="text-xs font-bold mt-1 text-green-700">{money(profit)}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}