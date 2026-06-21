import { Link } from 'react-router-dom'

const services = [
  {
    name: '淘宝店铺转让',
    desc: '淘宝个人店/企业店转让服务',
    items: [
      { level: '钻级店铺', price: '500 - 5,000', note: '一钻至五钻' },
      { level: '皇冠店铺', price: '5,000 - 30,000', note: '一皇冠至五金冠' },
      { level: '全球购店铺', price: '20,000 - 80,000', note: '全球购认证' },
    ]
  },
  {
    name: '天猫店铺转让',
    desc: '天猫旗舰店/专营店/专卖店转让',
    items: [
      { level: '天猫新店', price: '5,000 - 15,000', note: '全新无经营记录' },
      { level: '天猫专营店', price: '15,000 - 50,000', note: '有经营数据' },
      { level: '天猫旗舰店', price: '30,000 - 200,000', note: 'R标优质店铺' },
    ]
  },
  {
    name: '京东店铺转让',
    desc: '京东POP/自营店铺转让',
    items: [
      { level: '京东POP店', price: '10,000 - 50,000', note: '专营店/旗舰店' },
      { level: '京东自营', price: '50,000 - 300,000', note: '自营店铺稀缺' },
      { level: '京东国际', price: '80,000 - 500,000', note: '跨境类目' },
    ]
  },
  {
    name: '抖音小店转让',
    desc: '抖音小店/橱窗转让',
    items: [
      { level: '抖音个人店', price: '3,000 - 10,000', note: '基础店铺' },
      { level: '抖音专营店', price: '10,000 - 30,000', note: '有粉丝基础' },
      { level: '抖音直播店', price: '15,000 - 80,000', note: '已开通直播+橱窗' },
    ]
  },
]

const extraServices = [
  { name: '店铺估价', price: '免费', desc: '提交店铺信息，专业团队免费评估' },
  { name: '过户代办', price: '300 - 1,000', desc: '营业执照/商标/支付宝全流程过户' },
  { name: '入驻服务', price: '详询', desc: '天猫/京东/抖音等平台入驻代办' },
  { name: '法务咨询', price: '200/次', desc: '店铺交易相关问题法律咨询' },
]

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>价格板块</span></div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">价格板块</h1>
      <p className="text-gray-500 text-sm text-center mb-8">透明定价，无隐藏费用 · 微信：scmsj601</p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {services.map(srv => (
          <div key={srv.name} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-5">
              <h3 className="text-lg font-bold">{srv.name}</h3>
              <p className="text-white/70 text-sm mt-1">{srv.desc}</p>
            </div>
            <div className="p-5 space-y-3">
              {srv.items.map(item => (
                <div key={item.level} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-800">{item.level}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold text-lg">{item.price}</div>
                    <div className="text-xs text-gray-400">元</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">增值服务</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {extraServices.map(es => (
          <div key={es.name} className="bg-white rounded-xl p-5 shadow-sm border text-center hover:shadow-md transition-all">
            <h4 className="font-semibold text-gray-800 mb-2">{es.name}</h4>
            <div className="text-2xl font-bold text-primary mb-1">{es.price}</div>
            {es.price!=='详询' && <div className="text-xs text-gray-400">元</div>}
            <p className="text-xs text-gray-500 mt-3">{es.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
        <h3 className="text-xl font-bold mb-3">价格透明 · 拒绝套路</h3>
        <p className="text-white/70 mb-4">所有费用明码标价，无隐藏收费。具体价格以店铺实际情况为准。</p>
        <div className="inline-flex items-center gap-4">
          <span className="bg-white text-primary px-6 py-2.5 rounded-full font-semibold">微信：scmsj601</span>
          <img src="/qrcode.jpg" alt="二维码" className="w-16 h-16 rounded-lg bg-white p-1" />
        </div>
      </div>
    </div>
  )
}
