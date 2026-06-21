import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'

export default function AdminOrders() {
  const { adminGetRecharges } = useAuth()
  const [list, setList] = useState([])

  useEffect(() => {
    setList(adminGetRecharges().sort((a, b) => b.id - a.id))
  }, [])

  const statusMap = {
    pending: { label: '待确认', cls: 'bg-orange-100 text-orange-600' },
    confirmed: { label: '已到账', cls: 'bg-green-100 text-green-600' },
    rejected: { label: '已拒绝', cls: 'bg-red-100 text-red-600' },
  }

  const pending = list.filter(r => r.status === 'pending').length
  const confirmed = list.filter(r => r.status === 'confirmed').length
  const totalAmount = list.filter(r => r.status === 'confirmed').reduce((s, r) => s + r.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">充值记录</h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { l: '总充值', v: list.length },
          { l: '已到账', v: confirmed },
          { l: '待确认', v: pending },
        ].map(s => (
          <div key={s.l} className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{s.v}</div>
            <div className="text-xs text-gray-400 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {list.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">暂无充值记录</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">用户</th>
                <th className="text-right px-4 py-3 font-medium">金额</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-left px-4 py-3 font-medium">提交时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(r => {
                const st = statusMap[r.status] || statusMap.pending
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{r.username}</td>
                    <td className="px-4 py-3 text-right font-semibold text-red-600">{r.amount} 元</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(r.date).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
