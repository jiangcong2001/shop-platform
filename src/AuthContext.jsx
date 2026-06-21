import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseReady } from './lib/supabase'

const AuthContext = createContext(null)

// ===== localStorage fallback (when Supabase not configured) =====
function lsGetUsers() {
  try { return JSON.parse(localStorage.getItem('shop_users') || '{}') } catch (e) { return {} }
}
function lsSaveUsers(u) { localStorage.setItem('shop_users', JSON.stringify(u)) }
function lsGetRecharges() {
  try { return JSON.parse(localStorage.getItem('shop_recharges') || '[]') } catch (e) { return [] }
}
function lsSaveRecharges(arr) { localStorage.setItem('shop_recharges', JSON.stringify(arr)) }
function lsGetSells() {
  try { return JSON.parse(localStorage.getItem('shop_sells') || '[]') } catch (e) { return [] }
}
function lsSaveSells(arr) { localStorage.setItem('shop_sells', JSON.stringify(arr)) }

// ===== AuthProvider =====
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSupabaseReady()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) loadProfile(session.user)
        else setLoading(false)
      })
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) loadProfile(session.user)
        else { setUser(null); setLoading(false) }
      })
      return () => subscription.unsubscribe()
    } else {
      // localStorage fallback
      try {
        const saved = localStorage.getItem('shop_user')
        if (saved) setUser(JSON.parse(saved))
      } catch (e) {}
      setLoading(false)
    }
  }, [])

  const loadProfile = async (authUser) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', authUser.id).single()
    if (data) setUser({ ...authUser, ...data })
    else {
      // auto-create profile for new user
      const email = authUser.email || ''
      const username = email.split('@')[0] || authUser.id.slice(0, 8)
      const { data: newProfile } = await supabase.from('profiles').insert({
        id: authUser.id,
        username,
        balance: 0,
        role: 'user',
      }).select().single()
      if (newProfile) setUser({ ...authUser, ...newProfile })
    }
    setLoading(false)
  }

  const lsSaveCurrent = (u) => {
    setUser(u)
    localStorage.setItem('shop_user', JSON.stringify(u))
  }

  // ===== Auth =====
  const login = async (username, password) => {
    if (isSupabaseReady()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: `${username}@shop.local`, password })
      if (error) return { ok: false, error: error.message }
      await loadProfile(data.user)
      return { ok: true }
    }
    // localStorage fallback
    const users = lsGetUsers()
    if (users[username] && users[username].password === password) {
      lsSaveCurrent(users[username])
      return { ok: true }
    }
    return { ok: false, error: '用户名或密码错误' }
  }

  const register = async (username, password) => {
    if (isSupabaseReady()) {
      const email = `${username}@shop.local`
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) return { ok: false, error: error.message }
      // Profile will be created async via trigger or loadProfile
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id, username, balance: 0, role: 'user',
        }).select().single()
      }
      return { ok: true }
    }
    // localStorage fallback
    const users = lsGetUsers()
    if (users[username]) return { ok: false, error: '用户名已存在' }
    const newUser = {
      username, password, role: 'user',
      balance: 0, purchasedStores: [], rechargeRecords: [],
      phone: '', createdAt: new Date().toISOString(),
    }
    users[username] = newUser
    lsSaveUsers(users)
    lsSaveCurrent(newUser)
    return { ok: true }
  }

  const logout = async () => {
    if (isSupabaseReady()) {
      await supabase.auth.signOut()
    }
    setUser(null)
    localStorage.removeItem('shop_user')
  }

  // ===== Recharge =====
  const submitRecharge = async (amount) => {
    if (isSupabaseReady()) {
      const { data, error } = await supabase.from('recharge_requests').insert({
        id: Date.now(),
        user_id: user.id,
        username: user.username,
        amount,
        status: 'pending',
      }).select().single()
      if (error) return null
      return data
    }
    // localStorage fallback
    const req = {
      id: Date.now(), username: user.username, amount,
      date: new Date().toISOString(), status: 'pending',
    }
    lsGetRecharges().push(req)
    lsSaveRecharges(lsGetRecharges())
    return req
  }

  const adminConfirmRecharge = async (reqId) => {
    if (isSupabaseReady()) {
      // Get request info
      const { data: req } = await supabase.from('recharge_requests').select('*').eq('id', reqId).single()
      if (!req) return
      // Update request status
      await supabase.from('recharge_requests').update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      }).eq('id', reqId)
      // Update user balance
      const { data: profile } = await supabase.from('profiles').select('balance').eq('id', req.user_id).single()
      if (profile) {
        await supabase.from('profiles').update({
          balance: (profile.balance || 0) + req.amount,
        }).eq('id', req.user_id)
      }
      return
    }
    // localStorage fallback
    const list = lsGetRecharges()
    const updated = list.map(r => {
      if (r.id !== reqId) return r
      return { ...r, status: 'confirmed', confirmedAt: new Date().toISOString() }
    })
    lsSaveRecharges(updated)
    const req = updated.find(r => r.id === reqId)
    if (req) {
      const users = lsGetUsers()
      if (users[req.username]) {
        users[req.username].balance = (users[req.username].balance || 0) + req.amount
        users[req.username].rechargeRecords = [
          ...(users[req.username].rechargeRecords || []),
          { id: req.id, amount: req.amount, date: req.date, status: '已到账' },
        ]
        lsSaveUsers(users)
      }
    }
  }

  // ===== Sell requests =====
  const submitSellRequest = async (form) => {
    const reqData = {
      id: Date.now(),
      user_id: user?.id || null,
      username: user?.username || 'guest',
      ...form,
      status: 'pending',
    }
    if (isSupabaseReady()) {
      await supabase.from('sell_requests').insert(reqData)
    } else {
      const list = lsGetSells()
      list.push({ ...reqData, date: new Date().toISOString() })
      lsSaveSells(list)
    }
    return reqData
  }

  // ===== Admin data access =====
  const adminGetAllUsers = async () => {
    if (isSupabaseReady()) {
      const { data } = await supabase.from('profiles').select('*')
      return data || []
    }
    return Object.values(lsGetUsers())
  }

  const adminGetRecharges = async () => {
    if (isSupabaseReady()) {
      const { data } = await supabase.from('recharge_requests').select('*').order('id', { ascending: false })
      return data || []
    }
    return lsGetRecharges().sort((a, b) => b.id - a.id)
  }

  const adminGetSells = async () => {
    if (isSupabaseReady()) {
      const { data } = await supabase.from('sell_requests').select('*').order('id', { ascending: false })
      return data || []
    }
    return lsGetSells().sort((a, b) => b.id - a.id)
  }

  const addBalance = async (username, amount) => {
    if (isSupabaseReady()) {
      const { data: profile } = await supabase.from('profiles').select('id,balance').eq('username', username).single()
      if (profile) {
        await supabase.from('profiles').update({
          balance: (profile.balance || 0) + Math.abs(amount),
        }).eq('id', profile.id)
      }
      return
    }
    const users = lsGetUsers()
    if (users[username]) {
      users[username].balance = (users[username].balance || 0) + Math.abs(amount)
      lsSaveUsers(users)
    }
  }

  const buyStore = async (store) => {
    if (!user) return { ok: false, error: '请先登录' }
    if (isSupabaseReady()) {
      const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user.id).single()
      if (!profile || profile.balance < store.price) return { ok: false, error: '余额不足，请先充值' }
      await supabase.from('profiles').update({ balance: profile.balance - store.price }).eq('id', user.id)
      await supabase.from('purchased_stores').insert({
        user_id: user.id, store_id: store.id,
        store_name: store.name, platform: store.platform,
        category: store.category || '', level: store.level || '',
        price: store.price,
      })
      // Refresh user
      const { data: updated } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (updated) setUser({ ...user, ...updated })
      return { ok: true }
    }
    // localStorage fallback
    if (user.balance < store.price) return { ok: false, error: '余额不足，请先充值' }
    const users = lsGetUsers()
    const current = users[user.username]
    if (!current) return { ok: false, error: '用户不存在' }
    current.balance = current.balance - store.price
    current.purchasedStores = [...(current.purchasedStores || []), { ...store, purchasedAt: new Date().toISOString() }]
    lsSaveUsers(users)
    lsSaveCurrent(current)
    return { ok: true }
  }

  // ===== refresh user data =====
  const refreshUser = async () => {
    if (isSupabaseReady() && user?.id) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setUser({ ...user, ...data })
    } else if (user?.username) {
      const users = lsGetUsers()
      if (users[user.username]) lsSaveCurrent(users[user.username])
    }
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      submitRecharge, adminConfirmRecharge,
      submitSellRequest,
      adminGetAllUsers, adminGetRecharges, adminGetSells,
      addBalance, buyStore, refreshUser,
      isSupabaseReady: isSupabaseReady(),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
