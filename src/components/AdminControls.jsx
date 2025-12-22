import { useState } from 'react';
import { updateProductAvailability, updateProductPrice, deleteProduct } from '../services/productsService';
import { deleteProductImage } from '../services/storageService';
import './AdminControls.css';

function AdminControls({ product, onEdit }) {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleAvailability = async () => {
    setIsUpdating(true);
    await updateProductAvailability(product.id, !product.available);
    setIsUpdating(false);
  };

  const handlePriceUpdate = async () => {
    if (newPrice <= 0 || isNaN(newPrice)) {
      alert('Precio inválido');
      return;
    }

    setIsUpdating(true);
    const result = await updateProductPrice(product.id, newPrice);
    if (result.success) {
      setIsEditingPrice(false);
    } else {
      alert('Error al actualizar precio');
    }
    setIsUpdating(false);
  };

  const handleCancelEdit = () => {
    setNewPrice(product.price);
    setIsEditingPrice(false);
  };

  const handleDeleteProduct = async () => {
    setIsUpdating(true);

    // Eliminar imagen de Storage si existe
    if (product.imagePath) {
      await deleteProductImage(product.imagePath);
    }

    // Eliminar producto de Firestore
    const result = await deleteProduct(product.id);

    if (result.success) {
      setShowDeleteConfirm(false);
      // El producto desaparecerá automáticamente por la suscripción en tiempo real
    } else {
      alert('Error al eliminar producto: ' + result.error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="admin-controls">
      <div className="admin-availability">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={product.available}
            onChange={handleToggleAvailability}
            disabled={isUpdating}
          />
          <span className="toggle-slider"></span>
        </label>
        <span className={`availability-status ${product.available ? 'available' : 'unavailable'}`}>
          {product.available ? '✅ Disponible' : '⛔ Agotado'}
        </span>
      </div>

      <div className="admin-price-edit">
        {isEditingPrice ? (
          <div className="price-edit-form">
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="price-input"
              min="0"
              step="1"
            />
            <button
              className="price-save-button"
              onClick={handlePriceUpdate}
              disabled={isUpdating}
            >
              ✓
            </button>
            <button
              className="price-cancel-button"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            className="price-edit-button"
            onClick={() => setIsEditingPrice(true)}
          >
            ✏️ Editar precio
          </button>
        )}
      </div>

      <div className="admin-edit">
        <button
          className="edit-product-button"
          onClick={() => onEdit(product)}
          disabled={isUpdating}
        >
          📝 Editar producto
        </button>
      </div>

      <div className="admin-delete">
        {!showDeleteConfirm ? (
          <button
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isUpdating}
          >
            🗑️ Eliminar
          </button>
        ) : (
          <div className="delete-confirm">
            <p className="delete-warning">¿Eliminar este producto?</p>
            <div className="delete-actions">
              <button
                className="confirm-delete-button"
                onClick={handleDeleteProduct}
                disabled={isUpdating}
              >
                ✓ Sí, eliminar
              </button>
              <button
                className="cancel-delete-button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isUpdating}
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminControls;
