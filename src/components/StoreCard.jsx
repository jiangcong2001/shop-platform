import { platformIcons } from '../data/news'

export default function StoreCard({ store }) {
  const icon = platformIcons[store.platform] || { bg: 'bg-gray-400', text: store.platform }
  const f = store.price >= 10000 ? `${(store.price/10000).toFixed(1)}万` : store.price.toLocaleString()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <span className={`${icon.bg} text-white text-xs px-2.5 py-1 rounded-md font-medium`}>{icon.text}</span>
        {store.level && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{store.level}</span>}
        {store.tags.slice(0, 1).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">{t}</span>)}
      </div>
      <h3 className="text-sm font-medium text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
        {store.name}
      </h3>
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
        <span>类目 {store.category}</span>
        <span>好评 {store.rating}%</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xl font-bold text-red-600">{f}<span className="text-xs font-normal text-gray-400 ml-0.5">元</span></span>
        <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium group-hover:bg-red-600 group-hover:text-white transition-colors">咨询</span>
      </div>
    </div>
  )
}
