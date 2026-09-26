import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/products/ProductList'
import ProductForm from './pages/products/ProductForm'
import OrderList from './pages/orders/OrderList'
import OrderDetail from './pages/orders/OrderDetail'
import EnquiryList from './pages/enquiries/EnquiryList'
import EnquiryDetail from './pages/enquiries/EnquiryDetail'
import AuditLog from './pages/audit-log/AuditLog'

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/enquiries" element={<ProtectedRoute><EnquiryList /></ProtectedRoute>} />
          <Route path="/enquiries/:id" element={<ProtectedRoute><EnquiryDetail /></ProtectedRoute>} />
          <Route path="/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
