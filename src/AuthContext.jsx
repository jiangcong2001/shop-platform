import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('shop_user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin888') {
      const u = { username: 'admin', role: 'admin', name: '管理员' }
      setUser(u)
      localStorage.setItem('shop_user', JSON.stringify(u))
      return { ok: true }
    }
    return { ok: false, error: '用户名或密码错误' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shop_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
