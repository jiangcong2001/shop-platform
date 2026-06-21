import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'

export default function AdminUsers() {
  const { adminGetAllUsers, adminGetSells, addBalance } = useAuth()
  const [list, setList] = useState([])
  const [showAddBal, setShowAddBal] = useState({})
  const [balAmount, setBalAmount] = useState('')

  useEffect(() => {
    const users = adminGetAllUsers()
    const sells = adminGetSells()
    // Match sell phone to user
    const arr = Object.values(users).filter(u => u.role !== 'admin')
      .map(u => {
        const sellRecord = sells.find(s => s.username === u.username)
        return { ...u, phone: u.phone || (sellRecord ? sellRecord.phone : '') }
      })
    setList(arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }, [])

  const handleAddBalance = (username) => {
    const amount = parseInt(balAmount)
    if (!amount || amount <= 0) return
    addBalance(username, amount)
    setList(prev => prev.map(u => u.username === username ? { ...u, balance: u.balance + amount } : u))
    setShowAddBal({ ...showAddBal, [username]: false })
    setBalAmount('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">用户管理</h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        {list.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">暂无注册用户</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">用户名</th>
                <th className="text-left px-4 py-3 font-medium">手机号</th>
                <th className="text-right px-4 py-3 font-medium">余额</th>
                <th className="text-right px-4 py-3 font-medium">已购店铺</th>
                <th className="text-left px-4 py-3 font-medium">注册时间</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(u => (
                <tr key={u.username} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{u.username}</td>
                  <td className="px-4 py-3 text-gray-500">{u.phone || '-'}</td>
                  <td className="px-4 py-3 text-right font-semibold text-red-600">{u.balance || 0} 元</td>
                  <td className="px-4 py-3 text-right text-gray-600">{(u.purchasedStores || []).length} 家</td>
                  <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setShowAddBal({ ...showAddBal, [u.username]: !showAddBal[u.username] })}
                      className="text-blue-500 hover:text-blue-700 text-xs">充值</button>
                    {showAddBal[u.username] && (
                      <div className="mt-2 inline-flex items-center gap-1">
                        <input type="number" value={balAmount} onChange={e => setBalAmount(e.target.value)}
                          placeholder="金额" className="w-20 border rounded px-2 py-1 text-xs" autoFocus />
                        <button onClick={() => handleAddBalance(u.username)}
                          className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600">确认</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
