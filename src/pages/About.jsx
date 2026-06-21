import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '900px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">关于我们</span></div>
      <div className="bg-white rounded-2xl border p-8 md:p-10">
        <h1 className="text-3xl font-black text-gray-900 mb-6">关于我们</h1>
        <p className="text-gray-600 leading-relaxed mb-8 text-lg">全国一线电商服务平台，深耕网店转让行业12年。覆盖淘宝、天猫、京东、抖音等主流电商平台，为买卖双方提供安全、专业的店铺交易服务。</p>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[{n:'12年',d:'行业经验'},{n:'500+',d:'专业团队'},{n:'10万+',d:'服务客户'}].map(s=><div key={s.d} className="bg-gray-50 rounded-2xl p-6 text-center"><div className="text-3xl font-black text-red-600">{s.n}</div><div className="text-sm text-gray-500 mt-2">{s.d}</div></div>)}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">核心优势</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[{t:'资质齐全',d:'合规ICP经营资质，正规合法运营'},{t:'资金托管',d:'第三方托管，交易安全有保障'},{t:'法务护航',d:'专业法务团队，全程风控核验'},{t:'全程服务',d:'从评估到过户，一站式办理'}].map(a=><div key={a.t} className="border border-gray-100 rounded-xl p-5"><h4 className="font-bold text-gray-800 mb-2">{a.t}</h4><p className="text-sm text-gray-500">{a.d}</p></div>)}
        </div>
        <div className="text-center text-red-600 font-bold">客服微信：scmsj601</div>
      </div>
    </div>
  )
}
