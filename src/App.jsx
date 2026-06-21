import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-bg">
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
    </BrowserRouter>
  )
}
