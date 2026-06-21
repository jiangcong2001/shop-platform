const stores = [
  {
    id: 1, name: '华北五钻3C数码淘宝店铺转让', platform: '淘宝', category: '3C数码', rating: 99, level: '五钻', price: 2000, region: '华北', type: '个人店', tags: [], desc: '卖家诚心出售，无违规，DSR全红。', wechat: 'scmsj601',
  },
  {
    id: 2, name: '武汉多类目天猫旗舰店新店出售', platform: '天猫', category: '3C数码', rating: 100, level: '旗舰店', price: 20000, region: '华中', type: '旗舰店', tags: ['新店'], desc: '可添加多类目，全新R标。', wechat: 'scmsj601',
  },
  {
    id: 3, name: '华北四钻美容护肤淘宝店铺转让', platform: '淘宝', category: '美容护肤', rating: 99, level: '四钻', price: 1400, region: '华北', type: '个人店', tags: [], desc: '价格实惠，适合新手。', wechat: 'scmsj601',
  },
  {
    id: 4, name: '居家日用天猫新店出售', platform: '天猫', category: '居家日用', rating: 100, level: '新店', price: 6500, region: '华东', type: '新店', tags: ['新店'], desc: '居家日用类目，TM标。', wechat: 'scmsj601',
  },
  {
    id: 5, name: '京东POP数码家电专营店出售', platform: '京东', category: '数码家电', rating: 97, level: '专营店', price: 35000, region: '华东', type: '专营店', tags: ['优质'], desc: '数码家电类目，接手即可盈利。', wechat: 'scmsj601',
  },
  {
    id: 6, name: '天猫食品旗舰店休闲零食出售', platform: '天猫', category: '食品', rating: 99, level: '旗舰店', price: 18000, region: '华东', type: '旗舰店', tags: ['优质'], desc: '休闲零食方向，R标全红。', wechat: 'scmsj601',
  },
  {
    id: 7, name: '华北三皇冠服饰鞋包淘宝转让', platform: '淘宝', category: '服饰鞋包', rating: 99, level: '三皇冠', price: 12000, region: '华北', type: '个人店', tags: [], desc: '高等级皇冠，老店信誉好。', wechat: 'scmsj601',
  },
  {
    id: 8, name: '抖音小店美妆个护专营店急转', platform: '抖音', category: '美妆个护', rating: 98, level: '专营店', price: 15000, region: '西南', type: '专营店', tags: ['急转'], desc: '粉丝2万+，橱窗已开通。', wechat: 'scmsj601',
  },
  {
    id: 9, name: '京东自营家居生活馆诚意转让', platform: '京东', category: '家居生活', rating: 98, level: '自营', price: 55000, region: '华北', type: '自营', tags: ['自营', '优质'], desc: '入仓稳定，月GMV 20万+。', wechat: 'scmsj601',
  },
  {
    id: 10, name: '淘宝全球购法国美妆店铺转让', platform: '淘宝', category: '美妆护肤', rating: 100, level: '全球购', price: 28000, region: '华东', type: '全球购', tags: ['全球购'], desc: '一手货源，利润空间大。', wechat: 'scmsj601',
  },
  {
    id: 11, name: '抖音小店服饰鞋包直播店铺出售', platform: '抖音', category: '服饰鞋包', rating: 95, level: '专营店', price: 22000, region: '华中', type: '专营店', tags: ['直播'], desc: '已开通直播，粉丝5万+。', wechat: 'scmsj601',
  },
  {
    id: 12, name: '天猫家装建材旗舰店转让', platform: '天猫', category: '家装建材', rating: 98, level: '旗舰店', price: 45000, region: '华南', type: '旗舰店', tags: ['优质'], desc: '家装建材旗舰店，经营3年。', wechat: 'scmsj601',
  },
]

export const platforms = ['全部', '淘宝', '天猫', '京东', '抖音', '其他']
export const categories = ['全部', '3C数码', '美容护肤', '居家日用', '服饰鞋包', '食品', '数码家电', '家居生活', '美妆个护', '美妆护肤', '家装建材']
export const regions = ['全部', '华北', '华东', '华南', '华中', '西南']
export const priceRanges = [
  { label: '全部', min: 0, max: Infinity },
  { label: '5000以下', min: 0, max: 5000 },
  { label: '5000-1万', min: 5000, max: 10000 },
  { label: '1万-3万', min: 10000, max: 30000 },
  { label: '3万以上', min: 30000, max: Infinity },
]

export default stores
