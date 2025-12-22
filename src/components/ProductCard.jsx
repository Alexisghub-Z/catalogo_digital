import AdminControls from './AdminControls';
import './ProductCard.css';

function ProductCard({ product, onOrder, isAdmin, onEditProduct }) {
  const isAvailable = product.available !== false;

  // Detectar si es una URL de imagen o un emoji
  const isImageUrl = product.image && (
    product.image.startsWith('http') ||
    product.image.startsWith('data:') ||
    product.image.startsWith('blob:')
  );

  return (
    <div className={`product-card ${!isAvailable ? 'unavailable' : ''}`}>
      {!isAvailable && (
        <div className="unavailable-badge">⛔ AGOTADO</div>
      )}

      <div className="product-image-container">
        {isImageUrl ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-icon">{product.image}</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">
            ${product.price}
            {product.unit && <span className="product-unit"> {product.unit}</span>}
          </div>
          {!isAdmin && (
            <button
              className="order-button"
              onClick={() => onOrder(product)}
              disabled={!isAvailable}
            >
              {isAvailable ? 'Agregar 🛒' : 'No disponible'}
            </button>
          )}
        </div>

        {isAdmin && <AdminControls product={product} onEdit={onEditProduct} />}
      </div>
    </div>
  );
}

export default ProductCard;
