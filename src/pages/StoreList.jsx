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
      <button key={o} onClick={() => onChange(o)} className={`text-xs px-3 py-1 rounded-full ${val===o?'bg-primary text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{o}</button>
    )}</div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>{f.platform!=='全部'?f.platform+'店铺':'全部店铺'}</span></div>

      <div className="bg-white rounded-xl p-3 shadow-sm border mb-4 flex gap-2">
        <input value={f.kw} onChange={e=>setF({...f,kw:e.target.value})} placeholder="搜索店铺..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm hover:bg-primary-dark">搜索</button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border space-y-3 mb-6">
        <div className="flex items-center gap-2"><span className="text-xs text-gray-400 w-10">平台</span><Btn opts={platforms} val={f.platform} onChange={v=>setF({...f,platform:v})} /></div>
        <div className="flex items-center gap-2"><span className="text-xs text-gray-400 w-10">类目</span><Btn opts={categories} val={f.category} onChange={v=>setF({...f,category:v})} /></div>
        <div className="flex items-center gap-2"><span className="text-xs text-gray-400 w-10">地区</span><Btn opts={regions} val={f.region} onChange={v=>setF({...f,region:v})} /></div>
        <div className="flex items-center gap-2"><span className="text-xs text-gray-400 w-10">价格</span><Btn opts={priceRanges.map(r=>r.label)} val={f.price} onChange={v=>setF({...f,price:v})} /></div>
      </div>

      <div className="flex justify-between mb-4"><h2 className="font-bold text-gray-800">共 <span className="text-primary">{filtered.length}</span> 家</h2></div>
      {filtered.length===0 ? <div className="bg-white rounded-xl py-20 text-center text-gray-400">暂无结果</div> :
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{filtered.map(s=><Link key={s.id} to={`/store/${s.id}`}><StoreCard store={s}/></Link>)}</div>}
    </div>
  )
}
