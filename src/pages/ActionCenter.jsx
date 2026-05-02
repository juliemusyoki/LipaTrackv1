import { ArrowLeft, FileText, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function ActionCenter() {
  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-8">
          <Link to="/" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">What do you want to add?</h1>
            <p className="text-xs text-gray-500">Choose the action that matches the business moment.</p>
          </div>
        </header>

        <section className="space-y-4">
          <Link to="/add-deal" className="block rounded-2xl bg-green-700 text-white p-5 shadow-md">
            <div className="w-11 h-11 rounded-full bg-white/15 grid place-items-center mb-5">
              <FileText size={22} />
            </div>
            <h2 className="text-xl font-bold">Add Invoice / Deal</h2>
            <p className="text-sm text-green-100 mt-2">
              Track what a customer owes, your cost, and your expected profit.
            </p>
          </Link>

          <Link to="/add-customer" className="block rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-green-50 text-green-700 grid place-items-center mb-5">
              <UserPlus size={22} />
            </div>
            <h2 className="text-xl font-bold">Add Customer</h2>
            <p className="text-sm text-gray-500 mt-2">
              Save a customer before adding invoices or payments.
            </p>
          </Link>
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}