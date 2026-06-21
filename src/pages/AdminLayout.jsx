import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const sidebarLinks = [
  { to: '/admin', label: '控制台', icon: 'D', end: true },
  { to: '/admin/stores', label: '店铺管理', icon: 'S' },
  { to: '/admin/orders', label: '订单管理', icon: 'O' },
  { to: '/admin/users', label: '用户管理', icon: 'U' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  if (!user) { nav('/login'); return null }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-56 bg-gray-900 text-white shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-sm">SC</span></div>
            <span className="font-bold text-lg">管理后台</span>
          </div>
          <p className="text-gray-400 text-xs">欢迎，{user.name}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map(link => {
            const active = link.end ? loc.pathname==='/admin' : loc.pathname.startsWith(link.to)
            return (
              <Link key={link.to} to={link.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <span className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-bold">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-gray-800 space-y-1">
          <Link to="/" className="block text-gray-400 text-sm px-3 py-2 hover:text-white rounded-lg">返回网站</Link>
          <button onClick={() => { logout(); nav('/login') }} className="block w-full text-left text-gray-400 text-sm px-3 py-2 hover:text-white rounded-lg">退出登录</button>
        </div>
      </aside>
      <div className="flex-1 overflow-auto p-4 md:p-6 pb-16 md:pb-6"><Outlet /></div>

      {/* Mobile bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white flex">
        {sidebarLinks.map(link => {
          const active = link.end ? loc.pathname==='/admin' : loc.pathname.startsWith(link.to)
          return (
            <Link key={link.to} to={link.to} className={`flex-1 flex flex-col items-center py-2 text-xs ${active ? 'text-red-400' : 'text-gray-500'}`}>
              <span className="text-lg font-bold">{link.icon}</span>{link.label}
            </Link>
          )
        })}
        <button onClick={() => { logout(); nav('/login') }} className="flex-1 flex flex-col items-center py-2 text-xs text-gray-500">退出</button>
      </div>
    </div>
  )
}
