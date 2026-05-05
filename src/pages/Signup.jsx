import {
  Apple,
  ArrowRight,
  Mail,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <main className="min-h-screen bg-[#f3f6f4] flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-[1080px] min-h-[620px] max-h-[calc(100vh-32px)] bg-white rounded-3xl shadow-sm overflow-hidden grid lg:grid-cols-[1fr_0.9fr]">
        <section className="px-6 sm:px-10 lg:px-12 py-7 lg:py-8 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-[420px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-700 text-white grid place-items-center">
                <TrendingUp size={22} />
              </div>
              <p className="font-bold text-lg">LipaTrack</p>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Create your account
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Start tracking customers, invoices, payments and profit.
              </p>
            </div>

            <form className="mt-7 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Business name
                </label>
                <input
                  placeholder="e.g. ABC Supplies"
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
                />
              </div>

              <Link
                to="/"
                className="h-12 rounded-xl bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
              >
                Create account
                <ArrowRight size={18} />
              </Link>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-gray-100 flex-1" />
              <p className="text-xs text-gray-400">or sign up with</p>
              <div className="h-px bg-gray-100 flex-1" />
            </div>

            <div className="space-y-3">
              <button className="h-11 rounded-xl border border-gray-200 w-full flex items-center justify-center gap-2 hover:bg-gray-50">
                <Mail size={17} />
                Sign up with Google
              </button>

              <button className="h-11 rounded-xl bg-black text-white w-full flex items-center justify-center gap-2">
                <Apple size={17} />
                Sign up with Apple
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-7">
              Already have an account?{" "}
              <Link to="/login" className="text-green-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden lg:flex bg-gradient-to-br from-green-50 via-white to-green-100 px-10 py-8 items-center justify-center">
          <div className="max-w-[330px]">
            <div className="w-20 h-20 rounded-2xl bg-green-700 text-white grid place-items-center shadow-md">
              <TrendingUp size={40} />
            </div>

            <h2 className="text-4xl font-bold mt-6 text-green-800">
              LipaTrack
            </h2>

            <p className="text-gray-600 mt-2">Track. Collect. Profit.</p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Wallet size={18} className="text-green-700" />
                <p className="text-sm">Track who owes what</p>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp size={18} className="text-green-700" />
                <p className="text-sm">Know profit per invoice</p>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-green-700" />
                <p className="text-sm">Simple, clear and secure</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}