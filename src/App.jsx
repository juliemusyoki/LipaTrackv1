import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Customers from "./pages/Customers"
import CustomerDetail from "./pages/CustomerDetail"
import AddDeal from "./pages/AddDeal"
import AddCustomer from "./pages/AddCustomer"
import RecordPayment from "./pages/RecordPayment"
import Deals from "./pages/Deals"
import Menu from "./pages/Menu"
import ActionCenter from "./pages/ActionCenter"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import Signup from "./pages/Signup"
import EditBusinessProfile from "./pages/EditBusinessProfile"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/add-deal" element={<AddDeal />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/record-payment" element={<RecordPayment />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/actions" element={<ActionCenter />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/edit-business-profile" element={<EditBusinessProfile />} />
      </Routes>
    </BrowserRouter>
  )
}