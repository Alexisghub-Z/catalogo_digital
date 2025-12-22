import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

const PRODUCTS_COLLECTION = 'products';

// Obtener todos los productos (una vez)
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message, products: [] };
  }
};

// Escuchar cambios en productos en tiempo real
export const subscribeToProducts = (callback) => {
  const unsubscribe = onSnapshot(
    collection(db, PRODUCTS_COLLECTION),
    (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    },
    (error) => {
      console.error('Error al escuchar productos:', error);
      callback([]);
    }
  );
  return unsubscribe;
};

// Actualizar disponibilidad de un producto
export const updateProductAvailability = async (productId, available) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, { available });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Actualizar precio de un producto
export const updateProductPrice = async (productId, price) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, { price: Number(price) });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Actualizar producto completo
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, productData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Agregar un nuevo producto
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      available: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
