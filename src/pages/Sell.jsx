import { Link } from 'react-router-dom'

export default function Sell() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">出售店铺</span></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">出售店铺</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <form onSubmit={e=>{e.preventDefault();alert('提交成功！客服scmsj601将尽快联系您。')}}>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">电商平台</label><select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20"><option>淘宝</option><option>天猫</option><option>京东</option><option>抖音</option><option>其他</option></select></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">店铺类目</label><input type="text" placeholder="如：服饰鞋包" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">店铺等级</label><select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20"><option>一钻</option><option>二钻</option><option>三钻</option><option>四钻</option><option>五钻</option><option>皇冠</option><option>旗舰店</option><option>专营店</option></select></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">好评率</label><input type="text" placeholder="如：99%" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">期望价格</label><input type="text" placeholder="请输入期望价格" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">手机号码</label><input type="tel" placeholder="请输入手机号" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20" /></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-semibold text-gray-700 mb-2">补充说明</label><textarea rows={3} placeholder="补充描述店铺情况..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/20" /></div>
          <button type="submit" className="w-full mt-6 bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors">提交信息</button>
          <p className="text-xs text-gray-400 text-center mt-3">提交后客服 scmsj601 将在1小时内联系您</p>
        </form>
      </div>
    </div>
  )
}
