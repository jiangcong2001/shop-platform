import { Link } from 'react-router-dom'

const services = [
  { name: '淘宝店铺', desc: '个人店/企业店/全球购', items: [
    { l: '钻级店铺', p: '500 - 5,000', n: '一钻至五钻' },
    { l: '皇冠店铺', p: '5,000 - 30,000', n: '一皇冠至五金冠' },
    { l: '全球购', p: '20,000 - 80,000', n: '全球购认证店铺' },
  ]},
  { name: '天猫店铺', desc: '旗舰店/专营店/专卖店', items: [
    { l: '天猫新店', p: '5,000 - 15,000', n: '全新无经营记录' },
    { l: '天猫专营店', p: '15,000 - 50,000', n: '有经营数据沉淀' },
    { l: '天猫旗舰店', p: '30,000 - 200,000', n: 'R标优质店铺' },
  ]},
  { name: '京东店铺', desc: 'POP/自营/国际', items: [
    { l: '京东POP店', p: '10,000 - 50,000', n: '专营店/旗舰店' },
    { l: '京东自营', p: '50,000 - 300,000', n: '自营店铺稀缺资源' },
    { l: '京东国际', p: '80,000 - 500,000', n: '跨境类目店铺' },
  ]},
  { name: '抖音小店', desc: '小店/橱窗/直播', items: [
    { l: '个人店', p: '3,000 - 10,000', n: '基础店铺起步' },
    { l: '专营店', p: '10,000 - 30,000', n: '有粉丝基础' },
    { l: '直播店', p: '15,000 - 80,000', n: '已开通直播+橱窗' },
  ]},
]

const extras = [
  { n: '店铺估价', p: '免费', d: '提交信息，专业团队免费评估' },
  { n: '过户代办', p: '300-1,000', d: '执照/商标/支付宝全流程' },
  { n: '入驻服务', p: '详询', d: '天猫/京东/抖音入驻代办' },
  { n: '法务咨询', p: '200/次', d: '交易相关法律咨询' },
]

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">价格板块</span></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">价格板块</h1>
      <p className="text-gray-500 text-center mb-10">透明定价 · 无隐藏费用 · 微信 scmsj601</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {services.map(srv => (
          <div key={srv.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <h3 className="text-xl font-bold">{srv.name}</h3>
              <p className="text-white/70 text-sm mt-1">{srv.desc}</p>
            </div>
            <div className="p-6 space-y-4">
              {srv.items.map(item => (
                <div key={item.l} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div><div className="font-semibold text-gray-800">{item.l}</div><div className="text-xs text-gray-400 mt-1">{item.n}</div></div>
                  <div className="text-right"><div className="text-red-600 font-bold text-lg">{item.p}</div><div className="text-xs text-gray-400">元</div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">增值服务</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {extras.map(es => (
          <div key={es.n} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all">
            <h4 className="font-bold text-gray-800 mb-3">{es.n}</h4>
            <div className="text-2xl font-bold text-red-600 mb-1">{es.p}</div>
            {es.p!=='详询'&&<div className="text-xs text-gray-400">元</div>}
            <p className="text-xs text-gray-500 mt-3">{es.d}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">价格透明，拒绝套路</h3>
        <p className="text-white/60 mb-6">所有费用明码标价，具体价格以店铺实际情况为准</p>
        <div className="inline-flex items-center gap-4 bg-white/10 rounded-2xl px-6 py-3">
          <span className="text-white font-bold text-lg">微信：scmsj601</span>
          <img src="/qrcode.jpg" alt="二维码" className="w-12 h-12 rounded-lg bg-white p-1" />
        </div>
      </div>
    </div>
  )
}
