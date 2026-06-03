import { MenuItem } from '../types'

// 画像URLは好きな画像に差し替えてください
// おすすめ: Unsplash (https://unsplash.com) から画像URLをコピー
export const menuItems: MenuItem[] = [
  // ドリンク
  {
    id: 'drink-1',
    name: '桃のカクテル',
    description: '白桃のピューレとスパークリングワインのやさしい甘さ',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&q=80',
    category: 'drink',
  },
  {
    id: 'drink-2',
    name: 'スパークリングレモネード',
    description: 'フレッシュレモンと炭酸水のさっぱり爽快な一杯',
    price: 600,
    imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80',
    category: 'drink',
  },
  {
    id: 'drink-3',
    name: 'モヒート',
    description: 'ミントとライムのクラシックカクテル',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
    category: 'drink',
  },
  {
    id: 'drink-4',
    name: 'クラフトビール',
    description: '地元醸造所のIPAビール',
    price: 700,
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80',
    category: 'drink',
  },
  // フード
  {
    id: 'food-1',
    name: 'チーズプラッター',
    description: '3種のチーズとクラッカーの盛り合わせ',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80',
    category: 'food',
  },
  {
    id: 'food-2',
    name: 'ガーリックブレッド',
    description: 'バターとガーリックをたっぷり染み込ませた自家製パン',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80',
    category: 'food',
  },
  {
    id: 'food-3',
    name: 'カプレーゼ',
    description: 'フレッシュモッツァレラとトマトのイタリアンサラダ',
    price: 900,
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80',
    category: 'food',
  },
  {
    id: 'food-4',
    name: 'ポテトフライ',
    description: 'サクサクのクリスピーポテト、ディップソース付き',
    price: 600,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    category: 'food',
  },
]
