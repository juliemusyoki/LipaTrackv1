import { ArrowLeft, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function Notifications() {
  const { getAppTotals } = useApp()
  const totals = getAppTotals()

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-xs text-gray-500">Important money updates.</p>
          </div>
        </header>

        <section className="rounded-2xl border border-gray-100 p-5">
          <div className="w-11 h-11 rounded-full bg-green-50 text-green-700 grid place-items-center mb-4">
            <Bell size={20} />
          </div>
          <h2 className="font-bold">Outstanding balance</h2>
          <p className="text-sm text-gray-500 mt-2">
            You currently have {money(totals.totalOutstanding)} unpaid across your invoices.
          </p>
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}