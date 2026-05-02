import { Search, Plus, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { customers, money } from "../data/mockData"

export default function Customers() {
  const totalCustomers = customers.length
  const totalOwed = customers.reduce((sum, customer) => sum + customer.totalOwed, 0)

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              LipaTrack
            </p>
            <h1 className="text-2xl font-bold mt-1">Customers</h1>
          </div>

          <Link
            to="/add-deal"
            className="w-10 h-10 rounded-full bg-green-700 text-white grid place-items-center shadow-md"
          >
            <Plus size={22} />
          </Link>
        </header>

        <section className="rounded-2xl bg-[#f5f7f6] border border-gray-100 p-4 mb-5">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            Total customer balances
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-800">
            {money(totalOwed)}
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            Across {totalCustomers} customers
          </p>
        </section>

        <div className="h-12 rounded-xl bg-gray-50 border border-gray-100 px-4 flex items-center gap-3 mb-5">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search customer"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">Customer list</h3>
          <p className="text-xs text-gray-500">{totalCustomers} total</p>
        </div>

        <section className="space-y-3">
          {customers.map((customer) => (
            <Link
              key={customer.id}
              to={`/customers/${customer.id}`}
              className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 grid place-items-center font-bold">
                    {customer.initials}
                  </div>

                  <div>
                    <p className="font-bold text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {customer.deals} active deals
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-gray-400" />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xs text-gray-500">Outstanding</p>
                <p className="text-sm font-bold text-red-500">
                  {money(customer.totalOwed)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}