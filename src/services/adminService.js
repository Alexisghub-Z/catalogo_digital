import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Verifica si un usuario es administrador
 * @param {string} email - Email del usuario a verificar
 * @returns {Promise<boolean>} - true si es admin, false si no lo es
 */
export const isUserAdmin = async (email) => {
  if (!email) return false;

  try {
    // Verificar si el email está en la colección admin_users
    const adminDocRef = doc(db, 'admin_users', email.toLowerCase());
    const adminDoc = await getDoc(adminDocRef);

    return adminDoc.exists() && adminDoc.data().isAdmin === true;
  } catch (error) {
    console.error('Error verificando admin:', error);
    return false;
  }
};
