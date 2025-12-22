import { useState } from 'react';
import { updateProduct } from '../services/productsService';
import './AddProductModal.css';

function EditProductModal({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    category: product.category || 'croissants',
    price: product.price || '',
    description: product.description || '',
    unit: product.unit || '',
    imageUrl: product.image?.startsWith('http') ? product.image : ''
  });
  const [imagePreview, setImagePreview] = useState(
    product.image?.startsWith('http') ? product.image : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: url }));

    if (url.trim()) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      setLoading(false);
      return;
    }

    if (!formData.price || formData.price <= 0) {
      setError('El precio debe ser mayor a 0');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('La descripción es obligatoria');
      setLoading(false);
      return;
    }

    // Determinar la imagen a usar
    let imageUrl = formData.imageUrl.trim() || categoryIcons[formData.category];

    const updatedProduct = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      description: formData.description.trim(),
      image: imageUrl
    };

    if (formData.unit.trim()) {
      updatedProduct.unit = formData.unit.trim();
    }

    const result = await updateProduct(product.id, updatedProduct);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError('Error al actualizar producto: ' + result.error);
    }

    setLoading(false);
  };

  const categoryIcons = {
    croissants: '🥐',
    roles: '🌀',
    cafe: '☕'
  };

  return (
    <div className="add-product-overlay" onClick={onClose}>
      <div className="add-product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-product-header">
          <h2>✏️ Editar Producto</h2>
          <button className="add-product-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Sección de imagen */}
          <div className="image-upload-section">
            <label className="image-label">🔗 URL de imagen (opcional)</label>

            {!imagePreview ? (
              <div className="url-input-container">
                <input
                  type="url"
                  placeholder="https://i.imgur.com/ejemplo.jpg"
                  value={formData.imageUrl}
                  onChange={handleUrlChange}
                  className="url-input"
                />
                <p className="url-hint">Pega la URL directa de una imagen (recomendado: Imgur). Si no agregas imagen, se usará un emoji.</p>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  ✕ Quitar imagen
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre del producto *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Croissant de Chocolate"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="croissants">Croissants</option>
                <option value="roles">Roles de Canela</option>
                <option value="cafe">Café</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="25"
                min="0"
                step="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el producto..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unidad (opcional)</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="por kilo, por pieza, etc."
            />
          </div>

          {error && <div className="add-product-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
