import { sendCartToWhatsApp } from '../utils/whatsapp';
import './Cart.css';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClose }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendOrder = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    sendCartToWhatsApp(cartItems);
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Mi Carrito</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <p className="cart-empty-subtitle">Agrega productos para hacer tu pedido</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-icon">{item.image}</span>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">
                          ${item.price}
                          {item.unit && <span className="cart-item-unit"> {item.unit}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => onRemoveItem(item.id)}
                        title="Eliminar del carrito"
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="cart-total-amount">${total}</span>
                </div>
                <button
                  className="checkout-button"
                  onClick={handleSendOrder}
                >
                  Enviar Pedido por WhatsApp 📱
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
