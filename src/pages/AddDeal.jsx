import {
  ArrowLeft,
  Calculator,
  FileText,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function AddDeal() {
  const navigate = useNavigate()

  const {
    customers,
    addDeal,
    businessProfile,
    deals,
  } = useApp()

  const generatedInvoiceNumber = `${businessProfile.invoicePrefix || "INV"}-${String(
    deals.length + 1
  ).padStart(4, "0")}`

  const [customerId, setCustomerId] = useState(customers[0]?.id || "")
  const [note, setNote] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState(generatedInvoiceNumber)
  const [sellingAmount, setSellingAmount] = useState("")
  const [costAmount, setCostAmount] = useState("")
  const [includeTax, setIncludeTax] = useState(true)

  const selling = Number(sellingAmount) || 0
  const cost = Number(costAmount) || 0

  const taxAmount = useMemo(() => {
    if (!includeTax) return 0
    return (selling * businessProfile.taxRate) / 100
  }, [selling, includeTax, businessProfile.taxRate])

  const totalInvoice = selling + taxAmount
  const profit = selling - cost

  function handleSave() {
    if (!customerId) return alert("Please select a customer")
    if (!sellingAmount) return alert("Selling amount is required")
    if (!costAmount) return alert("Cost amount is required")

    const deal = addDeal({
      customerId,
      note: note || "Untitled invoice",
      sellingAmount: totalInvoice,
      baseAmount: selling,
      costAmount,
      invoiceNumber,
      taxAmount,
      includeTax,
    })

    navigate(`/customers/${deal.customerId}`)
  }

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">

        {/* HEADER */}
        <header className="flex items-center gap-3 mb-6">
          <Link
            to="/actions"
            className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">Create Invoice</h1>
            <p className="text-xs text-gray-500">
              Track payments, tax and profit clearly.
            </p>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5 shadow-md">
          <div className="flex items-center gap-2">
            <Calculator size={18} />
            <p className="text-xs uppercase font-semibold text-green-100">
              Estimated profit
            </p>
          </div>

          <h2 className="text-4xl font-bold mt-4">
            {money(profit)}
          </h2>

          <div className="mt-4 space-y-1 text-sm text-green-100">
            <p>Subtotal: {money(selling)}</p>
            <p>
              {businessProfile.taxLabel}: {money(taxAmount)}
            </p>
            <p className="font-semibold text-white">
              Invoice Total: {money(totalInvoice)}
            </p>
          </div>
        </section>

        {customers.length === 0 ? (
          <Link
            to="/add-customer"
            className="block rounded-2xl border border-gray-100 p-5 text-center font-semibold text-green-700"
          >
            Add a customer first
          </Link>
        ) : (
          <form className="space-y-4">

            {/* CUSTOMER */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Customer
              </label>

              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none bg-white"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* INVOICE NUMBER */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Invoice Number
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 pl-11 pr-4 outline-none"
                />
              </div>
            </div>

            {/* NOTE */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Invoice Note
              </label>

              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Medical supplies batch"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            {/* SELLING */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Selling Amount
              </label>

              <input
                type="number"
                value={sellingAmount}
                onChange={(e) => setSellingAmount(e.target.value)}
                placeholder="150000"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            {/* COST */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Cost Amount
              </label>

              <input
                type="number"
                value={costAmount}
                onChange={(e) => setCostAmount(e.target.value)}
                placeholder="100000"
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 outline-none"
              />
            </div>

            {/* TAX */}
            <div className="rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">
                    Include {businessProfile.taxLabel}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {businessProfile.taxRate}% tax rate
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIncludeTax(!includeTax)}
                  className={`w-14 h-8 rounded-full transition ${
                    includeTax ? "bg-green-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white transition mt-1 ${
                      includeTax ? "ml-7" : "ml-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* SAVE */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-13 rounded-xl bg-green-700 text-white font-semibold mt-4"
            >
              Save Invoice
            </button>
          </form>
        )}
      </div>

      <BottomNav />
    </AppShell>
  )
}