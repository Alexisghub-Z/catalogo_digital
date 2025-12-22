import './CartButton.css';

function CartButton({ itemCount, onClick, pulse }) {
  return (
    <button
      className={`cart-floating-button ${pulse ? 'pulse' : ''}`}
      onClick={onClick}
    >
      <span className="cart-icon">🛒</span>
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </button>
  );
}

export default CartButton;
