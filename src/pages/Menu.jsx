import AppShell from "../components/AppShell"
import BottomNav from "../components/BottomNav"

export default function Menu() {
  return (
    <AppShell>
      <div className="px-5 pt-12 pb-28">
        <h1 className="text-2xl font-bold text-green-700">Menu</h1>
        <p className="text-sm text-gray-500 mt-2">Settings and options coming next.</p>
      </div>
      <BottomNav />
    </AppShell>
  )
}