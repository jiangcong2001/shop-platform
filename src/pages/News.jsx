import { Link } from 'react-router-dom'
import { newsList, notices, cases } from '../data/news'

export default function News() {
  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto" style={{ maxWidth: '900px' }}>
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">新闻资讯</span></div>
      <div className="bg-white rounded-2xl border p-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">新闻资讯</h1>

        <h3 className="font-bold text-lg text-red-600 mb-4">平台公告</h3>
        <div className="space-y-3 mb-8">
          {notices.map(n => <div key={n.id} className="flex justify-between py-2 border-b border-gray-50 text-sm"><span className="text-gray-700">{n.title}</span><span className="text-gray-400">{n.date}</span></div>)}
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-4">行业新闻</h3>
        <div className="space-y-3 mb-8">
          {newsList.map(n => <div key={n.id} className="flex justify-between py-2 border-b border-gray-50 text-sm"><span className="text-gray-700">{n.title}</span><span className="text-gray-400">{n.date}</span></div>)}
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-4">成功案例</h3>
        <div className="space-y-3">
          {cases.map(c => <div key={c.id} className="py-2 border-b border-gray-50"><span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">{c.tag}</span><span className="text-gray-700 text-sm ml-2">{c.title}</span></div>)}
        </div>
      </div>
    </div>
  )
}
