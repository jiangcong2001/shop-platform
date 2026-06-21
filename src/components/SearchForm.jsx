import { useState } from 'react'

export default function SearchForm() {
  const [platform, setPlatform] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`提交成功！专属顾问将尽快联系您。\n平台：${platform}\n电话：${phone}`)
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-bold text-lg mb-4 text-center">快速发布需求</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-white/20 text-white rounded-lg px-3 py-2.5 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40">
          <option value="" disabled className="text-gray-900">选择电商平台</option>
          <option className="text-gray-900">淘宝</option>
          <option className="text-gray-900">天猫</option>
          <option className="text-gray-900">京东</option>
          <option className="text-gray-900">抖音</option>
          <option className="text-gray-900">其他</option>
        </select>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号码" className="w-full bg-white/20 text-white rounded-lg px-3 py-2.5 text-sm border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40" />
        <button type="submit" className="w-full bg-white text-red-600 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">提交需求</button>
        <p className="text-white/50 text-xs text-center">提交后专属顾问将联系您</p>
      </form>
    </div>
  )
}
