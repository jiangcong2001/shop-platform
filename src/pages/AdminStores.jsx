import { useState } from 'react'
import stores from '../data/stores'
import { platformIcons } from '../data/news'

export default function AdminStores() {
  const [list, setList] = useState(stores)
  const [showAdd, setShowAdd] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ name:'', platform:'淘宝', category:'', price:'', rating:'99', level:'', region:'华北', type:'', desc:'' })

  const toggleStatus = (id) => {
    setList(prev => prev.map(s => s.id===id ? {...s, tags: s.tags.includes('下架') ? s.tags.filter(t=>t!=='下架') : [...s.tags, '下架']} : s))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const s = { ...form, price: parseInt(form.price)||0, rating: parseInt(form.rating), id: Date.now(), tags: [], wechat: 'scmsj601' }
    setList(prev => [s, ...prev])
    setShowAdd(false)
    setForm({ name:'', platform:'淘宝', category:'', price:'', rating:'99', level:'', region:'华北', type:'', desc:'' })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setList(prev => prev.map(s => s.id===edit.id ? { ...edit, price: parseInt(edit.price)||0, rating: parseInt(edit.rating) } : s))
    setEdit(null)
  }

  const startEdit = (s) => { setEdit(s); setShowAdd(false) }

  const FormFields = ({ data, setData }) => (
    <div className="grid md:grid-cols-2 gap-3 text-sm">
      <div><label className="block text-gray-600 mb-0.5">店铺名称</label><input value={data.name} onChange={e=>setData({...data,name:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" required /></div>
      <div><label className="block text-gray-600 mb-0.5">平台</label><select value={data.platform} onChange={e=>setData({...data,platform:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm"><option>淘宝</option><option>天猫</option><option>京东</option><option>抖音</option><option>其他</option></select></div>
      <div><label className="block text-gray-600 mb-0.5">类目</label><input value={data.category} onChange={e=>setData({...data,category:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
      <div><label className="block text-gray-600 mb-0.5">价格(元)</label><input type="number" value={data.price} onChange={e=>setData({...data,price:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
      <div><label className="block text-gray-600 mb-0.5">好评率(%)</label><input type="number" value={data.rating} onChange={e=>setData({...data,rating:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
      <div><label className="block text-gray-600 mb-0.5">等级</label><input value={data.level} onChange={e=>setData({...data,level:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
      <div><label className="block text-gray-600 mb-0.5">地区</label><select value={data.region} onChange={e=>setData({...data,region:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm"><option>华北</option><option>华东</option><option>华南</option><option>华中</option><option>西南</option></select></div>
      <div><label className="block text-gray-600 mb-0.5">类型</label><input value={data.type} onChange={e=>setData({...data,type:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
      <div className="md:col-span-2"><label className="block text-gray-600 mb-0.5">描述</label><textarea value={data.desc} onChange={e=>setData({...data,desc:e.target.value})} rows={2} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">店铺管理</h1>
        <button onClick={() => { setShowAdd(!showAdd); setEdit(null) }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark">
          {showAdd ? '取消' : '+ 添加店铺'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
          <h3 className="font-semibold mb-4">添加新店铺</h3>
          <form onSubmit={handleAdd}>
            <FormFields data={form} setData={setForm} />
            <button type="submit" className="mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary-dark">确认添加</button>
          </form>
        </div>
      )}

      {edit && (
        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
          <h3 className="font-semibold mb-4">编辑店铺</h3>
          <form onSubmit={handleEdit}>
            <FormFields data={edit} setData={setEdit} />
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary-dark">保存修改</button>
              <button type="button" onClick={() => setEdit(null)} className="border px-6 py-2 rounded-lg text-sm text-gray-500">取消</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">店铺名称</th>
                <th className="text-left px-4 py-3 font-medium">平台</th>
                <th className="text-left px-4 py-3 font-medium">类目</th>
                <th className="text-right px-4 py-3 font-medium">价格</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(s => {
                const icon = platformIcons[s.platform] || { bg: 'bg-gray-500', text: s.platform }
                const down = s.tags.includes('下架')
                return (
                  <tr key={s.id} className={`hover:bg-gray-50 ${down ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 truncate max-w-xs">{s.name}</div>
                    </td>
                    <td className="px-4 py-3"><span className={`${icon.bg} text-white text-xs px-2 py-0.5 rounded`}>{icon.text}</span></td>
                    <td className="px-4 py-3 text-gray-600">{s.category}</td>
                    <td className="px-4 py-3 text-right font-semibold">¥{s.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${down ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {down ? '已下架' : '上架中'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => startEdit(s)} className="text-blue-500 hover:text-blue-700 text-xs mr-2">编辑</button>
                      <button onClick={() => toggleStatus(s.id)} className={`text-xs ${down ? 'text-green-500' : 'text-red-500'}`}>
                        {down ? '上架' : '下架'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
