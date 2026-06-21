const mockUsers = [
  { id: 1, username: 'admin', name: '管理员', role: '超级管理员', phone: '138****8888', created: '2026-01-01' },
  { id: 2, username: 'kf001', name: '张客服', role: '客服', phone: '139****0001', created: '2026-03-15' },
  { id: 3, username: 'kf002', name: '李顾问', role: '销售顾问', phone: '139****0002', created: '2026-04-20' },
]

export default function AdminUsers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">用户管理</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">+ 添加用户</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">用户名</th>
                <th className="text-left px-4 py-3 font-medium">姓名</th>
                <th className="text-left px-4 py-3 font-medium">角色</th>
                <th className="text-left px-4 py-3 font-medium">手机</th>
                <th className="text-left px-4 py-3 font-medium">创建时间</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockUsers.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{u.username}</td>
                  <td className="px-4 py-3 text-gray-600">{u.name}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded">{u.role}</span></td>
                  <td className="px-4 py-3 text-gray-500">{u.phone}</td>
                  <td className="px-4 py-3 text-gray-400">{u.created}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-500 hover:text-blue-700 text-xs mr-2">编辑</button>
                    <button className="text-red-500 hover:text-red-700 text-xs">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
