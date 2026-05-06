import { ArrowLeft, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function HelpSupport() {
  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link
            to="/menu"
            className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <HelpCircle size={21} className="text-green-700" />
              Help & Support
            </h1>
            <p className="text-xs text-gray-500">
              Quick guidance for using LipaTrack.
            </p>
          </div>
        </header>

        <section className="space-y-3">
          {[
            ["Add Customer", "Save the business or person you sell to."],
            ["Add Invoice", "Enter selling amount, cost amount and invoice number."],
            ["Record Payment", "Update what has been paid so balances stay accurate."],
            ["Profit", "Profit is calculated as selling amount minus cost amount."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-gray-100 p-4">
              <p className="font-bold">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}