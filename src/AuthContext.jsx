import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const ADMIN_ACCOUNT = { username: 'admin', password: 'admin888', role: 'admin' }

function getUsers() {
  try { return JSON.parse(localStorage.getItem('shop_users') || '{}') } catch (e) { return {} }
}
function saveUsers(u) {
  localStorage.setItem('shop_users', JSON.stringify(u))
}
function getRechargeList() {
  try { return JSON.parse(localStorage.getItem('shop_recharges') || '[]') } catch (e) { return [] }
}
function saveRecharges(arr) {
  localStorage.setItem('shop_recharges', JSON.stringify(arr))
}
function getSellList() {
  try { return JSON.parse(localStorage.getItem('shop_sells') || '[]') } catch (e) { return [] }
}
function saveSells(arr) {
  localStorage.setItem('shop_sells', JSON.stringify(arr))
}

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

  const saveCurrent = (u) => {
    setUser(u)
    localStorage.setItem('shop_user', JSON.stringify(u))
  }

  const login = (username, password) => {
    if (username === ADMIN_ACCOUNT.username && password === ADMIN_ACCOUNT.password) {
      saveCurrent({ ...ADMIN_ACCOUNT })
      return { ok: true }
    }
    const users = getUsers()
    if (users[username] && users[username].password === password) {
      saveCurrent(users[username])
      return { ok: true }
    }
    return { ok: false, error: '用户名或密码错误' }
  }

  const register = (username, password) => {
    const users = getUsers()
    if (users[username]) return { ok: false, error: '用户名已存在' }
    const newUser = {
      username, password, role: 'user',
      balance: 0,
      purchasedStores: [],
      rechargeRecords: [],
      phone: '',
      createdAt: new Date().toISOString(),
    }
    users[username] = newUser
    saveUsers(users)
    saveCurrent(newUser)
    return { ok: true }
  }

  const submitRecharge = (amount) => {
    const req = {
      id: Date.now(),
      username: user.username,
      amount,
      date: new Date().toISOString(),
      status: 'pending', // pending / confirmed / rejected
    }
    const list = getRechargeList()
    list.push(req)
    saveRecharges(list)
    return req
  }

  const adminConfirmRecharge = (reqId) => {
    const list = getRechargeList()
    const updated = list.map(r => {
      if (r.id !== reqId) return r
      return { ...r, status: 'confirmed', confirmedAt: new Date().toISOString() }
    })
    saveRecharges(updated)

    const req = updated.find(r => r.id === reqId)
    if (req) {
      const users = getUsers()
      if (users[req.username]) {
        users[req.username].balance = (users[req.username].balance || 0) + req.amount
        users[req.username].rechargeRecords = [
          ...(users[req.username].rechargeRecords || []),
          { id: req.id, amount: req.amount, date: req.date, status: '已到账' },
        ]
        saveUsers(users)
        // If the confirmed user is the current admin, update view
        if (user.username === req.username) {
          saveCurrent(users[req.username])
        }
      }
    }
    return updated
  }

  const submitSellRequest = (form) => {
    const req = {
      id: Date.now(),
      username: user ? user.username : 'guest',
      ...form,
      date: new Date().toISOString(),
      status: 'pending',
    }
    const list = getSellList()
    list.push(req)
    saveSells(list)
    return req
  }

  const adminGetAllUsers = () => getUsers()
  const adminGetRecharges = () => getRechargeList()
  const adminGetSells = () => getSellList()

  const addBalance = (username, amount) => {
    const users = getUsers()
    if (users[username]) {
      users[username].balance = (users[username].balance || 0) + Math.abs(amount)
      saveUsers(users)
      if (user.username === username) saveCurrent(users[username])
    }
  }

  const buyStore = (store) => {
    if (!user || user.role === 'admin') return { ok: false, error: '管理员不能购买' }
    if (user.balance < store.price) return { ok: false, error: '余额不足，请先充值' }
    const users = getUsers()
    const current = users[user.username]
    if (!current) return { ok: false, error: '用户不存在' }
    current.balance = current.balance - store.price
    current.purchasedStores = [...(current.purchasedStores || []), { ...store, purchasedAt: new Date().toISOString() }]
    saveUsers(users)
    saveCurrent(current)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shop_user')
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      submitRecharge, adminConfirmRecharge,
      submitSellRequest,
      adminGetAllUsers, adminGetRecharges, adminGetSells,
      addBalance, buyStore,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
