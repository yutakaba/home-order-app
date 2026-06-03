import { useState } from 'react'
import { CartItem, CreateOrderResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export function useOrder() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitOrder = async (items: CartItem[]): Promise<CreateOrderResponse | null> => {
    setIsLoading(true)
    setError(null)

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ id, name, price, quantity, imageUrl }) => ({
            id,
            name,
            price,
            quantity,
            imageUrl,
          })),
          totalPrice,
        }),
      })

      if (!response.ok) {
        throw new Error('注文の送信に失敗しました')
      }

      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { submitOrder, isLoading, error }
}
