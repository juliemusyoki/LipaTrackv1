import {
  BarChart3,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"
import { useApp } from "../context/useApp"

export default function Menu() {
  const { businessProfile } = useApp()

  const initials = (businessProfile.businessName || "LT")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const menuItems = [
    {
      icon: User,
      label: "Business profile",
      value: businessProfile.businessName || "Add details",
      to: "/business-profile",
    },
    {
      icon: BarChart3,
      label: "Profit summary",
      value: "View totals",
      to: "/profit-summary",
    },
    {
      icon: ShieldCheck,
      label: "Data safety",
      value: "Local MVP",
      to: "/data-safety",
    },
    {
      icon: Settings,
      label: "Settings",
      value: "Preferences",
      to: "/settings",
    },
    {
      icon: HelpCircle,
      label: "Help & support",
      value: "How it works",
      to: "/help",
    },
  ]

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            LipaTrack
          </p>
          <h1 className="text-2xl font-bold mt-1">Menu</h1>
        </header>

        <Link to="/business-profile" className="block rounded-2xl bg-green-700 text-white p-5 mb-5">
          <div className="w-14 h-14 rounded-full bg-white/15 grid place-items-center font-bold text-xl">
            {initials}
          </div>
          <h2 className="font-bold text-xl mt-4">
            {businessProfile.businessName || "Your Business"}
          </h2>
          <p className="text-xs text-green-100 mt-1">
            Tap to edit your business details.
          </p>
        </Link>

        <section className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.value}</p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            )
          })}
        </section>

        <Link
          to="/login"
          className="mt-5 w-full h-12 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Log out
        </Link>
      </div>

      <BottomNav />
    </AppShell>
  )
}