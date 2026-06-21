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
import Dashboard from './pages/Dashboard'
import AdminLayout from './pages/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import AdminUsers from './pages/AdminUsers'

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="*" element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1 w-full">
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
                  <Route path="/dashboard" element={<Dashboard />} />
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
