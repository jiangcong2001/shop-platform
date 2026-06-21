import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: '首页', path: '/' },
  { label: '店铺列表', path: '/list' },
  { label: '价格板块', path: '/pricing' },
  { label: '充值中心', path: '/recharge' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-white text-xs text-center py-1.5">
        微信客服：scmsj601 | 添加好友免费估价
      </div>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SC</span>
            </div>
            <span className="font-bold text-lg text-primary">网店转让</span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((i) => (
              <Link key={i.path} to={i.path} className={`px-3 py-1.5 rounded text-sm transition-colors ${
                loc.pathname === i.path ? 'text-primary font-semibold bg-primary-light' : 'text-gray-600 hover:text-primary'
              }`}>{i.label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/list" className="bg-primary text-white text-sm px-4 py-1.5 rounded-full hover:bg-primary-dark">购买店铺</Link>
            <Link to="/sell" className="border border-primary text-primary text-sm px-4 py-1.5 rounded-full hover:bg-primary-light">出售店铺</Link>
          </div>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2}/>}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t bg-white px-4 pb-4 pt-2 flex flex-col gap-2">
            {navItems.map((i) => (
              <Link key={i.path} to={i.path} onClick={() => setOpen(false)} className="px-3 py-2 rounded text-sm text-gray-600">{i.label}</Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Link to="/list" onClick={() => setOpen(false)} className="flex-1 bg-primary text-white text-center text-sm py-2 rounded-full">购买店铺</Link>
              <Link to="/sell" onClick={() => setOpen(false)} className="flex-1 border border-primary text-primary text-center text-sm py-2 rounded-full">出售店铺</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
