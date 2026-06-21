import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const { login, register, user } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const isRegister = new URLSearchParams(loc.search).get('register') === '1'
  const [mode, setMode] = useState(isRegister ? 'register' : 'login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) nav('/dashboard')
  }, [user, nav])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!username || !password) { setError('请填写完整'); return }
    const r = mode === 'login' ? login(username, password) : register(username, password)
    if (!r.ok) setError(r.error)
    else nav('/dashboard')
  }

  return (
    <div className="w-full px-4 py-16 mx-auto" style={{ maxWidth: '440px' }}>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">SC</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900">{mode === 'login' ? '用户登录' : '用户注册'}</h1>
        <p className="text-gray-500 text-sm mt-2">网店转让交易平台</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">用户名</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="请输入用户名" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20" autoFocus />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">密码</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="请输入密码" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
          {mode === 'login' ? '登录' : '注册'}
        </button>
      </form>

      <div className="text-center mt-4">
        {mode === 'login' ? (
          <button onClick={() => setMode('register')} className="text-sm text-gray-500 hover:text-red-600">还没有账号？立即注册</button>
        ) : (
          <button onClick={() => setMode('login')} className="text-sm text-gray-500 hover:text-red-600">已有账号？立即登录</button>
        )}
      </div>
      <div className="text-center mt-2">
        <Link to="/" className="text-sm text-gray-400 hover:text-red-600">返回首页</Link>
      </div>
    </div>
  )
}
