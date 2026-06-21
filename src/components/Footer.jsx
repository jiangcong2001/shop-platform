import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="font-bold text-xl text-white">网店转让</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">淘宝 / 天猫 / 京东 / 抖音店铺转让平台<br/>12年深耕 · 500+团队 · 10万+客户</p>
            <div className="flex items-center gap-3">
              <img src="/qrcode.jpg" alt="微信二维码" className="w-20 h-20 rounded-lg bg-white p-1" />
              <div>
                <p className="text-xs text-gray-500 mb-1">微信扫码咨询</p>
                <p className="text-white font-medium">scmsj601</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">平台服务</h4>
            <div className="space-y-2 text-sm">
              <Link to="/list" className="block hover:text-white transition-colors">购买店铺</Link>
              <Link to="/sell" className="block hover:text-white transition-colors">出售店铺</Link>
              <Link to="/pricing" className="block hover:text-white transition-colors">价格板块</Link>
              <Link to="/recharge" className="block hover:text-white transition-colors">充值中心</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">电商平台</h4>
            <div className="space-y-2 text-sm">
              <Link to="/list/淘宝" className="block hover:text-white transition-colors">淘宝店铺</Link>
              <Link to="/list/天猫" className="block hover:text-white transition-colors">天猫店铺</Link>
              <Link to="/list/京东" className="block hover:text-white transition-colors">京东店铺</Link>
              <Link to="/list/抖音" className="block hover:text-white transition-colors">抖音小店</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">关于我们</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:text-white transition-colors">公司介绍</Link>
              <Link to="/news" className="block hover:text-white transition-colors">新闻资讯</Link>
              <Link to="/service" className="block hover:text-white transition-colors">入驻服务</Link>
              <Link to="/login" className="block hover:text-white transition-colors">管理后台</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>网店转让平台 版权所有 2012-2026 蜀ICP备2022003681号-2</span>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white">关于我们</Link>
            <Link to="/news" className="hover:text-white">新闻资讯</Link>
            <span className="hover:text-white cursor-pointer">投诉建议</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
