import { platformIcons } from '../data/news'

export default function StoreCard({ store }) {
  const icon = platformIcons[store.platform] || { bg: 'bg-gray-500', text: store.platform }
  const f = store.price >= 10000 ? `${(store.price/10000).toFixed(1)}万` : store.price.toLocaleString()

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`${icon.bg} text-white text-xs px-2 py-0.5 rounded`}>{icon.text}</span>
        {store.level && <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{store.level}</span>}
        {store.tags.map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">{t}</span>)}
      </div>
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{store.name}</h3>
      <div className="flex gap-3 text-xs text-gray-400 mb-2">
        <span>类目:{store.category}</span>
        <span>好评:{store.rating}%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">{f}<span className="text-xs font-normal text-gray-400">元</span></span>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">微信咨询</span>
      </div>
    </div>
  )
}
