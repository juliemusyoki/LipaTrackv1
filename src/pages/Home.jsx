import { Bell, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { customers, money } from "../data/mockData"

export default function Home() {
  const totalOutstanding = customers.reduce((sum, c) => sum + c.totalOwed, 0)

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-700 grid place-items-center text-white font-bold">
              L
            </div>
            <h1 className="text-xl font-bold text-green-700">LipaTrack</h1>
          </div>
          <Bell size={22} className="text-gray-700" />
        </header>

        <p className="text-sm font-semibold">Good morning, Jane 👋</p>
        <p className="text-xs text-gray-500 mt-1">Here’s what’s happening in your business.</p>

        <section className="mt-5 rounded-2xl bg-green-700 text-white p-5 shadow-md">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold uppercase">Total Outstanding</p>
            <ChevronRight size={20} />
          </div>
          <h2 className="text-4xl font-bold mt-4">{money(totalOutstanding)}</h2>
          <p className="text-xs mt-2 text-green-100">Across 3 customers</p>
        </section>

        <section className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-[11px] uppercase text-gray-500 font-semibold">Total Sales</p>
            <p className="font-bold mt-2">{money(320000)}</p>
            <span className="text-xs text-green-700 bg-green-50 rounded-full px-2 py-1 inline-block mt-3">↑ 18%</span>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-[11px] uppercase text-gray-500 font-semibold">Profit</p>
            <p className="font-bold mt-2">{money(85000)}</p>
            <span className="text-xs text-green-700 bg-green-50 rounded-full px-2 py-1 inline-block mt-3">↑ 24%</span>
          </div>
        </section>

        <div className="flex justify-between items-center mt-6 mb-3">
          <h3 className="font-bold text-sm">Customers who owe you</h3>
          <Link to="/customers" className="text-xs font-semibold text-green-700">View all</Link>
        </div>

        <section className="rounded-xl border border-gray-100 overflow-hidden">
          {customers.map((customer) => (
            <Link
              key={customer.id}
              to={`/customers/${customer.id}`}
              className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 grid place-items-center text-sm font-bold">
                  {customer.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.deals} deals</p>
                </div>
              </div>

              <p className="text-sm font-bold text-red-500">{money(customer.totalOwed)}</p>
            </Link>
          ))}
        </section>

        <Link
          to="/add-deal"
          className="mt-4 h-12 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center"
        >
          + Add Deal
        </Link>
      </div>

      <BottomNav />
    </AppShell>
  )
}