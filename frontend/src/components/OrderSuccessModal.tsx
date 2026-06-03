interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__icon">🎉</div>
        <h2 className="modal__title">注文しました！</h2>
        <p className="modal__message">
          ご注文ありがとうございます。<br />
          しばらくお待ちください！
        </p>
        <button className="modal__btn" onClick={onClose}>
          続けて注文する
        </button>
      </div>
    </div>
  )
}
