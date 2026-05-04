import { Apple, ArrowRight, Mail, ShieldCheck, TrendingUp, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"

export default function Signup() {
  return (
    <AppShell wide>
      <div className="min-h-screen grid lg:grid-cols-2 bg-white">
        <section className="px-6 sm:px-10 lg:px-16 pt-10 pb-8 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-700 text-white grid place-items-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">LipaTrack</p>
              <p className="text-xs text-gray-500">Facts live here.</p>
            </div>
          </div>

          <div className="mt-12 max-w-md">
            <p className="text-xs font-bold uppercase tracking-wide text-green-700">
              Create account
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
              Start tracking money clearly.
            </h1>
            <p className="text-sm text-gray-500 mt-4 leading-6">
              Create your workspace to manage customers, invoices, payments and deal profit.
            </p>
          </div>

          <form className="mt-8 max-w-md space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Business name</label>
              <input
                placeholder="e.g. ABC Supplies"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
              />
            </div>

            <Link
              to="/"
              className="h-13 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              Create account
              <ArrowRight size={18} />
            </Link>
          </form>

          <div className="max-w-md flex items-center gap-3 my-6">
            <div className="h-px bg-gray-100 flex-1" />
            <p className="text-xs text-gray-400">or sign up with</p>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <div className="max-w-md space-y-3">
            <button className="h-12 rounded-xl border border-gray-200 font-semibold w-full flex items-center justify-center gap-2 hover:bg-gray-50">
              <Mail size={18} />
              Sign up with Google
            </button>

            <button className="h-12 rounded-xl bg-black text-white font-semibold w-full flex items-center justify-center gap-2">
              <Apple size={18} />
              Sign up with Apple
            </button>
          </div>

          <p className="max-w-md text-sm text-center text-gray-500 mt-auto pt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Sign in
            </Link>
          </p>
        </section>

        <section className="hidden lg:flex bg-gradient-to-br from-green-50 via-white to-green-100 p-12 items-center justify-center">
          <div className="max-w-md">
            <div className="w-24 h-24 rounded-3xl bg-green-700 text-white grid place-items-center shadow-xl">
              <TrendingUp size={52} />
            </div>

            <h2 className="text-5xl font-bold mt-8 text-green-800">LipaTrack</h2>
            <p className="text-lg text-gray-600 mt-3">
              Simple records for serious business decisions.
            </p>

            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-green-700 grid place-items-center">
                  <Wallet size={18} />
                </div>
                <p className="text-sm font-medium">Track who owes what</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-green-700 grid place-items-center">
                  <TrendingUp size={18} />
                </div>
                <p className="text-sm font-medium">Know profit per invoice</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-green-700 grid place-items-center">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm font-medium">Built for mobile and desktop</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}