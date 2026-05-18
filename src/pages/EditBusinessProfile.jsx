import { ArrowLeft, Building2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"

export default function EditBusinessProfile() {
  const navigate = useNavigate()

  const {
    businessProfile,
    updateBusinessProfile,
  } = useApp()

  const [businessName, setBusinessName] = useState(
    businessProfile.businessName || ""
  )

  const [ownerName, setOwnerName] = useState(
    businessProfile.ownerName || ""
  )

  const [email, setEmail] = useState(
    businessProfile.email || ""
  )

  const [phone, setPhone] = useState(
    businessProfile.phone || ""
  )

  const [address, setAddress] = useState(
    businessProfile.address || ""
  )

  const [taxRate, setTaxRate] = useState(
    businessProfile.taxRate || 16
  )

  const [invoicePrefix, setInvoicePrefix] = useState(
    businessProfile.invoicePrefix || "INV"
  )

  const [logo, setLogo] = useState(
    businessProfile.logo || ""
  )

  function handleLogoUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setLogo(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function handleSave() {
    updateBusinessProfile({
      businessName,
      ownerName,
      email,
      phone,
      address,
      taxRate,
      invoicePrefix,
      logo,
    })

    navigate("/menu")
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28 max-w-[700px] mx-auto">

        <header className="flex items-center gap-3 mb-6">
          <Link
            to="/menu"
            className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              Business Profile
            </h1>

            <p className="text-xs text-gray-500">
              This information appears on invoices and documents.
            </p>
          </div>
        </header>

        {/* PREVIEW */}
        <section className="rounded-3xl bg-green-700 text-white p-6 mb-6 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 border border-white/10">

              {logo ? (
                <img
                  src={logo}
                  alt="Business Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center">
                  <Building2 size={28} />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {businessName || "Your Business"}
              </h2>

              <p className="text-sm text-green-100 mt-1">
                {ownerName || "Owner Name"}
              </p>

              <div className="text-xs text-green-100 mt-3 space-y-1">
                <p>{email}</p>
                <p>{phone}</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <form className="space-y-5">

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Business Logo
            </label>

            <div className="mt-3 flex items-center gap-4">

              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-gray-400">
                    No Logo
                  </div>
                )}
              </div>

              <label className="h-11 px-4 rounded-xl bg-gray-100 flex items-center cursor-pointer text-sm font-semibold">
                Upload Logo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Business Name
            </label>

            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="ABC Supplies"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Owner Name
            </label>

            <input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="business@email.com"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254..."
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Address
            </label>

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nairobi, Kenya"
              className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-semibold text-gray-600">
                VAT %
              </label>

              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Invoice Prefix
              </label>

              <input
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold"
          >
            Save Profile
          </button>
        </form>
      </div>

      <BottomNav />
    </AppShell>
  )
}