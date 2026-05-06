import { useState } from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
  })

  const passwordsMatch =
    confirmPassword.length === 0 || formData.password === confirmPassword

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSignup(event) {
    event.preventDefault()

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setError("")
    setSuccessMessage("")
    setIsSubmitting(true)

try {
  console.log("Starting signup...")

  // ✅ STEP 1: Create auth user ONLY
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  console.log("Signup response:", data, error)

  if (error) {
    setError(error.message)
    return
  }

  // ⚠️ Email confirmation case
  if (!data.session) {
    setSuccessMessage("Check your email to confirm your account.")
    return
  }

  // ✅ STEP 2: Insert profile separately
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        auth_user_id: data.user.id,
        email: formData.email,
        full_name: formData.fullName,
        business_name: formData.businessName,
        phone_number: formData.phoneNumber,
        city: formData.city,
      })

    if (profileError) {
      console.error("Profile error:", profileError.message)
    }
  }

  navigate("/home")
} catch (err) {
  console.error(err)
  setError(err.message || "Something went wrong")
}
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f6faf7]">
      <section className="hidden lg:flex lg:w-1/2 bg-green-100 p-12 xl:p-20 flex-col justify-between">
        <Link to="/" className="text-2xl font-bold italic text-green-900">
          LipaTrack.
        </Link>

        <div className="max-w-xl">
          <h2 className="text-5xl xl:text-6xl font-bold leading-tight text-green-900 mt-10">
            Join the <span className="italic">movement</span>.
          </h2>
          <p className="text-lg xl:text-xl text-green-700 mt-6 max-w-lg">
            Create an account to track customers, monitor payments, and grow
            your business with clarity.
          </p>
        </div>

        <p className="text-sm font-medium text-green-700">
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
              Create Account
            </h1>
            <p className="text-green-700">
              Start using LipaTrack in minutes.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6 sm:space-y-7">
            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg placeholder:text-green-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    className="w-full pb-3 pr-10 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                    required
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

              <div className="space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                  Confirm
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className={`w-full pb-3 pr-10 border-b-2 bg-transparent outline-none transition-colors text-base sm:text-lg ${
                      passwordsMatch
                        ? "border-green-200 focus:border-green-700"
                        : "border-red-500"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700 mb-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {!passwordsMatch ? (
              <p className="text-sm font-medium text-red-600 -mt-1">
                Passwords do not match
              </p>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] sm:text-xs font-bold text-green-900 uppercase tracking-widest">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full pb-3 border-b-2 border-green-200 bg-transparent focus:border-green-700 outline-none transition-colors text-base sm:text-lg"
                />
              </div>
            </div>

            {error ? (
              <div className="p-3.5 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100">
                {error}
              </div>
            ) : null}

            {successMessage ? (
              <div className="p-3.5 bg-green-50 text-green-700 text-sm font-medium rounded-xl border border-green-100">
                {successMessage}
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
                    <span className="text-base sm:text-lg">Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-green-700 mt-6 sm:mt-8 font-medium text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-950 font-bold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}