import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'
import AuthLayout from '@layouts/AuthLayout'
import Dashboard from '@pages/dashboard/Dashboard'
import POS from '@pages/pos/POS'
import Orders from '@pages/orders/Orders'
import Kitchen from '@pages/kitchen/Kitchen'
import Tables from '@pages/tables/Tables'
import Reservations from '@pages/reservations/Reservations'
import Inventory from '@pages/inventory/Inventory'
import Analytics from '@pages/analytics/Analytics'
import Settings from '@pages/settings/Settings'

// Placeholder page components
const Login = () => <div>Login Page</div>
const Register = () => <div>Register Page</div>

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Main Application Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pos" element={<POS />} />
        <Route path="orders" element={<Orders />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="tables" element={<Tables />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
