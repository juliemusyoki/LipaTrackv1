import { Home, Users, Plus, FileText, Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function BottomNav() {
  const location = useLocation()

  const itemClass = (path) =>
    `flex flex-col items-center gap-1 text-[11px] ${
      location.pathname === path ? "text-green-700 font-semibold" : "text-gray-500"
    }`

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-8 py-3 flex justify-between items-center">
      <Link to="/" className={itemClass("/")}>
        <Home size={20} />
        Home
      </Link>

      <Link to="/customers" className={itemClass("/customers")}>
        <Users size={20} />
        Customers
      </Link>

      <Link to="/actions" className="w-12 h-12 -mt-7 rounded-full bg-green-700 text-white flex items-center justify-center shadow-lg">
       <Plus size={26} />
          </Link>

      <Link to="/deals" className={itemClass("/deals")}>
        <FileText size={20} />
        Deals
      </Link>

      <Link to="/menu" className={itemClass("/menu")}>
        <Menu size={20} />
        Menu
      </Link>
    </nav>
  )
}