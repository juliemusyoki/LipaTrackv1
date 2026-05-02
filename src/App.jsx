import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Customers from "./pages/Customers"
import CustomerDetail from "./pages/CustomerDetail"
import AddDeal from "./pages/AddDeal"
import RecordPayment from "./pages/RecordPayment"
import Menu from "./pages/Menu"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/add-deal" element={<AddDeal />} />
        <Route path="/record-payment" element={<RecordPayment />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}