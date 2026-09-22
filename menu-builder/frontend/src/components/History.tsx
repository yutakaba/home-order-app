import { useEffect } from 'react'
import { Order } from '../types'

interface HistoryProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  isLoading: boolean
  error: string | null
  onOpen: () => void
}

function groupByDate(orders: Order[]): Record<string, Order[]> {
  return orders.reduce<Record<string, Order[]>>((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(order)
    return acc
  }, {})
}

export function History({ isOpen, onClose, orders, isLoading, error, onOpen }: HistoryProps) {
  useEffect(() => {
    if (isOpen) onOpen()
  }, [isOpen, onOpen])

  const grouped = groupByDate(orders)
  const dates = Object.keys(grouped)

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`} onClick={onClose} />

      <div className={`history ${isOpen ? 'history--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">📋 注文履歴</h2>
          <button className="cart__close" onClick={onClose} aria-label="閉じる">
            ✕
          </button>
        </div>

        <div className="cart__body">
          {isLoading && <p className="history__state">読み込み中...</p>}
          {error && <p className="history__state history__state--error">{error}</p>}
          {!isLoading && !error && dates.length === 0 && (
            <p className="history__state">注文履歴がありません</p>
          )}
          {!isLoading &&
            dates.map((date) => (
              <div key={date} className="history__group">
                <p className="history__date">{date}</p>
                {grouped[date].map((order) => (
                  <div key={order.id} className="history__order">
                    <ul className="history__items">
                      {order.items.map((item, i) => (
                        <li key={i} className="history__item">
                          <span className="history__item-name">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="history__item-price">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="history__total">
                      <span>合計</span>
                      <span>¥{order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
