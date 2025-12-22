import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import './Catalog.css';

function Catalog({ products, onOrder, isAdmin, onAddProduct, onEditProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="catalog">
      <div className="catalog-header">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {isAdmin && (
          <button className="add-product-btn" onClick={onAddProduct}>
            ➕ Agregar Producto
          </button>
        )}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOrder={onOrder}
            isAdmin={isAdmin}
            onEditProduct={onEditProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No hay productos en esta categoría</p>
        </div>
      )}
    </div>
  );
}

export default Catalog;
