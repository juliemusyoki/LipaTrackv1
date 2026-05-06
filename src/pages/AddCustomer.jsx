import { ArrowLeft, UserPlus } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"

export default function AddCustomer() {
  const navigate = useNavigate()
  const { addCustomer } = useApp()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [business, setBusiness] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    if (!name.trim()) return alert("Customer name is required")

    setIsSaving(true)

    try {
      const customer = await addCustomer({
        name,
        phone,
        business,
      })

      navigate(`/customers/${customer.id}`)
    } catch {
      alert("Failed to save customer. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="flex items-center gap-3 mb-6">
          <Link to="/actions" className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center">
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Add Customer</h1>
            <p className="text-xs text-gray-500">Save a customer before tracking deals.</p>
          </div>
        </header>

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <div className="w-11 h-11 rounded-full bg-white/15 grid place-items-center mb-5">
            <UserPlus size={22} />
          </div>
          <h2 className="text-xl font-bold">Customer record</h2>
          <p className="text-sm text-green-100 mt-2">
            Keep their details in one place so balances are easy to track.
          </p>
        </section>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Customer name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. FW Services"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0712 000 000"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Business type</label>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="e.g. Clinic, salon, shop"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
          >
            {isSaving ? "Saving..." : "Save Customer"}
          </button>
        </form>
      </div>

      <BottomNav />
    </AppShell>
  )
}