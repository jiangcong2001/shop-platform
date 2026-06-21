import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-3">平台服务</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link to="/list" className="hover:text-white">购买店铺</Link>
              <Link to="/sell" className="hover:text-white">出售店铺</Link>
              <Link to="/pricing" className="hover:text-white">价格板块</Link>
              <Link to="/recharge" className="hover:text-white">充值中心</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">电商平台</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link to="/list/淘宝" className="hover:text-white">淘宝店铺</Link>
              <Link to="/list/天猫" className="hover:text-white">天猫店铺</Link>
              <Link to="/list/京东" className="hover:text-white">京东店铺</Link>
              <Link to="/list/抖音" className="hover:text-white">抖音小店</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">关于我们</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link to="/about" className="hover:text-white">公司介绍</Link>
              <Link to="/news" className="hover:text-white">新闻资讯</Link>
              <Link to="/service" className="hover:text-white">入驻服务</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">联系我们</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              <span className="text-primary">微信：scmsj601</span>
              <span>QQ：4008008888</span>
              <span>工作时间：9:00-18:00</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>网店转让平台 版权所有 2012-2026</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-gray-300">关于我们</Link>
            <Link to="/news" className="hover:text-gray-300">新闻资讯</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
