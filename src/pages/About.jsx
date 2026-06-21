import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>关于我们</span></div>
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">关于我们</h1>
        <p className="text-gray-600 leading-relaxed mb-6">全国一线电商服务平台，深耕网店转让行业12年。覆盖淘宝、天猫、京东、抖音等主流电商平台，为买卖双方提供安全、专业的店铺交易服务。</p>
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          {[{n:'12年',d:'行业经验'},{n:'500+',d:'专业团队'},{n:'10万+',d:'服务客户'}].map(s=><div key={s.d} className="bg-gray-50 rounded-xl p-4"><div className="text-2xl font-bold text-primary">{s.n}</div><div className="text-xs text-gray-500 mt-1">{s.d}</div></div>)}
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">核心优势</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[{t:'资质齐全',d:'合规ICP资质'},{t:'资金托管',d:'第三方托管保障'},{t:'法务护航',d:'专业法务团队'},{t:'全程服务',d:'评估到过户一站式'}].map(a=><div key={a.t} className="border rounded-xl p-4"><h4 className="font-semibold mb-1">{a.t}</h4><p className="text-sm text-gray-500">{a.d}</p></div>)}
        </div>
        <div className="mt-8 text-center text-primary font-medium">客服微信：scmsj601</div>
      </div>
    </div>
  )
}
