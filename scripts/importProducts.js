// Script para importar productos a Firebase
// Solo ejecuta esto UNA VEZ

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// Productos de prueba
const products = [
  {
    name: "Croissant de Chocolate",
    category: "croissants",
    price: 25,
    description: "Croissant hojaldrado relleno con chocolate belga",
    image: "🥐",
    available: true
  },
  {
    name: "Café Americano",
    category: "cafe",
    price: 250,
    unit: "por kilo",
    description: "Café molido americano de tueste medio",
    image: "☕",
    available: true
  }
];

// Función principal
async function importProducts() {
  console.log('🚀 Iniciando importación de productos a Firebase...\n');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let imported = 0;
  let errors = 0;

  for (const product of products) {
    try {
      await addDoc(collection(db, 'products'), product);
      console.log(`✅ Importado: ${product.name}`);
      imported++;
    } catch (error) {
      console.error(`❌ Error al importar ${product.name}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Productos importados: ${imported}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`\n🎉 ¡Importación completada!`);

  process.exit(0);
}

// Ejecutar
importProducts().catch((error) => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
