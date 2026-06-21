import { useParams, Link } from 'react-router-dom'
import stores from '../data/stores'
import { platformIcons } from '../data/news'

export default function StoreDetail() {
  const { id } = useParams()
  const s = stores.find(x => x.id === parseInt(id))
  if (!s) return <div className="max-w-3xl mx-auto px-4 py-20 text-center"><h2 className="text-xl font-bold mb-4">店铺不存在</h2><Link to="/list" className="text-primary">返回列表</Link></div>

  const icon = platformIcons[s.platform] || { bg: 'bg-gray-500', text: s.platform }
  const f = s.price>=10000?`${(s.price/10000).toFixed(1)}万`:`${s.price}元`

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><Link to="/list" className="hover:text-primary">列表</Link><span className="mx-2">/</span><span>{s.name.slice(0,15)}...</span></div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`${icon.bg} text-white text-sm px-3 py-1 rounded`}>{icon.text}</span>
          {s.level&&<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{s.level}</span>}
          {s.tags.map(t=><span key={t} className="text-sm px-2 py-1 rounded bg-amber-100 text-amber-700">{t}</span>)}
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-6">{s.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
          {[{l:'平台',v:s.platform},{l:'类目',v:s.category},{l:'地区',v:s.region},{l:'类型',v:s.type},{l:'等级',v:s.level},{l:'好评',v:s.rating+'%'}].map(i=>
            <div key={i.l}><div className="text-xs text-gray-400 mb-1">{i.l}</div><div className="font-semibold">{i.v}</div></div>
          )}
        </div>

        <div className="mb-8"><h3 className="font-semibold mb-2">店铺描述</h3><p className="text-gray-600">{s.desc}</p></div>

        <div className="flex items-center justify-between border-t pt-6">
          <div><div className="text-sm text-gray-400 mb-1">价格</div><div className="text-3xl font-bold text-primary">{f}<span className="text-base font-normal text-gray-400">元</span></div></div>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600">微信咨询 scmsj601</button>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <h3 className="font-semibold mb-4">联系客服</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-400">微信</span><p className="text-primary font-medium">scmsj601</p></div>
          <div><span className="text-gray-400">工作时间</span><p>9:00 - 18:00</p></div>
          <div className="col-span-2 flex items-center gap-4">
            <img src="/qrcode.jpg" alt="二维码" className="w-20 h-20 rounded-lg bg-white p-1" />
            <span className="text-gray-400 text-xs">微信扫码添加好友</span>
          </div>
        </div>
      </div>
    </div>
  )
}
