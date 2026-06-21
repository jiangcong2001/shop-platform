import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const packages = [
  { amount: 100, coins: 100, label: '100元' },
  { amount: 200, coins: 220, label: '200元' },
  { amount: 500, coins: 600, label: '500元' },
  { amount: 1000, coins: 1300, label: '1000元' },
  { amount: 2000, coins: 2800, label: '2000元' },
  { amount: 5000, coins: 7500, label: '5000元' },
]

export default function Recharge() {
  const { user, submitRecharge } = useAuth()
  const [selected, setSelected] = useState(null)
  const [msg, setMsg] = useState(null)

  if (!user || user.role === 'admin') {
    return (
      <div className="w-full px-4 py-8 mx-auto text-center" style={{ maxWidth: '500px' }}>
        <div className="bg-white rounded-2xl border p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-2">请先登录</h1>
          <p className="text-gray-400 text-sm mb-5">充值功能需要普通用户登录</p>
          <Link to="/login" className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-700">去登录</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!selected) return
    submitRecharge(selected.amount)
    setMsg(selected)
    setSelected(null)
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 mx-auto" style={{ maxWidth: '700px' }}>
      <div className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-red-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">充值中心</span>
      </div>

      <div className="bg-white rounded-2xl border p-6 md:p-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">充值中心</h1>
        <p className="text-gray-500 text-sm mb-6">
          当前余额：<span className="text-red-600 font-bold">{user.balance || 0}</span> 元
          <span className="text-gray-300 mx-1">|</span>
          1元=1金币
          <span className="text-gray-300 mx-1">|</span>
          多充多送
        </p>

        {msg && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="font-bold text-green-800 mb-2">充值申请已提交</div>
            <p className="text-sm text-green-700">
              充值 {msg.amount} 元，预计到账 {msg.coins} 金币
            </p>
            <div className="mt-3 bg-yellow-50 rounded-lg p-3 text-sm text-yellow-700">
              <p className="font-semibold mb-1">请注意：</p>
              <p>请使用支付宝转账到 <span className="font-bold">2199314738@qq.com</span>，然后联系微信客服 <span className="font-bold">scmsj601</span> 发送转账截图，审核通过后到账。</p>
            </div>
            <button onClick={() => setMsg(null)} className="mt-3 text-red-600 text-sm font-medium hover:underline">继续充值</button>
          </div>
        )}

        <h3 className="font-bold text-gray-800 mb-4">选择充值金额</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {packages.map(p => (
            <button key={p.amount} onClick={() => setSelected(p)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${selected?.amount === p.amount ? 'border-red-600 bg-red-50' : 'border-gray-100 hover:border-red-200'}`}>
              {p.coins > p.amount && <span className="block text-xs text-amber-600 font-medium mb-1">赠{p.coins - p.amount}金币</span>}
              <div className="text-xl font-black text-red-600">{p.amount}<span className="text-sm font-normal text-gray-400"> 元</span></div>
              <div className="text-xs text-gray-400 mt-0.5">到账 {p.coins} 金币</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm">充值：</span>
              <span className="font-bold text-red-600 text-lg ml-1">{selected.amount} 元</span>
              <span className="text-gray-400 text-sm ml-2">到账 {selected.coins} 金币</span>
            </div>
            <span className="text-xs text-gray-400">支付宝：2199314738@qq.com</span>
          </div>
        )}

        <button onClick={handleSubmit} disabled={!selected}
          className={`w-full py-3.5 rounded-xl font-bold text-white transition-colors ${selected ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}>
          提交充值申请
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">提交后联系客服 scmsj601 确认到账</p>
      </div>
    </div>
  )
}
