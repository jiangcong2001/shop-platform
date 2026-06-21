import { Link } from 'react-router-dom'
import StoreCard from '../components/StoreCard'
import stores from '../data/stores'
import { notices, newsList, cases } from '../data/news'

const platforms = [
  { key: '淘宝', color: 'from-orange-400 to-orange-600', label: '淘宝店铺', desc: '个人店/企业店/全球购' },
  { key: '天猫', color: 'from-red-500 to-red-700', label: '天猫店铺', desc: '旗舰店/专营店/专卖店' },
  { key: '京东', color: 'from-red-600 to-red-800', label: '京东店铺', desc: 'POP/自营/国际' },
  { key: '抖音', color: 'from-gray-700 to-black', label: '抖音小店', desc: '小店/橱窗/直播带货' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="w-full px-4 md:px-8 py-16 md:py-24 mx-auto" style={{ maxWidth: '1280px' }}>
          <div className="text-center md:text-left md:max-w-2xl">
            <p className="text-white/70 text-sm mb-4">12年深耕 · 500+团队 · 10万+客户信赖</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">淘宝 · 天猫 · 京东 · 抖音</h1>
            <p className="text-xl md:text-2xl font-light text-white/80 mb-8">专业网店转让交易平台</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/list" className="bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">立即选购店铺</Link>
              <Link to="/sell" className="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">我要出售店铺</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="w-full px-4 md:px-8 py-12 mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map(p => (
            <Link key={p.key} to={`/list/${p.key}`} className={`bg-gradient-to-br ${p.color} rounded-2xl p-6 text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
              <h3 className="font-bold text-xl mb-2">{p.label}</h3>
              <p className="text-white/70 text-sm mb-4">{p.desc}</p>
              <span className="text-white/60 text-sm">浏览 &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stores */}
      <section className="w-full px-4 md:px-8 py-12 mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3">精选店铺</h2>
          <p className="text-gray-500">每日更新优质店铺，总有一家适合你</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stores.slice(0, 8).map(s => <Link key={s.id} to={`/store/${s.id}`}><StoreCard store={s} /></Link>)}
        </div>
        <div className="text-center mt-8">
          <Link to="/list" className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:border-red-300 hover:text-red-600 transition-colors">查看全部店铺</Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-900 text-white py-16">
        <div className="w-full px-4 md:px-8 mx-auto" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">为什么选择我们</h2>
            <p className="text-gray-400 max-w-xl mx-auto">12年行业深耕，500+专业团队，为超过10万客户提供安全可靠的店铺交易服务</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', t: '资质齐全', d: '合规ICP经营资质，正规合法运营' },
              { n: '02', t: '资金托管', d: '第三方资金托管，交易安全有保障' },
              { n: '03', t: '法务护航', d: '专业法务团队，20+项风控核验' },
              { n: '04', t: '全程服务', d: '从评估到过户，一站式专业服务' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 rounded-2xl p-6 text-center hover:bg-gray-800 transition-colors">
                <div className="text-red-500 text-3xl font-black mb-4">{item.n}</div>
                <h3 className="font-bold text-lg mb-2">{item.t}</h3>
                <p className="text-gray-400 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases & News */}
      <section className="w-full px-4 md:px-8 py-12 mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-8">成功案例</h2>
            <div className="space-y-4">
              {cases.map((c, i) => (
                <div key={c.id} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">{i+1}</div>
                    <div>
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium">{c.tag}</span>
                      <h4 className="font-semibold text-gray-800 mt-2 mb-1">{c.title}</h4>
                      <p className="text-sm text-gray-500">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-8">最新动态</h2>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="bg-red-50 px-5 py-3 font-semibold text-sm text-red-600 border-b">平台公告</div>
              {notices.map(n => (
                <div key={n.id} className="flex justify-between px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-700">{n.title}</span><span className="text-xs text-gray-400">{n.date}</span>
                </div>
              ))}
              <div className="bg-gray-50 px-5 py-3 font-semibold text-sm text-gray-500 border-b">行业新闻</div>
              {newsList.map(n => (
                <div key={n.id} className="flex justify-between px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-700">{n.title}</span><span className="text-xs text-gray-400">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white py-12">
        <div className="w-full px-4 md:px-8 mx-auto text-center" style={{ maxWidth: '1280px' }}>
          <h2 className="text-3xl font-black mb-4">立即添加微信，免费获取店铺估价</h2>
          <p className="text-white/80 text-lg mb-6">12年专注网店交易，500+专业团队为您的每一笔交易保驾护航</p>
          <div className="text-3xl font-black">scmsj601</div>
        </div>
      </section>
    </div>
  )
}
