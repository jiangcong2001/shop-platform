import { Link } from 'react-router-dom'
import StoreCard from '../components/StoreCard'
import SearchForm from '../components/SearchForm'
import stores from '../data/stores'
import { notices, newsList, cases } from '../data/news'

const mainPlatforms = [
  { key: '淘宝', desc: '个人店 / 企业店 / 全球购', bg: 'bg-gradient-to-br from-orange-400 to-orange-600', emoji: 'T' },
  { key: '天猫', desc: '旗舰店 / 专营店 / 专卖店', bg: 'bg-gradient-to-br from-red-500 to-red-700', emoji: 'M' },
  { key: '京东', desc: 'POP / 自营 / 国际', bg: 'bg-gradient-to-br from-red-600 to-red-800', emoji: 'J' },
  { key: '抖音', desc: '小店 / 橱窗 / 直播带货', bg: 'bg-gradient-to-br from-gray-800 to-black', emoji: 'D' },
]

export default function Home() {
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                12年深耕 · 500+团队 · 10万+客户信赖
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
                淘宝 · 天猫 · 京东 · 抖音
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-6">专业网店转让交易平台</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg">
                覆盖主流电商平台，店铺估价、交易撮合、过户代办一站式服务
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/list" className="bg-white text-red-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg">
                  立即选购店铺
                </Link>
                <Link to="/sell" className="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  我要出售店铺
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 Platforms ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {mainPlatforms.map(p => (
            <Link key={p.key} to={`/list/${p.key}`} className={`${p.bg} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative`}>
              <div className="absolute top-3 right-3 text-5xl font-bold text-white/10">{p.emoji}</div>
              <h3 className="font-bold text-xl mb-1 relative z-10">{p.key}</h3>
              <p className="text-white/70 text-sm mb-4 relative z-10">{p.desc}</p>
              <span className="text-white/60 text-sm font-medium relative z-10 group-hover:text-white transition-colors">浏览店铺 &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Featured Stores ===== */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-red-600 text-sm font-semibold mb-2 uppercase tracking-wide">精选店铺</div>
            <h2 className="text-3xl font-bold text-gray-900">每日更新优质店铺</h2>
          </div>
          <Link to="/list" className="hidden sm:inline-flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium transition-colors">
            查看全部店铺 <span className="text-xl">&rarr;</span>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stores.slice(0, 8).map(s => (
            <Link key={s.id} to={`/store/${s.id}`}><StoreCard store={s} /></Link>
          ))}
        </div>
      </section>

      {/* ===== Why Us ===== */}
      <section className="bg-gray-900 text-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-red-400 text-sm font-semibold mb-2 uppercase tracking-wide">为什么选择我们</div>
            <h2 className="text-3xl font-bold">四大核心优势</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">12年行业深耕，500+专业团队，为超过10万客户提供安全可靠的店铺交易服务</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: '01', t: '资质齐全', d: '合规ICP经营资质，股权挂牌企业，正规合法运营受国家监管' },
              { i: '02', t: '资金托管', d: '第三方资金托管，买家确认收货后放款，交易安全有保障' },
              { i: '03', t: '法务护航', d: '专业法务团队全程参与，20+项风控核验排查所有潜在风险' },
              { i: '04', t: '全程服务', d: '从店铺评估、交易撮合到过户办理，一站式专业服务让您省心' },
            ].map(item => (
              <div key={item.i} className="text-center p-6 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors group">
                <div className="text-4xl font-bold text-red-600/30 mb-4 group-hover:text-red-600/50 transition-colors">{item.i}</div>
                <h3 className="font-bold text-lg mb-3">{item.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cases + News ===== */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-red-600 text-sm font-semibold mb-2 uppercase tracking-wide">成功案例</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">真实客户故事</h2>
            <div className="space-y-4">
              {cases.map((c, i) => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg shrink-0">{i+1}</div>
                    <div>
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium">{c.tag}</span>
                      <h4 className="font-semibold text-gray-800 mt-2 mb-1 group-hover:text-red-600 transition-colors">{c.title}</h4>
                      <p className="text-sm text-gray-500">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-red-600 text-sm font-semibold mb-2 uppercase tracking-wide">最新动态</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">公告 & 新闻</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-red-50 px-6 py-3 border-b border-red-100 font-semibold text-sm text-red-600">平台公告</div>
              {notices.map(n => (
                <div key={n.id} className="flex items-center justify-between px-6 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="text-sm text-gray-700">{n.title}</span>
                  <span className="text-xs text-gray-400 ml-4 shrink-0">{n.date}</span>
                </div>
              ))}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 font-semibold text-sm text-gray-500">行业新闻</div>
              {newsList.map(n => (
                <div key={n.id} className="flex items-center justify-between px-6 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="text-sm text-gray-700">{n.title}</span>
                  <span className="text-xs text-gray-400 ml-4 shrink-0">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-10 md:p-14">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <h2 className="text-3xl font-bold mb-4">立即添加微信，免费获取店铺估价</h2>
              <p className="text-white/80 text-lg mb-6">12年专注网店交易，500+专业团队为您的每一笔交易保驾护航</p>
              <div className="text-2xl font-bold">微信：scmsj601</div>
            </div>
            <div className="shrink-0 text-center">
              <img src="/qrcode.jpg" alt="微信二维码" className="w-36 h-36 rounded-2xl bg-white p-2 shadow-lg mx-auto" />
              <p className="text-white/60 text-sm mt-3">扫一扫添加好友</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        <div className="flex">
          <Link to="/" className="flex-1 flex flex-col items-center py-2 text-red-600 text-xs font-medium">首页</Link>
          <Link to="/list" className="flex-1 flex flex-col items-center py-2 text-gray-400 text-xs">选店铺</Link>
          <Link to="/pricing" className="flex-1 flex flex-col items-center py-2 text-gray-400 text-xs">价格</Link>
          <Link to="/login" className="flex-1 flex flex-col items-center py-2 text-gray-400 text-xs">我的</Link>
        </div>
      </div>
    </div>
  )
}
