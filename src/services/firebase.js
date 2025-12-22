import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc",
  authDomain: "catalogo-panaderia-addd7.firebaseapp.com",
  projectId: "catalogo-panaderia-addd7",
  storageBucket: "catalogo-panaderia-addd7.firebasestorage.app",
  messagingSenderId: "920728414780",
  appId: "1:920728414780:web:94c52670f31001df627139",
  measurementId: "G-501HB9Y7CM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
