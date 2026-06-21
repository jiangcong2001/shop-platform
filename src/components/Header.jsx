import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="bg-red-600 text-white text-xs text-center py-2">
        微信客服 scmsj601 | 12年行业深耕 | 免费店铺估价
      </div>
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">网店转让</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={`px-3 py-1.5 rounded text-sm ${loc.pathname==='/'?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>首页</Link>
            <Link to="/list/淘宝" className={`px-3 py-1.5 rounded text-sm ${loc.pathname.includes('/list/淘宝')?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>淘宝</Link>
            <Link to="/list/天猫" className={`px-3 py-1.5 rounded text-sm ${loc.pathname.includes('/list/天猫')?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>天猫</Link>
            <Link to="/list/京东" className={`px-3 py-1.5 rounded text-sm ${loc.pathname.includes('/list/京东')?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>京东</Link>
            <Link to="/list/抖音" className={`px-3 py-1.5 rounded text-sm ${loc.pathname.includes('/list/抖音')?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>抖音</Link>
            <Link to="/pricing" className={`px-3 py-1.5 rounded text-sm ${loc.pathname==='/pricing'?'text-red-600 bg-red-50 font-semibold':'text-gray-600 hover:text-gray-900'}`}>价格</Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-red-600">我的账户</Link>
                <span className="text-sm text-gray-400">余额: <span className="text-red-600 font-semibold">{user.balance || 0}</span>元</span>
                <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">退出</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-500 hover:text-red-600">登录</Link>
                <Link to="/login?register=1" className="text-sm text-gray-500 hover:text-red-600">注册</Link>
              </>
            )}
            <Link to="/list" className="bg-red-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-red-700 ml-2">我要买店</Link>
            <Link to="/sell" className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded-lg font-medium hover:border-red-300 hover:text-red-600">我要卖店</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-6 pt-3">
          <nav className="space-y-1">
            <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">首页</Link>
            <Link to="/list/淘宝" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">淘宝店铺</Link>
            <Link to="/list/天猫" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">天猫店铺</Link>
            <Link to="/list/京东" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">京东店铺</Link>
            <Link to="/list/抖音" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">抖音小店</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">价格板块</Link>
          </nav>
          <hr className="my-3" />
          {user ? (
            <div className="space-y-1">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">我的账户 (余额: {user.balance}元)</Link>
              <button onClick={() => { logout(); setOpen(false) }} className="block w-full text-left px-3 py-2.5 rounded text-sm text-gray-400">退出登录</button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">登录</Link>
              <Link to="/login?register=1" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-sm text-gray-600">注册</Link>
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <Link to="/list" onClick={() => setOpen(false)} className="flex-1 bg-red-600 text-white text-center py-2.5 rounded-lg font-medium">我要买店</Link>
            <Link to="/sell" onClick={() => setOpen(false)} className="flex-1 border border-gray-300 text-gray-700 text-center py-2.5 rounded-lg font-medium">我要卖店</Link>
          </div>
        </div>
      )}
    </header>
  )
}
