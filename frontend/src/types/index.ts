// メニューアイテムの型
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: 'food' | 'drink'
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
  }[]
  totalPrice: number
}

// 注文レスポンスの型
export interface CreateOrderResponse {
  id: string
  message: string
}
