import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc",
  authDomain: "catalogo-panaderia-addd7.firebaseapp.com",
  projectId: "catalogo-panaderia-addd7",
  storageBucket: "catalogo-panaderia-addd7.firebasestorage.app",
  messagingSenderId: "920728414780",
  appId: "1:920728414780:web:94c52670f31001df627139"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Productos de prueba
const testProducts = [
  {
    name: "Croissant de Chocolate",
    category: "croissants",
    price: 25,
    description: "Croissant hojaldrado relleno de chocolate belga premium. Crujiente por fuera, suave por dentro.",
    image: "🥐",
    available: true
  },
  {
    name: "Croissant de Almendras",
    category: "croissants",
    price: 28,
    description: "Croissant cubierto con almendras laminadas y relleno de crema de almendras.",
    image: "🥐",
    available: true
  },
  {
    name: "Rol de Canela Clásico",
    category: "roles",
    price: 30,
    description: "Suave masa enrollada con canela y cubierta con glaseado de queso crema.",
    image: "🌀",
    available: true
  },
  {
    name: "Cappuccino",
    category: "cafe",
    price: 35,
    description: "Espresso doble con leche vaporizada y espuma cremosa. Granos 100% arábica.",
    image: "☕",
    available: true
  },
  {
    name: "Latte Vainilla",
    category: "cafe",
    price: 38,
    description: "Café espresso con leche vaporizada y un toque de vainilla natural.",
    image: "☕",
    available: true
  }
];

// Función para importar productos
async function importProducts() {
  console.log('🚀 Iniciando importación de productos...\n');

  try {
    for (const product of testProducts) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`✅ Importado: ${product.name} (ID: ${docRef.id})`);
    }

    console.log('\n✅ ¡Importación completada exitosamente!');
    console.log(`📦 ${testProducts.length} productos agregados a Firestore`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al importar productos:', error);
    process.exit(1);
  }
}

// Ejecutar importación
importProducts();
