import { useState } from 'react'
import { platforms } from '../data/stores'

export default function SearchForm() {
  const [platform, setPlatform] = useState('请选择')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`提交成功！专属顾问将尽快联系您。\n平台：${platform}\n电话：${phone}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-primary text-white text-center py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors">
          出售网店
        </button>
        <button className="flex-1 border-2 border-primary text-primary text-center py-2.5 rounded-lg font-medium hover:bg-primary-light transition-colors">
          购买网店
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">电商平台</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              <option disabled>请选择</option>
              {platforms.filter(p => p !== '全部').map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">电话号码</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入您的手机号码"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            提交
          </button>
          <p className="text-xs text-gray-400 text-center">提交后，专属顾问将联系您</p>
        </div>
      </form>
    </div>
  )
}
