import { ArrowLeft, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function ProfitSummary() {
  const { getAppTotals } = useApp()
  const totals = getAppTotals()
  const margin =
    totals.totalSales > 0
      ? ((totals.totalProfit / totals.totalSales) * 100).toFixed(1)
      : 0

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/menu" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Profit Summary</h1>
            <p className="text-xs text-gray-500">Sales, cost and profit overview.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <BarChart3 size={22} />
          <p className="text-xs uppercase font-semibold text-green-100 mt-4">Net profit</p>
          <h2 className="text-4xl font-bold mt-2">{money(totals.totalProfit)}</h2>
          <p className="text-xs text-green-100 mt-2">{margin}% profit margin</p>
        </section>

        <section className="space-y-3">
          {[
            ["Total Sales", totals.totalSales],
            ["Total Cost", totals.totalCost],
            ["Total Paid", totals.totalPaid],
            ["Outstanding", totals.totalOutstanding],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-gray-100 p-4 flex justify-between">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-bold">{money(value)}</p>
            </div>
          ))}
        </section>
      </div>
      <BottomNav />
    </AppShell>
  )
}