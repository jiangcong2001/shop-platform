import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="w-full px-4 md:px-8 py-10 mx-auto" style={{ maxWidth: '1280px' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-3">平台服务</h4>
            <div className="space-y-2 text-sm">
              <Link to="/list" className="block hover:text-white">购买店铺</Link>
              <Link to="/sell" className="block hover:text-white">出售店铺</Link>
              <Link to="/pricing" className="block hover:text-white">价格板块</Link>
              <Link to="/recharge" className="block hover:text-white">充值中心</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">电商平台</h4>
            <div className="space-y-2 text-sm">
              <Link to="/list/淘宝" className="block hover:text-white">淘宝店铺</Link>
              <Link to="/list/天猫" className="block hover:text-white">天猫店铺</Link>
              <Link to="/list/京东" className="block hover:text-white">京东店铺</Link>
              <Link to="/list/抖音" className="block hover:text-white">抖音小店</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">关于我们</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:text-white">公司介绍</Link>
              <Link to="/news" className="block hover:text-white">新闻资讯</Link>
              <Link to="/service" className="block hover:text-white">入驻服务</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">联系我们</h4>
            <div className="space-y-2 text-sm">
              <span className="text-red-400 font-medium">微信：scmsj601</span>
              <span>工作时间：9:00-18:00</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-xs text-center">
          网店转让平台 版权所有 2012-2026
        </div>
      </div>
    </footer>
  )
}
