import { Link } from 'react-router-dom'

export default function Service() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4"><Link to="/" className="hover:text-primary">首页</Link><span className="mx-2">/</span><span>入驻服务</span></div>
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">入驻服务</h1>
        <p className="text-gray-600 mb-8">提供全平台电商入驻代办服务，提高入驻成功率。</p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[{n:'天猫入驻',f:['资料审核','品牌评估','资质完善','提交入驻']},{n:'京东入驻',f:['类目匹配','资质准备','审核跟进','店铺开设']},{n:'抖音入驻',f:['账号搭建','资质审核','商品上架','运营指导']},{n:'其他平台',f:['拼多多/小红书等','资质准备','店铺搭建','运营培训']}].map(s=>
            <div key={s.n} className="border rounded-xl p-5 hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">{s.n}</h3>
              <ul className="space-y-1 mb-3">{s.f.map(f=><li key={f} className="text-sm text-gray-500">· {f}</li>)}</ul>
              <button className="w-full bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary-dark">微信咨询 scmsj601</button>
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="font-semibold mb-3">入驻流程</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {['需求沟通','方案定制','资料准备','提交审核'].map((s,i)=><div key={s} className="text-center"><div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-1 font-bold text-sm">{i+1}</div><span className="text-xs text-gray-500">{s}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
