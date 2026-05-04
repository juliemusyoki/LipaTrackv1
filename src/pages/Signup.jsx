import { Apple, ArrowRight, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"

export default function Signup() {
  return (
    <AppShell>
      <div className="min-h-screen px-5 pt-12 pb-8 flex flex-col bg-white">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-2xl bg-green-700 text-white grid place-items-center text-xl font-bold">
            L
          </div>
          <div>
            <p className="font-bold text-green-700">LipaTrack</p>
            <p className="text-[11px] text-gray-500">Facts live here.</p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Create account
          </p>
          <h1 className="text-4xl font-bold mt-3 leading-tight">
            Start tracking money clearly.
          </h1>
          <p className="text-sm text-gray-500 mt-4 leading-6">
            Create your workspace to track customers, invoices, payments and profit.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Business name</label>
            <input
              placeholder="e.g. City Clinic Supplies"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <Link
            to="/"
            className="h-13 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            Create account
            <ArrowRight size={18} />
          </Link>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-100 flex-1" />
          <p className="text-xs text-gray-400">or continue with</p>
          <div className="h-px bg-gray-100 flex-1" />
        </div>

        <div className="space-y-3">
          <button className="h-12 rounded-xl border border-gray-200 font-semibold w-full flex items-center justify-center gap-2">
            <Mail size={18} />
            Sign up with Google
          </button>

          <button className="h-12 rounded-xl bg-black text-white font-semibold w-full flex items-center justify-center gap-2">
            <Apple size={18} />
            Sign up with Apple
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-auto pt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </AppShell>
  )
}