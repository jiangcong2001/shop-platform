import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shop_user')
      if (saved) setUser(JSON.parse(saved))
    } catch (e) {}
    setLoading(false)
  }, [])

  const saveUser = (u) => {
    setUser(u)
    localStorage.setItem('shop_user', JSON.stringify(u))
  }

  const login = (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('shop_users') || '{}')
      if (users[username] && users[username].password === password) {
        saveUser(users[username])
        return { ok: true }
      }
    } catch (e) {}
    return { ok: false, error: '用户名或密码错误' }
  }

  const register = (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('shop_users') || '{}')
      if (users[username]) return { ok: false, error: '用户名已存在' }
      const newUser = {
        username,
        password,
        balance: 0,
        purchasedStores: [],
        rechargeRecords: [],
        createdAt: new Date().toISOString(),
      }
      users[username] = newUser
      localStorage.setItem('shop_users', JSON.stringify(users))
      saveUser(newUser)
      return { ok: true }
    } catch (e) {}
    return { ok: false, error: '注册失败' }
  }

  const recharge = (amount) => {
    const updated = {
      ...user,
      balance: (user.balance || 0) + amount,
      rechargeRecords: [
        ...(user.rechargeRecords || []),
        { amount, date: new Date().toISOString(), status: '待确认', id: Date.now() },
      ],
    }
    saveUser(updated)
    return updated
  }

  const confirmRecharge = (recordId) => {
    const updated = {
      ...user,
      rechargeRecords: (user.rechargeRecords || []).map(r =>
        r.id === recordId ? { ...r, status: '已到账' } : r
      ),
    }
    saveUser(updated)
    return updated
  }

  const buyStore = (store) => {
    if (user.balance < store.price) return { ok: false, error: '余额不足' }
    const updated = {
      ...user,
      balance: user.balance - store.price,
      purchasedStores: [...(user.purchasedStores || []), { ...store, purchasedAt: new Date().toISOString() }],
    }
    saveUser(updated)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shop_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, recharge, confirmRecharge, buyStore }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
