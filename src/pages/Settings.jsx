import { ArrowLeft, Settings as SettingsIcon } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function Settings() {
  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/menu" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-xs text-gray-500">Workspace preferences.</p>
          </div>
        </header>

        <section className="rounded-2xl border border-gray-100 p-5">
          <SettingsIcon className="text-green-700" size={22} />
          <h2 className="font-bold mt-4">More settings coming with invoices</h2>
          <p className="text-sm text-gray-500 mt-2">
            Currency, VAT defaults, invoice notes and templates will live here after invoice generation.
          </p>
        </section>
      </div>
      <BottomNav />
    </AppShell>
  )
}