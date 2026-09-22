import * as React from 'react'
import * as Icon from 'lucide-react'
import { menuItems } from './data/menu'
import { useCart } from './hooks/useCart'
import { useOrder } from './hooks/useOrder'
import { useHistory } from './hooks/useHistory'
import { MenuCard } from './components/MenuCard'
import { Cart } from './components/Cart'
import { History } from './components/History'
import { Splash } from './components/Splash'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import './styles.css'

type Category = 'all' | 'food' | 'drink'

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState<Category>('all')

  const { orders, isLoading: isHistoryLoading, error: historyError, fetchOrders } = useHistory()

  const { cartItems, addToCart, removeFromCart, clearCart, totalCount, totalPrice } = useCart()
  const { submitOrder, isLoading, error } = useOrder()

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  const handleSubmitOrder = async () => {
    const result = await submitOrder(cartItems)
    if (result) {
      clearCart()
      setIsCartOpen(false)
      setIsSuccessOpen(true)
    }
  }

  const getCategoryLabel = (cat: Category): React.ReactNode => {
    switch (cat) {
      case 'all':
        return 'すべて'
      case 'drink':
        return (
          <>
            <Icon.CupSoda size="1em" />
            ドリンク
          </>
        )
      case 'food':
        return (
          <>
            <Icon.Utensils size="1em" />
            フード
          </>
        )
    }
  }

  return (
    <div className={`app ${showSplash ? '' : 'app--ready'}`}>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      {/* ヘッダー */}
      <header className="header">
        <h1 className="header__title">
          <Icon.House size="1em" /> Home Bar
        </h1>
        <div className="header__actions">
          <button
            className="header__cart-btn"
            onClick={() => setIsHistoryOpen(true)}
            aria-label="注文履歴を開く"
          >
            📋
          </button>
          <button
            className="header__cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="カートを開く"
          >
            🛒
            {totalCount > 0 && <span className="header__cart-count">{totalCount}</span>}
          </button>
        </div>
      </header>

      {/* カテゴリータブ */}
      <nav className="category-nav">
        {(['all', 'drink', 'food'] as Category[]).map((cat) => (
          <button
            key={cat}
            className={`category-nav__btn ${activeCategory === cat ? 'category-nav__btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </nav>

      {/* メニューグリッド */}
      <main className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            cartItem={cartItems.find((c) => c.id === item.id)}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        ))}
      </main>

      {/* エラー表示 */}
      {error && <div className="error-toast">{error}</div>}

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

      {/* 注文履歴 */}
      <History
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        isLoading={isHistoryLoading}
        error={historyError}
        onOpen={fetchOrders}
      />

      {/* 注文完了モーダル */}
      <OrderSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </div>
  )
}
