import { CartItem } from '../types'

type CartProps = {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  totalPrice: number
  onAdd: (item: CartItem) => void
  onRemove: (itemId: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function Cart({
  isOpen,
  onClose,
  items,
  onAdd,
  onRemove,
  onSubmit,
  isLoading,
}: CartProps) {
  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
      />

      {/* カートドロワー */}
      <div className={`cart ${isOpen ? 'cart--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">🛒 カート</h2>
          <button className="cart__close" onClick={onClose} aria-label="閉じる">
            ✕
          </button>
        </div>

        <div className="cart__body">
          {items.length === 0 ? (
            <p className="cart__empty">カートは空です</p>
          ) : (
            <ul className="cart__list">
              {items.map(item => (
                <li key={item.id} className="cart__item">
                  <img src={item.imageUrl} alt={item.name} className="cart__item-image" />
                  <div className="cart__item-info">
                    <span className="cart__item-name">{item.name}</span>
                    <span className="cart__item-price">¥{item.price.toLocaleString()}</span>
                  </div>
                  <div className="cart__item-controls">
                    <button onClick={() => onRemove(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onAdd(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart__footer">
            <button
              className="cart__submit"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? '送信中...' : '注文する 🎉'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
