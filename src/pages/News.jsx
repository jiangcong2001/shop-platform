import { Link } from 'react-router-dom'
import { newsList } from '../data/news'

export default function News() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>新闻资讯</span></div>
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">新闻资讯</h1>
        <div className="space-y-3">
          {newsList.map(n=><div key={n.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 cursor-pointer hover:text-primary"><span className="font-medium text-gray-800">{n.title}</span><span className="text-xs text-gray-400 ml-3 shrink-0">{n.date}</span></div>)}
        </div>
      </div>
    </div>
  )
}
