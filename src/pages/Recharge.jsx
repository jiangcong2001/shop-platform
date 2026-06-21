import { useState } from 'react'
import { Link } from 'react-router-dom'

const packages = [
  { amount: 100, coins: 100, tag: '' },
  { amount: 200, coins: 220, tag: '赠20' },
  { amount: 500, coins: 600, tag: '赠100' },
  { amount: 1000, coins: 1300, tag: '赠300' },
  { amount: 2000, coins: 2800, tag: '赠800' },
  { amount: 5000, coins: 7500, tag: '赠2500' },
]

export default function Recharge() {
  const [selected, setSelected] = useState(null)
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">充值中心</span></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">充值中心</h1>
      <p className="text-gray-500 text-center mb-2">充值金币，用于购买店铺和增值服务</p>
      <p className="text-red-600 font-medium text-sm text-center mb-10">1元 = 1金币 | 多充多送</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8">
        <h3 className="font-bold text-gray-800 text-lg mb-6">选择充值金额</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {packages.map(p => (
            <button key={p.amount} onClick={() => { setSelected(p); setShowQR(false) }} className={`relative p-5 rounded-xl border-2 text-center transition-all ${
              selected?.amount===p.amount ? 'border-red-600 bg-red-50' : 'border-gray-100 hover:border-red-200 hover:shadow-sm'
            }`}>
              {p.tag && <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">{p.tag}</span>}
              <div className="text-3xl font-bold text-red-600 mb-1">{p.amount}<span className="text-sm font-normal text-gray-400">元</span></div>
              <div className="text-sm text-gray-500">到账 <span className="font-semibold text-gray-700">{p.coins}</span> 金币</div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6">
            <h3 className="font-bold text-gray-800 text-lg mb-6">确认订单</h3>
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">充值金额</span><span className="font-semibold">{selected.amount} 元</span></div>
              <div className="flex justify-between"><span className="text-gray-500">到账金币</span><span className="font-semibold text-red-600">{selected.coins} 金币</span></div>
              <div className="flex justify-between border-t pt-3"><span className="text-gray-700 font-semibold">实付</span><span className="font-bold text-red-600 text-xl">{selected.amount} 元</span></div>
            </div>
            <button onClick={() => setShowQR(true)} className="w-full mt-6 bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors">立即充值</button>
          </div>

          {showQR && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <h3 className="font-bold text-gray-800 text-lg mb-3">微信扫码支付</h3>
              <p className="text-sm text-gray-500 mb-6">请使用微信扫描二维码完成支付</p>
              <p className="text-red-600 font-bold text-xl mb-6">应付：{selected.amount} 元</p>
              <img src="/qrcode.jpg" alt="支付二维码" className="w-48 h-48 mx-auto rounded-2xl border-2 border-gray-100 p-2" />
              <p className="text-xs text-gray-400 mt-4">支付后请联系客服 scmsj601 确认到账</p>
              <div className="mt-6 inline-block bg-green-500 text-white px-8 py-3 rounded-xl font-bold">微信客服：scmsj601</div>
            </div>
          )}
        </>
      )}

      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h3 className="font-bold text-gray-800 text-lg mb-4">充值说明</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>金币可用于购买店铺、支付服务费、委托过户等</li>
          <li>充值后请联系客服 scmsj601 确认到账</li>
          <li>大额充值（1000元以上）可联系客服获取更多优惠</li>
          <li>金币一经充值不予退还，请确认金额后再操作</li>
        </ul>
      </div>
    </div>
  )
}
