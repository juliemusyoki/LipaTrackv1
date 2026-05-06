import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function DataSafety() {
  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/menu" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Data Safety</h1>
            <p className="text-xs text-gray-500">How your records are handled.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <ShieldCheck size={24} />
          <h2 className="text-xl font-bold mt-4">Local MVP mode</h2>
          <p className="text-sm text-green-100 mt-2">
            Your current data is stored in this browser while we prepare Supabase.
          </p>
        </section>

        <div className="rounded-2xl border border-gray-100 p-4">
          <p className="font-bold">Tomorrow’s backend upgrade</p>
          <p className="text-sm text-gray-500 mt-2">
            Supabase will add real accounts, secure database storage, and data tied to each signed-in business.
          </p>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  )
}