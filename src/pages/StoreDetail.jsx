import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import stores from '../data/stores'
import { platformIcons } from '../data/news'
import { useAuth } from '../AuthContext'

export default function StoreDetail() {
  const { id } = useParams()
  const s = stores.find(x => x.id === parseInt(id))
  const { user, buyStore } = useAuth()
  const [msg, setMsg] = useState('')

  if (!s) return <div className="text-center py-20"><h2 className="font-bold mb-4">店铺不存在</h2><Link to="/list" className="text-red-600">返回列表</Link></div>

  const icon = platformIcons[s.platform] || { bg: 'bg-gray-400', text: s.platform }
  const f = s.price>=10000?`${(s.price/10000).toFixed(1)}万`:`${s.price}元`

  const handleBuy = () => {
    if (!user) { setMsg('请先登录'); return }
    const r = buyStore(s)
    setMsg(r.ok ? '购买成功！请查看我的账户' : r.error)
  }

  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '1024px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><Link to="/list" className="hover:text-red-600">列表</Link><span className="mx-2">/</span><span className="text-gray-600">{s.name.slice(0,15)}...</span></div>

      <div className="bg-white rounded-2xl border p-8">
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

        <div className="mb-8"><h3 className="font-bold text-gray-800 mb-3">店铺描述</h3><p className="text-gray-600">{s.desc}</p></div>

        <div className="flex items-center justify-between border-t pt-6">
          <div><div className="text-sm text-gray-400 mb-1">店铺价格</div><div className="text-3xl font-bold text-red-600">{f}<span className="text-base font-normal text-gray-400">元</span></div></div>
          <div className="flex gap-3">
            <button onClick={handleBuy} className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">立即购买</button>
          </div>
        </div>
        {msg && <p className={`mt-4 text-sm ${msg.includes('成功')?'text-green-600':'text-red-500'}`}>{msg}</p>}
      </div>
    </div>
  )
}

