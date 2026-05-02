import { BarChart3, HelpCircle, LogOut, Settings, ShieldCheck, User } from "lucide-react"
import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function Menu() {
  const menuItems = [
    { icon: User, label: "Business profile", value: "RightSign Suppliers" },
    { icon: BarChart3, label: "Profit summary", value: "Coming soon" },
    { icon: ShieldCheck, label: "Data safety", value: "Protected" },
    { icon: Settings, label: "Settings", value: "" },
    { icon: HelpCircle, label: "Help & support", value: "" },
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

        <section className="rounded-2xl bg-green-700 text-white p-5 mb-5">
          <div className="w-14 h-14 rounded-full bg-white/15 grid place-items-center font-bold text-xl">
            RS
          </div>
          <h2 className="font-bold text-xl mt-4">RightSign Suppliers</h2>
          <p className="text-xs text-green-100 mt-1">Business clarity, without accounting chaos.</p>
        </section>

        <section className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>

                {item.value && <p className="text-xs text-gray-500">{item.value}</p>}
              </div>
            )
          })}
        </section>

        <button className="mt-5 w-full h-12 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2">
          <LogOut size={18} />
          Log out
        </button>
      </div>

      <BottomNav />
    </AppShell>
  )
}