import { ArrowLeft, Building2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"

export default function EditBusinessProfile() {
  const navigate = useNavigate()
  const { businessProfile, updateBusinessProfile } = useApp()

  const [businessName, setBusinessName] = useState(businessProfile.businessName || "")
  const [ownerName, setOwnerName] = useState(businessProfile.ownerName || "")
  const [email, setEmail] = useState(businessProfile.email || "")
  const [phone, setPhone] = useState(businessProfile.phone || "")

  function handleSave() {
    if (!businessName.trim()) return alert("Business name is required")

    updateBusinessProfile({
      businessName,
      ownerName,
      email,
      phone,
    })

    navigate("/menu")
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">

        {/* HEADER */}
        <header className="flex items-center gap-3 mb-6">
          <Link to="/menu" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Business Profile</h1>
            <p className="text-xs text-gray-500">
              This information will appear on invoices and across your workspace.
            </p>
          </div>
        </header>

        {/* PREVIEW CARD (IMPORTANT) */}
        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5 shadow-md">
          <div className="w-12 h-12 rounded-full bg-white/15 grid place-items-center mb-4">
            <Building2 size={22} />
          </div>

          <h2 className="text-xl font-bold">
            {businessName || "Your Business"}
          </h2>

          <p className="text-sm text-green-100 mt-1">
            {ownerName || "Owner name"}
          </p>

          {(email || phone) && (
            <div className="text-xs text-green-100 mt-3 space-y-1">
              {email && <p>{email}</p>}
              {phone && <p>{phone}</p>}
            </div>
          )}
        </section>

        {/* FORM */}
        <form className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">
              Business name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. ABC Supplies"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Owner name
            </label>
            <input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g. Jane"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712 000 000"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-green-700"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
          >
            Save Profile
          </button>
        </form>

      </div>

      <BottomNav />
    </AppShell>
  )
}