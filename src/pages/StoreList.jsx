import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import StoreCard from '../components/StoreCard'
import stores, { platforms, categories, regions, priceRanges } from '../data/stores'

export default function StoreList() {
  const { platform: urlPlatform } = useParams()
  const [f, setF] = useState({ platform: urlPlatform || '全部', category: '全部', region: '全部', price: '全部', kw: '' })

  const filtered = useMemo(() => stores.filter(s => {
    if (f.platform !== '全部' && s.platform !== f.platform) return false
    if (f.category !== '全部' && s.category !== f.category) return false
    if (f.region !== '全部' && s.region !== f.region) return false
    if (f.price !== '全部') {
      const r = priceRanges.find(x => x.label === f.price)
      if (r && (s.price < r.min || s.price >= r.max)) return false
    }
    if (f.kw && !s.name.includes(f.kw) && !s.category.includes(f.kw)) return false
    return true
  }), [f])

  const Btn = ({ opts, val, onChange }) => (
    <div className="flex flex-wrap gap-1.5">{opts.map(o =>
      <button key={o} onClick={() => onChange(o)} className={`text-xs px-3 py-1.5 rounded-full font-medium ${val===o?'bg-red-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o}</button>
    )}</div>
  )

  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '1280px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">{f.platform!=='全部'?f.platform+'店铺':'全部店铺'}</span></div>

      <div className="bg-white rounded-2xl border p-4 mb-4 flex gap-3">
        <input value={f.kw} onChange={e=>setF({...f,kw:e.target.value})} placeholder="搜索店铺名称或类目..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20" />
        <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700">搜索</button>
      </div>

      <div className="bg-white rounded-2xl border p-5 space-y-3 mb-8">
        <div className="flex items-start gap-2"><span className="text-xs font-medium text-gray-400 w-8 shrink-0 pt-1">平台</span><Btn opts={platforms} val={f.platform} onChange={v=>setF({...f,platform:v})} /></div>
        <div className="flex items-start gap-2"><span className="text-xs font-medium text-gray-400 w-8 shrink-0 pt-1">类目</span><Btn opts={categories} val={f.category} onChange={v=>setF({...f,category:v})} /></div>
        <div className="flex items-start gap-2"><span className="text-xs font-medium text-gray-400 w-8 shrink-0 pt-1">地区</span><Btn opts={regions} val={f.region} onChange={v=>setF({...f,region:v})} /></div>
        <div className="flex items-start gap-2"><span className="text-xs font-medium text-gray-400 w-8 shrink-0 pt-1">价格</span><Btn opts={priceRanges.map(r=>r.label)} val={f.price} onChange={v=>setF({...f,price:v})} /></div>
      </div>

      <div className="flex justify-between mb-6">
        <h2 className="text-lg font-bold">共 <span className="text-red-600">{filtered.length}</span> 家店铺</h2>
      </div>

      {filtered.length===0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border">暂无符合条件的店铺</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(s=><Link key={s.id} to={`/store/${s.id}`}><StoreCard store={s}/></Link>)}
        </div>
      )}
    </div>
  )
}
