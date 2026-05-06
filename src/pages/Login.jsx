import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsSubmitting(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f6faf7]">
      <section className="hidden lg:flex lg:w-1/2 bg-green-950 p-12 xl:p-20 flex-col justify-between text-white">
        <Link to="/" className="text-2xl font-bold italic text-green-50">
          LipaTrack.
        </Link>

        <div className="max-w-xl">
          <h2 className="text-5xl xl:text-6xl font-bold leading-tight mt-10">
            Welcome back to your <span className="italic">impact</span>.
          </h2>
          <p className="text-lg xl:text-xl text-green-100/85 mt-6 max-w-lg">
            Pick up where you left off and continue tracking your business with
            confidence.
          </p>
        </div>

        <p className="text-sm font-medium text-green-200/70">
          © {new Date().getFullYear()} LipaTrack
        </p>
      </section>

      <section className="relative flex flex-col justify-center w-full lg:w-1/2 px-5 py-8 sm:px-8 lg:px-14 xl:px-24">
        <Link
          to="/"
          className="absolute top-6 left-5 sm:left-8 lg:hidden text-2xl font-bold italic text-green-900"
        >
          LipaTrack.
        </Link>

        <div className="w-full max-w-md mx-auto pt-14 lg:pt-0">
          <div className="mb-9 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-950 mb-2">
              Log in
            </h1>
            <p className="text-green-700">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7 sm:space-y-8">
            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] sm:text-xs font-bold text-green-700 hover:text-green-950 transition-colors uppercase tracking-widest"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full pb-3 pr-10 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700 mb-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <div className="p-3.5 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100">
                {error}
              </div>
            ) : null}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-900 text-white px-8 py-4 sm:py-5 rounded-xl font-bold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-base sm:text-lg">Access Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-green-700 mt-6 sm:mt-8 font-medium text-sm sm:text-base">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-green-950 font-bold hover:underline transition-colors"
              >
                Join now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}