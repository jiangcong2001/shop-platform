import { Link } from 'react-router-dom'
import stores from '../data/stores'

export default function AdminDashboard() {
  const total = stores.length
  const totalValue = stores.reduce((s, x) => s + x.price, 0)
  const byPlatform = {}
  stores.forEach(s => { byPlatform[s.platform] = (byPlatform[s.platform] || 0) + 1 })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">控制台</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: '店铺总数', value: total, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '上架中', value: total, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '今日咨询', value: 128, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: '成交总额', value: `¥${(totalValue/10000).toFixed(0)}万`, color: 'text-primary', bg: 'bg-primary-light' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-5`}>
            <div className="text-sm text-gray-500 mb-1">{s.label}</div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold text-gray-800 mb-4">各平台店铺分布</h3>
          <div className="space-y-3">
            {Object.entries(byPlatform).map(([k, v]) => (
              <div key={k} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16">{k}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${(v/total*100)}%` }}></div>
                </div>
                <span className="text-sm text-gray-500">{v}家</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold text-gray-800 mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '添加店铺', to: '/admin/stores' },
              { label: '查看订单', to: '/admin/orders' },
              { label: '用户管理', to: '/admin/users' },
              { label: '返回网站', to: '/' },
            ].map(a => (
              <Link key={a.label} to={a.to} className="border rounded-lg p-4 text-center hover:border-primary hover:text-primary transition-colors">
                <div className="font-medium text-sm">{a.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
