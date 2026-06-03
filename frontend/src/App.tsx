import { useState } from 'react'
import { menuItems } from './data/menu'
import { useCart } from './hooks/useCart'
import { useOrder } from './hooks/useOrder'
import { MenuCard } from './components/MenuCard'
import { Cart } from './components/Cart'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import './styles.css'

type Category = 'all' | 'food' | 'drink'

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const { cartItems, addToCart, removeFromCart, clearCart, totalCount, totalPrice } = useCart()
  const { submitOrder, isLoading, error } = useOrder()

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  const handleSubmitOrder = async () => {
    const result = await submitOrder(cartItems)
    if (result) {
      clearCart()
      setIsCartOpen(false)
      setIsSuccessOpen(true)
    }
  }

  return (
    <div className="app">
      {/* ヘッダー */}
      <header className="header">
        <h1 className="header__title">🏠 Home Bar</h1>
        <button
          className="header__cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="カートを開く"
        >
          🛒
          {totalCount > 0 && (
            <span className="header__cart-count">{totalCount}</span>
          )}
        </button>
      </header>

      {/* カテゴリータブ */}
      <nav className="category-nav">
        {(['all', 'drink', 'food'] as Category[]).map(cat => (
          <button
            key={cat}
            className={`category-nav__btn ${activeCategory === cat ? 'category-nav__btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? '✨ すべて' : cat === 'drink' ? '🍹 ドリンク' : '🍽️ フード'}
          </button>
        ))}
      </nav>

      {/* メニューグリッド */}
      <main className="menu-grid">
        {filteredItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            cartItem={cartItems.find(c => c.id === item.id)}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        ))}
      </main>

      {/* エラー表示 */}
      {error && (
        <div className="error-toast">{error}</div>
      )}

      {/* カート */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onSubmit={handleSubmitOrder}
        isLoading={isLoading}
      />

      {/* 注文完了モーダル */}
      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  )
}
