import {
  ArrowLeft,
  Printer,
} from "lucide-react"

import {
  Link,
  useParams,
} from "react-router-dom"

import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"
import { money } from "../lib/utils"

export default function InvoiceView() {
  const { id } = useParams()

  const {
    deals,
    customers,
    businessProfile,
  } = useApp()

  const invoice = deals.find(
    (deal) => deal.id === id
  )

  if (!invoice) {
    return (
      <AppShell>
        <div className="p-10">
          Invoice not found.
        </div>
      </AppShell>
    )
  }

  const customer = customers.find(
    (customer) => customer.id === invoice.customerId
  )

  function handlePrint() {
    window.print()
  }

  return (
    <AppShell wide>
      <div className="px-5 pt-12 pb-28 max-w-[900px] mx-auto">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-3">

            <Link
              to="/deals"
              className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold">
                Invoice Preview
              </h1>

              <p className="text-xs text-gray-500">
                Ready to print or share
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="h-11 px-4 rounded-xl bg-green-700 text-white flex items-center gap-2"
          >
            <Printer size={18} />
            Print
          </button>
        </header>

        {/* PAPER */}
        <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">

          {/* TOP */}
          <div className="flex flex-col md:flex-row md:justify-between gap-8 border-b border-gray-100 pb-8">

            <div>

              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">

                {businessProfile.logo ? (
                  <img
                    src={businessProfile.logo}
                    alt="Business Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-700 text-white grid place-items-center font-bold text-xl">
                    LT
                  </div>
                )}
              </div>

              <h2 className="text-3xl font-bold mt-5">
                {businessProfile.businessName || "Your Business"}
              </h2>

              <div className="text-sm text-gray-500 mt-3 space-y-1">
                <p>{businessProfile.ownerName}</p>
                <p>{businessProfile.email}</p>
                <p>{businessProfile.phone}</p>
                <p>{businessProfile.address}</p>
              </div>
            </div>

            <div className="md:text-right">

              <p className="text-xs uppercase text-gray-400 font-semibold">
                Invoice Number
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {invoice.invoiceNumber}
              </h3>

              <p className="text-sm text-gray-500 mt-4">
                Created{" "}
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="mt-8">

            <p className="text-xs uppercase text-gray-400 font-semibold">
              Bill To
            </p>

            <h3 className="text-xl font-bold mt-2">
              {customer?.name}
            </h3>

            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>{customer?.business}</p>
              <p>{customer?.phone}</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">

            <div className="grid grid-cols-4 bg-gray-50 px-5 py-4 text-xs font-semibold uppercase text-gray-500">
              <p>Description</p>
              <p className="text-right">Subtotal</p>
              <p className="text-right">VAT</p>
              <p className="text-right">Total</p>
            </div>

            <div className="grid grid-cols-4 px-5 py-5 text-sm border-t border-gray-100">

              <div>
                <p className="font-semibold">
                  {invoice.note}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Invoice Item
                </p>
              </div>

              <p className="text-right">
                {money(invoice.baseAmount || invoice.sellingAmount)}
              </p>

              <p className="text-right">
                {money(invoice.taxAmount || 0)}
              </p>

              <p className="text-right font-bold">
                {money(invoice.sellingAmount)}
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="mt-8 flex justify-end">

            <div className="w-full max-w-[320px] space-y-3">

              <div className="flex justify-between text-sm">
                <p className="text-gray-500">
                  Subtotal
                </p>

                <p>
                  {money(invoice.baseAmount || invoice.sellingAmount)}
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <p className="text-gray-500">
                  VAT
                </p>

                <p>
                  {money(invoice.taxAmount || 0)}
                </p>
              </div>

              <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-3">
                <p>Total</p>

                <p>
                  {money(invoice.sellingAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 pt-6 border-t border-gray-100">

            <p className="text-sm text-gray-500">
              Thank you for doing business with{" "}
              {businessProfile.businessName || "us"}.
            </p>
          </div>
        </section>
      </div>

      <BottomNav />
    </AppShell>
  )
}