import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../AuthContext'
import stores from '../data/stores'

export default function AdminDashboard() {
  const { adminGetRecharges, adminGetSells, adminConfirmRecharge, adminGetAllUsers } = useAuth()
  const [recharges, setRecharges] = useState([])
  const [sells, setSells] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)

  const refresh = useCallback(async () => {
    const [r, s, u] = await Promise.all([
      adminGetRecharges(), adminGetSells(), adminGetAllUsers(),
    ])
    setRecharges(Array.isArray(r) ? r : [])
    setSells(Array.isArray(s) ? s : [])
    setTotalUsers(Array.isArray(u) ? u.filter(x => x.role !== 'admin').length : 0)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const pendingRecharges = recharges.filter(r => r.status === 'pending')
  const pendingSells = sells.filter(s => s.status === 'pending')

  const handleConfirm = async (id) => {
    await adminConfirmRecharge(id)
    refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">控制台</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { l: '店铺总数', v: stores.length, c: 'text-blue-600', b: 'bg-blue-50' },
          { l: '注册用户', v: totalUsers, c: 'text-green-600', b: 'bg-green-50' },
          { l: '待处理充值', v: pendingRecharges.length, c: 'text-orange-600', b: 'bg-orange-50' },
          { l: '待处理出售', v: pendingSells.length, c: 'text-red-600', b: 'bg-red-50' },
        ].map(s => (
          <div key={s.l} className={`${s.b} rounded-xl p-4`}>
            <div className="text-xs text-gray-500 mb-1">{s.l}</div>
            <div className={`text-2xl font-bold ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Pending Recharges */}
      <div className="bg-white rounded-xl border mb-6">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-800">待处理充值 ({pendingRecharges.length})</h2>
          <button onClick={refresh} className="text-xs text-gray-400 hover:text-red-500">刷新</button>
        </div>
        {pendingRecharges.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">暂无待处理充值</p>
        ) : (
          <div className="divide-y">
            {pendingRecharges.map(r => (
              <div key={r.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-700">{r.username}</span>
                  <span className="text-sm text-gray-400 ml-3">{new Date(r.created_at || r.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-red-600">{r.amount} 元</span>
                  <button onClick={() => handleConfirm(r.id)}
                    className="bg-green-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-green-600">
                    确认到账
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Sell Requests */}
      <div className="bg-white rounded-xl border">
        <div className="px-5 py-4 border-b">
          <h2 className="font-bold text-gray-800">待处理出售申请 ({pendingSells.length})</h2>
        </div>
        {pendingSells.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">暂无出售申请</p>
        ) : (
          <div className="divide-y">
            {pendingSells.map(s => (
              <div key={s.id} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">{s.platform} · {s.category || '未指定'} · {s.level}</span>
                  <span className="font-bold text-red-600">{s.price} 元</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>用户：{s.username}</span>
                  <span>手机：{s.phone}</span>
                  <span>{new Date(s.created_at || s.date).toLocaleString()}</span>
                </div>
                {s.desc && <p className="text-xs text-gray-500 mt-1">{s.desc}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
