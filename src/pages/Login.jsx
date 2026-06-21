import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const r = login(username, password)
    if (r.ok) nav('/admin')
    else setError(r.error)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">管理后台登录</h1>
          <p className="text-sm text-gray-400 mt-1">网店转让管理平台</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              placeholder="请输入用户名"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark">登录</button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-primary">返回首页</Link>
        </div>
      </div>
    </div>
  )
}
