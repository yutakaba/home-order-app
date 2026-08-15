import { MenuItem, CartItem } from '../types'

type MenuCardProps = {
  item: MenuItem
  cartItem: CartItem | undefined
  onAdd: (item: MenuItem) => void
  onRemove: (itemId: string) => void
}

export function MenuCard({ item, cartItem, onAdd, onRemove }: MenuCardProps) {
  const quantity = cartItem?.quantity ?? 0

  return (
    <div className={`menu-card ${quantity > 0 ? 'in-cart' : ''}`}>
      <div className="menu-card__image-wrapper">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="menu-card__image"
          loading="lazy"
        />
        {quantity > 0 && (
          <div className="menu-card__badge">{quantity}</div>
        )}
      </div>
      <div className="menu-card__body">
        {item.subcategory && (
          <span className="menu-card__subcategory">{item.subcategory}</span>
        )}
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__description">{item.description}</p>
        <div className="menu-card__footer">
          <span className="cart__item-price">¥{item.price.toLocaleString()}</span>
          <div className="menu-card__controls">
            {quantity > 0 && (
              <button
                className="menu-card__btn menu-card__btn--minus"
                onClick={() => onRemove(item.id)}
                aria-label="減らす"
              >
                −
              </button>
            )}
            <button
              className="menu-card__btn menu-card__btn--plus"
              onClick={() => onAdd(item)}
              aria-label="追加"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
