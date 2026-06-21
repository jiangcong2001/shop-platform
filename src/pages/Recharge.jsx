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

  const handleRecharge = () => {
    if (!selected) return
    setShowQR(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>充值中心</span></div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">充值中心</h1>
      <p className="text-gray-500 text-sm text-center mb-2">充值金币，用于购买店铺和增值服务</p>
      <p className="text-primary text-xs text-center mb-8">1元 = 1金币 | 多充多送</p>

      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">选择充值金额</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {packages.map(p => (
            <button
              key={p.amount}
              onClick={() => { setSelected(p); setShowQR(false) }}
              className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                selected?.amount === p.amount
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-100 hover:border-primary/30 hover:shadow-sm'
              }`}
            >
              {p.tag && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">{p.tag}</span>
              )}
              <div className="text-2xl font-bold text-primary mb-1">{p.amount}<span className="text-sm font-normal text-gray-400">元</span></div>
              <div className="text-sm text-gray-500">到账 <span className="font-semibold text-gray-700">{p.coins}</span> 金币</div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <>
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">确认订单</h3>
              <span className="text-xs text-gray-400">微信客服：scmsj601</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">充值金额</span><span className="font-semibold">{selected.amount} 元</span></div>
              <div className="flex justify-between"><span className="text-gray-500">到账金币</span><span className="font-semibold text-primary">{selected.coins} 金币</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-gray-700 font-semibold">实付金额</span><span className="font-bold text-primary text-lg">{selected.amount} 元</span></div>
            </div>
            <button onClick={handleRecharge} className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              立即充值
            </button>
          </div>

          {showQR && (
            <div className="bg-white rounded-2xl shadow-sm border p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-2">微信扫码支付</h3>
              <p className="text-sm text-gray-500 mb-4">请使用微信扫描下方二维码完成支付</p>
              <p className="text-primary font-semibold mb-4">应付：{selected.amount} 元</p>
              <img src="/qrcode.jpg" alt="微信支付二维码" className="w-48 h-48 mx-auto rounded-xl border-2 border-gray-100 p-2" />
              <p className="text-xs text-gray-400 mt-4">支付完成后，请发送截图给客服确认</p>
              <div className="mt-4 inline-block bg-green-500 text-white px-8 py-2.5 rounded-full font-medium">
                微信客服：scmsj601
              </div>
              <p className="text-xs text-gray-400 mt-2">客服将在5分钟内确认到账</p>
            </div>
          )}
        </>
      )}

      <div className="mt-10 bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">充值说明</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>· 金币可用于购买店铺、支付服务费、委托过户等</li>
          <li>· 充值后请联系客服 scmsj601 确认到账</li>
          <li>· 大额充值（1000元以上）可联系客服获取更多优惠</li>
          <li>· 金币一经充值不予退还，请确认金额后再操作</li>
          <li>· 如有疑问请添加微信 scmsj601 咨询</li>
        </ul>
      </div>
    </div>
  )
}
