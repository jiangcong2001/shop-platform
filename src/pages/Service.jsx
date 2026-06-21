import { Link } from 'react-router-dom'

export default function Service() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-red-600">首页</Link><span className="mx-2">/</span><span className="text-gray-600">入驻服务</span></div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">入驻服务</h1>
        <p className="text-gray-600 text-lg mb-10">提供全平台电商入驻代办服务，提高入驻成功率。</p>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[{n:'天猫入驻',f:['资料审核','品牌评估','资质完善','提交入驻']},{n:'京东入驻',f:['类目匹配','资质准备','审核跟进','店铺开设']},{n:'抖音入驻',f:['账号搭建','资质审核','商品上架','运营指导']},{n:'其他平台',f:['拼多多/小红书','资质准备','店铺搭建','运营培训']}].map(s=>
            <div key={s.n} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
              <h3 className="font-bold text-lg text-gray-800 mb-4">{s.n}</h3>
              <ul className="space-y-2 mb-5">{s.f.map(f=><li key={f} className="text-sm text-gray-500 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>{f}</li>)}</ul>
              <button className="w-full bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">微信咨询 scmsj601</button>
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-gray-800 text-lg mb-6">入驻流程</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {['需求沟通','方案定制','资料准备','提交审核'].map((s,i)=><div key={s} className="text-center"><div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">{i+1}</div><span className="text-sm text-gray-500">{s}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
