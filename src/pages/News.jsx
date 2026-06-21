import { Link } from 'react-router-dom'
import { newsList } from '../data/news'

export default function News() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">新闻资讯</span></div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">新闻资讯</h1>
        <div className="divide-y divide-gray-50">
          {newsList.map(n=><div key={n.id} className="flex justify-between items-center py-4 cursor-pointer hover:text-red-600 transition-colors"><span className="font-medium text-gray-800">{n.title}</span><span className="text-sm text-gray-400 ml-4 shrink-0">{n.date}</span></div>)}
        </div>
      </div>
    </div>
  )
}
