import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: '首页', path: '/' },
  { label: '淘宝店铺', path: '/list/淘宝' },
  { label: '天猫店铺', path: '/list/天猫' },
  { label: '京东店铺', path: '/list/京东' },
  { label: '抖音小店', path: '/list/抖音' },
  { label: '价格板块', path: '/pricing' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="bg-red-600 text-white text-xs text-center py-2 px-4">
        微信客服 scmsj601 &nbsp;|&nbsp; 12年行业深耕 &nbsp;|&nbsp; 免费店铺估价
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <span className="text-white font-bold text-sm tracking-tight">SC</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900 leading-tight">网店转让</div>
              <div className="text-xs text-gray-400 leading-tight">店铺交易服务平台</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((i) => (
              <Link key={i.path} to={i.path} className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                loc.pathname === i.path ? 'text-red-600 font-semibold bg-red-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}>{i.label}</Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/recharge" className="text-sm text-gray-500 hover:text-red-600 transition-colors">充值中心</Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-600">登录</Link>
            <Link to="/list" className="bg-red-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">我要买店</Link>
            <Link to="/sell" className="border border-gray-200 text-gray-700 text-sm px-5 py-2 rounded-lg font-medium hover:border-red-300 hover:text-red-600 transition-colors">我要卖店</Link>
          </div>

          <button className="lg:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white px-6 pb-6 pt-4 space-y-1">
          {navItems.map((i) => (
            <Link key={i.path} to={i.path} onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">{i.label}</Link>
          ))}
          <hr className="my-2" />
          <Link to="/recharge" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-gray-500">充值中心</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-gray-500">管理后台登录</Link>
          <div className="flex gap-3 pt-2">
            <Link to="/list" onClick={() => setOpen(false)} className="flex-1 bg-red-600 text-white text-center py-2.5 rounded-lg font-medium">我要买店</Link>
            <Link to="/sell" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 text-gray-700 text-center py-2.5 rounded-lg font-medium">我要卖店</Link>
          </div>
        </div>
      )}
    </header>
  )
}
