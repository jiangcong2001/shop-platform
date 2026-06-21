import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, isSupabaseReady } = useAuth()
  const nav = useNavigate()
  const [data, setData] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [recharges, setRecharges] = useState([])

  useEffect(() => {
    if (!user || user.role === 'admin') { nav('/login'); return }
    if (isSupabaseReady && supabase) {
      // Fetch from Supabase
      Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('purchased_stores').select('*').eq('user_id', user.id).order('purchased_at', { ascending: false }),
        supabase.from('recharge_requests').select('*').eq('user_id', user.id).order('id', { ascending: false }),
      ]).then(([p, s, r]) => {
        setData({ ...user, ...(p.data || {}) })
        setPurchases(s.data || [])
        setRecharges(r.data || [])
      })
    } else {
      // localStorage fallback
      try {
        const users = JSON.parse(localStorage.getItem('shop_users') || '{}')
        const d = users[user.username] || user
        setData(d)
        setPurchases(d.purchasedStores || [])
        setRecharges(d.rechargeRecords || [])
      } catch (e) {
        setData(user)
      }
    }
  }, [user, nav, isSupabaseReady])

  if (!data) return null

  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '960px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">我的账户</span></div>

      <h1 className="text-3xl font-black text-gray-900 mb-8">我的账户</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { l: '账户余额', v: `${data.balance || 0} 元`, c: 'bg-red-50 text-red-600' },
          { l: '已购店铺', v: `${purchases.length} 家`, c: 'bg-blue-50 text-blue-600' },
          { l: '充值记录', v: `${recharges.length} 条`, c: 'bg-green-50 text-green-600' },
          { l: '用户名', v: data.username, c: 'bg-gray-100 text-gray-600' },
        ].map(s => (
          <div key={s.l} className="bg-white rounded-2xl border p-5 text-center">
            <div className="text-xs text-gray-400 mb-2">{s.l}</div>
            <div className={`text-xl font-black ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        <Link to="/recharge" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">立即充值</Link>
        <Link to="/list" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-red-300 hover:text-red-600 transition-colors">浏览店铺</Link>
      </div>

      <div className="bg-white rounded-2xl border p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">已购店铺</h2>
        {purchases.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">暂无购买记录</p>
        ) : (
          <div className="divide-y">
            {purchases.map((s, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <div className="font-semibold text-gray-800">{s.store_name || s.name}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {s.platform} · {s.category || ''} · 购买时间：{new Date(s.purchased_at || s.purchasedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-red-600 font-bold">
                  {(s.price >= 10000 ? `${(s.price/10000).toFixed(1)}万` : `${s.price}元`)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">充值记录</h2>
        {recharges.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">暂无充值记录</p>
        ) : (
          <div className="divide-y">
            {recharges.map((r, i) => {
              const statusLabel = r.status === 'confirmed' ? '已到账' : r.status === 'pending' ? '待确认' : r.status
              return (
                <div key={i} className="flex justify-between items-center py-3">
                  <div>
                    <span className="font-semibold text-gray-800">{r.amount} 元</span>
                    <span className="text-sm text-gray-400 ml-2">{new Date(r.created_at || r.date).toLocaleString()}</span>
                  </div>
                  <span className={`text-sm font-medium ${r.status === 'confirmed' ? 'text-green-600' : 'text-amber-600'}`}>
                    {statusLabel}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
