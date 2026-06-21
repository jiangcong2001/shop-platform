import { Link } from 'react-router-dom'

const services = [
  { name: '淘宝店铺', desc: '个人店/企业店/全球购', items: [
    { l: '钻级店铺', p: '500~5,000' }, { l: '皇冠店铺', p: '5,000~30,000' }, { l: '全球购', p: '20,000~80,000' },
  ]},
  { name: '天猫店铺', desc: '旗舰店/专营店/专卖店', items: [
    { l: '新店', p: '5,000~15,000' }, { l: '专营店', p: '15,000~50,000' }, { l: '旗舰店', p: '30,000~200,000' },
  ]},
  { name: '京东店铺', desc: 'POP/自营/国际', items: [
    { l: 'POP店', p: '10,000~50,000' }, { l: '自营', p: '50,000~300,000' }, { l: '国际', p: '80,000~500,000' },
  ]},
  { name: '抖音小店', desc: '小店/橱窗/直播', items: [
    { l: '个人店', p: '3,000~10,000' }, { l: '专营店', p: '10,000~30,000' }, { l: '直播店', p: '15,000~80,000' },
  ]},
]

export default function Pricing() {
  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '1280px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">价格板块</span></div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">价格板块</h1>
        <p className="text-gray-500">透明定价 · 无隐藏费用</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {services.map(srv => (
          <div key={srv.name} className="bg-white rounded-2xl border overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <h3 className="text-xl font-bold">{srv.name}</h3>
              <p className="text-white/70 text-sm mt-1">{srv.desc}</p>
            </div>
            <div className="p-6 space-y-3">
              {srv.items.map(item => (
                <div key={item.l} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <span className="font-semibold text-gray-800">{item.l}</span>
                  <span className="text-red-600 font-bold">{item.p}<span className="text-xs text-gray-400 font-normal"> 元</span></span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-2">具体价格根据店铺实际情况确定</p>
        <p className="text-red-600 font-bold">微信咨询：scmsj601</p>
      </div>
    </div>
  )
}
