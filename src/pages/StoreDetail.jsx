import { useParams, Link } from 'react-router-dom'
import stores from '../data/stores'
import { platformIcons } from '../data/news'

export default function StoreDetail() {
  const { id } = useParams()
  const s = stores.find(x => x.id === parseInt(id))
  if (!s) return <div className="max-w-4xl mx-auto px-6 py-20 text-center"><h2 className="text-xl font-bold mb-4">店铺不存在</h2><Link to="/list" className="text-red-600 hover:underline">返回列表</Link></div>

  const icon = platformIcons[s.platform] || { bg: 'bg-gray-400', text: s.platform }
  const f = s.price>=10000?`${(s.price/10000).toFixed(1)}万`:`${s.price}元`

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><Link to="/list" className="hover:text-red-600">列表</Link><span className="mx-2">/</span><span className="text-gray-600">{s.name.slice(0,15)}...</span></div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`${icon.bg} text-white text-sm px-3 py-1 rounded-md font-medium`}>{icon.text}</span>
          {s.level&&<span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">{s.level}</span>}
          {s.tags.map(t=><span key={t} className="text-sm px-3 py-1 rounded-md bg-amber-50 text-amber-600 font-medium">{t}</span>)}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">{s.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
          {[{l:'所属平台',v:s.platform},{l:'店铺类目',v:s.category},{l:'所在地区',v:s.region},{l:'店铺类型',v:s.type},{l:'店铺等级',v:s.level},{l:'好评率',v:s.rating+'%'}].map(i=>
            <div key={i.l}><div className="text-xs text-gray-400 mb-1">{i.l}</div><div className="font-semibold text-gray-800 text-lg">{i.v}</div></div>
          )}
        </div>

        <div className="mb-8"><h3 className="font-bold text-gray-800 mb-3">店铺描述</h3><p className="text-gray-600 leading-relaxed">{s.desc}</p></div>

        <div className="flex items-center justify-between border-t pt-6">
          <div><div className="text-sm text-gray-400 mb-1">店铺价格</div><div className="text-3xl font-bold text-red-600">{f}<span className="text-base font-normal text-gray-400">元</span></div></div>
          <div className="flex gap-3">
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors">微信咨询 scmsj601</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-900 rounded-2xl p-8 text-white">
        <h3 className="font-bold text-lg mb-4">联系客服</h3>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div><span className="text-gray-400">微信客服</span><p className="text-red-400 font-bold mt-1">scmsj601</p></div>
          <div><span className="text-gray-400">工作时间</span><p className="mt-1">9:00 - 18:00</p></div>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-800">
          <img src="/qrcode.jpg" alt="二维码" className="w-16 h-16 rounded-lg bg-white p-1" />
          <span className="text-gray-400 text-sm">微信扫码添加好友</span>
        </div>
      </div>
    </div>
  )
}
