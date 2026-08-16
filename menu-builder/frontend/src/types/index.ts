// メニューアイテムの型
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: 'food' | 'drink'
  subcategory?: string
  recipe?: string
}

// カート内アイテムの型
export interface CartItem extends MenuItem {
  quantity: number
}

// 注文リクエストの型
export interface CreateOrderRequest {
  items: {
    id: string
    name: string
    price: number
    quantity: number
    imageUrl: string
    recipe?: string
  }[]
  totalPrice: number
}

// 注文レスポンスの型
export interface CreateOrderResponse {
  id: string
  message: string
}

// 履歴取得用の型
export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface Order {
  id: string
  items: OrderItem[]
  totalPrice: number
  createdAt: string
}
