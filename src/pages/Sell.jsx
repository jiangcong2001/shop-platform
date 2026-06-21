import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Sell() {
  const { submitSellRequest } = useAuth()
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    platform: '淘宝', category: '', level: '一钻', rating: '99',
    price: '', phone: '', desc: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.phone || !form.price) return
    submitSellRequest(form)
    setDone(true)
  }

  if (done) {
    return (
      <div className="w-full px-4 py-8 mx-auto text-center" style={{ maxWidth: '500px' }}>
        <div className="bg-white rounded-2xl border p-8">
          <div className="text-4xl mb-3">&#10003;</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">提交成功</h1>
          <p className="text-gray-500 text-sm mb-5">客服 scmsj601 将尽快联系您，请保持手机畅通</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setDone(false); setForm({ platform:'淘宝', category:'', level:'一钻', rating:'99', price:'', phone:'', desc:'' }) }} className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50">继续提交</button>
            <Link to="/" className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm hover:bg-red-700">返回首页</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-red-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">出售店铺</span>
      </div>

      <div className="bg-white rounded-2xl border p-6 md:p-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">出售店铺</h1>
        <p className="text-gray-500 text-sm mb-6">填写信息后客服将在1小时内联系您</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">平台</label>
              <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none">
                <option>淘宝</option><option>天猫</option><option>京东</option><option>抖音</option><option>其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">等级</label>
              <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none">
                <option>一钻</option><option>二钻</option><option>三钻</option><option>四钻</option><option>五钻</option>
                <option>皇冠</option><option>旗舰店</option><option>专营店</option><option>全球购</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">类目</label>
            <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              placeholder="如：服饰鞋包、3C数码" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">期望价格 (元)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="如：5000" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">好评率 (%)</label>
              <input type="number" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}
                placeholder="如：99" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              手机号 <span className="text-red-500">*</span>
            </label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="请输入您的手机号" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">补充说明</label>
            <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
              rows={3} placeholder="补充描述店铺情况..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-red-600/20 focus:outline-none" />
          </div>

          <button type="submit"
            className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors">
            提交信息
          </button>
          <p className="text-xs text-gray-400 text-center">客服微信 scmsj601 | 免费估价</p>
        </form>
      </div>
    </div>
  )
}
