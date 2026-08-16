import { useState, useCallback } from 'react'
import { Order } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export function useHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/orders`)
      if (!res.ok) throw new Error('注文履歴の取得に失敗しました')
      const data: Order[] = await res.json()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { orders, isLoading, error, fetchOrders }
}
