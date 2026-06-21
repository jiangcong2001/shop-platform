import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const packages = [
  { amount: 100, coins: 100 },
  { amount: 200, coins: 220 },
  { amount: 500, coins: 600 },
  { amount: 1000, coins: 1300 },
  { amount: 2000, coins: 2800 },
  { amount: 5000, coins: 7500 },
]

export default function Recharge() {
  const { user, recharge } = useAuth()
  const nav = useNavigate()
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)

  if (!user) {
    return (
      <div className="w-full px-4 md:px-8 py-8 mx-auto text-center" style={{ maxWidth: '600px' }}>
        <div className="bg-white rounded-2xl border p-10">
          <h1 className="text-2xl font-black text-gray-900 mb-4">请先登录</h1>
          <p className="text-gray-500 mb-6">充值功能需要登录后才能使用</p>
          <Link to="/login" className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700">去登录</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!selected) return
    recharge(selected.amount)
    setDone(true)
  }

  if (done) {
    return (
      <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="bg-white rounded-2xl border p-10 text-center">
          <div className="text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-black text-gray-900 mb-4">充值申请已提交</h1>
          <p className="text-gray-500 mb-6">
            充值金额：<span className="text-red-600 font-bold">{selected.amount} 元</span><br/>
            到账金币：<span className="text-red-600 font-bold">{selected.coins} 金币</span>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-yellow-800 mb-3">请完成以下步骤：</h3>
            <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
              <li>使用支付宝转账到：<span className="font-bold">2199314738@qq.com</span></li>
              <li>转账金额：<span className="font-bold">{selected.amount} 元</span></li>
              <li>联系微信客服 <span className="font-bold">scmsj601</span> 发送转账截图</li>
              <li>客服确认后将在5分钟内到账</li>
            </ol>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setDone(false); setSelected(null) }} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">继续充值</button>
            <button onClick={() => nav('/dashboard')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700">查看余额</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '700px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">充值中心</span></div>
      <h1 className="text-3xl font-black text-gray-900 mb-2 text-center">充值中心</h1>
      <p className="text-gray-500 text-center mb-2">当前余额：<span className="text-red-600 font-bold">{user.balance || 0}</span> 元</p>
      <p className="text-sm text-gray-400 text-center mb-8">1元 = 1金币 | 多充多送</p>

      <div className="bg-white rounded-2xl border p-6 mb-6">
        <h3 className="font-bold text-lg mb-6">选择充值金额</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {packages.map(p => (
            <button key={p.amount} onClick={() => setSelected(p)} className={`p-5 rounded-xl border-2 text-center transition-all ${
              selected?.amount===p.amount ? 'border-red-600 bg-red-50' : 'border-gray-100 hover:border-red-200'
            }`}>
              {p.coins > p.amount && <span className="block text-xs text-amber-600 font-medium mb-1">赠{p.coins-p.amount}</span>}
              <div className="text-2xl font-black text-red-600">{p.amount}<span className="text-sm font-normal text-gray-400">元</span></div>
              <div className="text-xs text-gray-500 mt-1">到账 {p.coins} 金币</div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-bold text-lg mb-4">确认充值</h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-6">
            <div className="flex justify-between"><span className="text-gray-500">充值金额</span><span className="font-semibold">{selected.amount} 元</span></div>
            <div className="flex justify-between"><span className="text-gray-500">到账金币</span><span className="font-semibold text-red-600">{selected.coins} 金币</span></div>
            <div className="flex justify-between border-t pt-2"><span className="font-semibold">实付</span><span className="font-bold text-red-600 text-xl">{selected.amount} 元</span></div>
          </div>
          <button onClick={handleSubmit} className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors">提交充值</button>
          <p className="text-xs text-gray-400 text-center mt-3">通过支付宝转账，联系客服 scmsj601 确认到账</p>
        </div>
      )}
    </div>
  )
}
