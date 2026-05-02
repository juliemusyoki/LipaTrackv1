import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"

export default function Login() {
  return (
    <AppShell>
      <div className="min-h-screen px-5 pt-16 pb-10 flex flex-col">
        <div className="w-14 h-14 rounded-2xl bg-green-700 text-white grid place-items-center text-2xl font-bold">
          L
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            LipaTrack
          </p>
          <h1 className="text-4xl font-bold mt-3 leading-tight">
            Know who owes you. Know if you made profit.
          </h1>
          <p className="text-sm text-gray-500 mt-4 leading-6">
            Track customers, invoices, payments, balances and profit without accounting chaos.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-green-700 text-white p-5">
          <p className="text-xs uppercase font-semibold text-green-100">
            Clarity system
          </p>
          <h2 className="text-3xl font-bold mt-3">Ksh 184,000</h2>
          <p className="text-xs text-green-100 mt-2">
            Total outstanding example
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <Link
            to="/"
            className="h-13 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight size={18} />
          </Link>

          <button className="h-13 rounded-xl border border-gray-200 font-semibold w-full">
            Sign in
          </button>
        </div>
      </div>
    </AppShell>
  )
}