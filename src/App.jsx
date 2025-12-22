import { useState, useEffect } from 'react';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import CartButton from './components/CartButton';
import LoginModal from './components/LoginModal';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import { onAuthChange, logoutAdmin } from './services/authService';
import { subscribeToProducts } from './services/productsService';
import { products as localProducts } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(localProducts);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(true);

  // Escuchar cambios en autenticación
  useEffect(() => {
    try {
      const unsubscribe = onAuthChange((currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn('Firebase no configurado. Usando productos locales.');
      setIsFirebaseConfigured(false);
    }
  }, []);

  // Escuchar cambios en productos desde Firebase
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    try {
      const unsubscribe = subscribeToProducts((firebaseProducts) => {
        if (firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn('Error al conectar con Firebase. Usando productos locales.');
      setIsFirebaseConfigured(false);
    }
  }, [isFirebaseConfigured]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsEditProductOpen(true);
  };

  const isAdmin = user !== null;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>🥐 Panadería & Cafetería 🥐</h1>
            <p>Croissants rellenos, roles de canela y café de calidad</p>
          </div>
          <div className="header-actions">
            {isAdmin ? (
              <div className="admin-info">
                <span className="admin-badge">👤 Admin</span>
                <button className="logout-button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button className="admin-button" onClick={() => setIsLoginOpen(true)}>
                🔐 Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {!isFirebaseConfigured && (
        <div className="firebase-warning">
          ⚠️ Firebase no configurado. Revisa FIREBASE_SETUP.md para instrucciones.
          Usando datos de prueba locales.
        </div>
      )}

      <main>
        <Catalog
          products={products}
          onOrder={handleAddToCart}
          isAdmin={isAdmin}
          onAddProduct={() => setIsAddProductOpen(true)}
          onEditProduct={handleEditProduct}
        />
      </main>

      <footer className="footer">
        <p>Agrega productos al carrito y haz tu pedido</p>
        <p className="footer-note">Productos frescos horneados diariamente</p>
      </footer>

      {!isAdmin && (
        <CartButton
          itemCount={getTotalItems()}
          onClick={() => setIsCartOpen(true)}
        />
      )}

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(user) => setUser(user)}
        />
      )}

      {isAddProductOpen && (
        <AddProductModal
          onClose={() => setIsAddProductOpen(false)}
          onSuccess={() => {
            // El producto se agregó exitosamente
            // Firebase actualizará automáticamente la lista
          }}
        />
      )}

      {isEditProductOpen && productToEdit && (
        <EditProductModal
          product={productToEdit}
          onClose={() => {
            setIsEditProductOpen(false);
            setProductToEdit(null);
          }}
          onSuccess={() => {
            // El producto se editó exitosamente
            // Firebase actualizará automáticamente la lista
          }}
        />
      )}
    </div>
  );
}

export default App;
