import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Subir imagen de producto
export const uploadProductImage = async (file, productName) => {
  try {
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'El archivo debe ser una imagen' };
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      return { success: false, error: 'La imagen debe ser menor a 5MB' };
    }

    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const sanitizedName = productName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileName = `products/${sanitizedName}_${timestamp}.${file.name.split('.').pop()}`;

    // Crear referencia en Storage
    const storageRef = ref(storage, fileName);

    // Subir archivo
    await uploadBytes(storageRef, file);

    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(storageRef);

    return { success: true, url: downloadURL, path: fileName };
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return { success: false, error: error.message };
  }
};

// Eliminar imagen de producto
export const deleteProductImage = async (imagePath) => {
  try {
    if (!imagePath) return { success: true };

    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);

    return { success: true };
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return { success: false, error: error.message };
  }
};

// Validar URL de imagen
export const isValidImageUrl = (url) => {
  return url && (url.startsWith('http') || url.startsWith('data:'));
};
