import { Link } from 'react-router-dom'
import StoreCard from '../components/StoreCard'
import stores from '../data/stores'
import { notices, newsList, cases, platformIcons } from '../data/news'

const mainPlatforms = ['淘宝', '天猫', '京东', '抖音']

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">淘宝 / 天猫 / 京东 / 抖音</h1>
          <p className="text-white/80 text-lg mb-8">网店转让平台 · 安全 · 专业 · 高效</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/list" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100">立即选购</Link>
            <a href="#contact" className="border-2 border-white/60 px-8 py-3 rounded-full font-semibold hover:bg-white/10">联系客服</a>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-10 max-w-lg mx-auto">
            {[
              { n: '12年', l: '行业经验' },
              { n: '500+', l: '专业团队' },
              { n: '10万+', l: '服务客户' },
              { n: '4大', l: '平台覆盖' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold">{s.n}</div>
                <div className="text-xs text-white/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Platforms */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mainPlatforms.map(p => {
            const icon = platformIcons[p]
            return (
              <Link key={p} to={`/list/${p}`} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all text-center group">
                <span className={`${icon.bg} text-white text-2xl w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>{p.charAt(0)}</span>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary">{p}店铺</h3>
                <p className="text-xs text-gray-400 mt-1">查看详情 &gt;</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recommended */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">精选店铺</h2>
          <Link to="/list" className="text-primary text-sm">查看更多 &gt;</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.slice(0, 8).map(s => (
            <Link key={s.id} to={`/store/${s.id}`}><StoreCard store={s} /></Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-semibold mb-6">为什么选我们</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { t: '资质齐全', d: '合规ICP资质，安全可靠' },
              { t: '资金托管', d: '第三方托管，交易无忧' },
              { t: '法务护航', d: '专业法务，全程保障' },
              { t: '全程服务', d: '评估到过户一站式' },
            ].map(f => (
              <div key={f.t}>
                <div className="text-primary font-bold text-lg mb-1">{f.t}</div>
                <div className="text-gray-400 text-sm">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases + News */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">成功案例</h2>
            <div className="space-y-3">
              {cases.map(c => (
                <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="text-xs text-primary bg-primary-light px-2 py-0.5 rounded">{c.tag}</span>
                  <h4 className="font-semibold text-gray-800 mt-2 mb-1">{c.title}</h4>
                  <p className="text-sm text-gray-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">最新资讯</h2>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="border-b pb-3 mb-3">
                <span className="text-xs text-primary font-semibold">公告</span>
              </div>
              {notices.map(n => (
                <div key={n.id} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700 truncate">{n.title}</span>
                  <span className="text-xs text-gray-400 ml-3 shrink-0">{n.date}</span>
                </div>
              ))}
              <div className="border-b pb-3 my-3">
                <span className="text-xs text-secondary font-semibold">新闻</span>
              </div>
              {newsList.slice(0, 4).map(n => (
                <div key={n.id} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700 truncate">{n.title}</span>
                  <span className="text-xs text-gray-400 ml-3 shrink-0">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 mt-12 mb-6">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">立即咨询</h3>
              <p className="text-white/80 mb-4">添加微信客服，免费获取店铺估价和交易方案</p>
              <div className="flex items-center gap-4">
                <div className="bg-white text-primary px-6 py-3 rounded-full font-semibold text-lg">scmsj601</div>
                <span className="text-white/60 text-sm">微信扫码添加</span>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/qrcode.jpg" alt="微信二维码 scmsj601" className="w-32 h-32 rounded-xl bg-white p-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        <div className="flex items-center">
          <Link to="/" className="flex-1 flex flex-col items-center py-2 text-primary"><span className="text-xs">首页</span></Link>
          <Link to="/list" className="flex-1 flex flex-col items-center py-2 text-gray-500"><span className="text-xs">选店铺</span></Link>
          <Link to="/pricing" className="flex-1 flex flex-col items-center py-2 text-gray-500"><span className="text-xs">价格</span></Link>
          <a href="#contact" className="flex-1 flex flex-col items-center py-2 text-gray-500"><span className="text-xs">联系客服</span></a>
        </div>
      </div>
    </div>
  )
}
