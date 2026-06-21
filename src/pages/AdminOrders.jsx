const mockOrders = [
  { id: 'SC20260621001', store: '华北五钻3C数码淘宝店', buyer: '张先生', amount: 2000, status: '已完成', date: '2026-06-20' },
  { id: 'SC20260620002', store: '武汉天猫旗舰店新店', buyer: '李女士', amount: 20000, status: '处理中', date: '2026-06-19' },
  { id: 'SC20260618003', store: '抖音小店美妆急转', buyer: '王先生', amount: 15000, status: '待付款', date: '2026-06-18' },
  { id: 'SC20260617004', store: '京东自营家居馆', buyer: '赵女士', amount: 55000, status: '已完成', date: '2026-06-17' },
  { id: 'SC20260615005', store: '天猫食品旗舰店', buyer: '刘先生', amount: 18000, status: '已完成', date: '2026-06-15' },
  { id: 'SC20260614006', store: '淘宝全球购法国美妆', buyer: '陈女士', amount: 28000, status: '处理中', date: '2026-06-14' },
]

const statusColors = {
  '已完成': 'bg-green-100 text-green-600',
  '处理中': 'bg-blue-100 text-blue-600',
  '待付款': 'bg-orange-100 text-orange-600',
}

export default function AdminOrders() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">订单管理</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { l: '总订单', v: 126 },
          { l: '已完成', v: 98 },
          { l: '处理中', v: 15 },
          { l: '待付款', v: 13 },
        ].map(s => (
          <div key={s.l} className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{s.v}</div>
            <div className="text-xs text-gray-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">订单编号</th>
                <th className="text-left px-4 py-3 font-medium">店铺</th>
                <th className="text-left px-4 py-3 font-medium">买家</th>
                <th className="text-right px-4 py-3 font-medium">金额</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-left px-4 py-3 font-medium">日期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{o.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-xs">{o.store}</td>
                  <td className="px-4 py-3 text-gray-600">{o.buyer}</td>
                  <td className="px-4 py-3 text-right font-semibold">¥{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                  <td className="px-4 py-3 text-gray-400">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
