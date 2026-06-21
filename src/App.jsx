import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import StoreList from './pages/StoreList'
import StoreDetail from './pages/StoreDetail'
import Pricing from './pages/Pricing'
import Recharge from './pages/Recharge'
import About from './pages/About'
import News from './pages/News'
import Service from './pages/Service'
import Sell from './pages/Sell'
import Login from './pages/Login'
import AdminLayout from './pages/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminStores from './pages/AdminStores'
import AdminOrders from './pages/AdminOrders'
import AdminUsers from './pages/AdminUsers'

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Admin routes - no public header/footer */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="stores" element={<AdminStores />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          {/* Login - no header/footer */}
          <Route path="/login" element={<Login />} />

          {/* Public routes - with header/footer */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col bg-[#f8fafc]">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/list" element={<StoreList />} />
                  <Route path="/list/:platform" element={<StoreList />} />
                  <Route path="/store/:id" element={<StoreDetail />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/recharge" element={<Recharge />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/sell" element={<Sell />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
