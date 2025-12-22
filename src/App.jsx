import { useState, useEffect } from 'react';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import CartButton from './components/CartButton';
import LoginModal from './components/LoginModal';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import Toast from './components/Toast';
import { onAuthChange, logoutAdmin } from './services/authService';
import { subscribeToProducts } from './services/productsService';
import { isUserAdmin } from './services/adminService';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cartPulse, setCartPulse] = useState(false);

  // Escuchar cambios en autenticación
  useEffect(() => {
    try {
      const unsubscribe = onAuthChange(async (currentUser) => {
        setUser(currentUser);

        // Verificar si el usuario es admin
        if (currentUser) {
          const adminStatus = await isUserAdmin(currentUser.email);
          setIsAdmin(adminStatus);

          if (!adminStatus) {
            console.warn('Usuario no autorizado como administrador');
          }
        } else {
          setIsAdmin(false);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase no configurado:', error);
      setIsFirebaseConfigured(false);
    }
  }, []);

  // Escuchar cambios en productos desde Firebase
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    try {
      const unsubscribe = subscribeToProducts((firebaseProducts) => {
        setProducts(firebaseProducts);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Error al conectar con Firebase:', error);
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

    // Mostrar notificación
    setToastMessage(`${product.name} agregado al carrito`);
    setShowToast(true);

    // Animar botón del carrito
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 600);
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
    setIsAdmin(false);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsEditProductOpen(true);
  };

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
          ❌ Error: No se pudieron cargar los productos. Firebase no está configurado correctamente.
          Por favor, revisa FIREBASE_SETUP.md para instrucciones.
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
          pulse={cartPulse}
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

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
