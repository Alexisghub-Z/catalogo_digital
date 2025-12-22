# 🔥 Configuración de Firebase

Este documento te guiará paso a paso para configurar Firebase en tu catálogo digital.

## 📋 Requisitos Previos

- Una cuenta de Google
- El proyecto ya está instalado con Firebase SDK

---

## 🚀 Paso 1: Crear Proyecto en Firebase

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"**
3. Nombre del proyecto: `catalogo-panaderia` (o el nombre que prefieras)
4. Acepta los términos y haz clic en **"Continuar"**
5. Desactiva Google Analytics (no es necesario para este proyecto)
6. Haz clic en **"Crear proyecto"**
7. Espera a que se cree (toma ~30 segundos)
8. Haz clic en **"Continuar"**

---

## 🌐 Paso 2: Registrar tu Aplicación Web

1. En la página principal de tu proyecto, haz clic en el ícono **</>** (Web)
2. Apodo de la app: `catalogo-web`
3. **NO** marques "Firebase Hosting" (por ahora)
4. Haz clic en **"Registrar app"**
5. **IMPORTANTE:** Copia el objeto `firebaseConfig` que aparece
   - Se verá algo así:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "catalogo-panaderia.firebaseapp.com",
     projectId: "catalogo-panaderia",
     storageBucket: "catalogo-panaderia.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```
6. Haz clic en **"Continuar a la consola"**

---

## ⚙️ Paso 3: Configurar tu Proyecto

1. Abre el archivo: `src/services/firebase.js`
2. Reemplaza los valores de `firebaseConfig` con los que copiaste en el Paso 2:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

3. Guarda el archivo

---

## 🔐 Paso 4: Configurar Authentication (Login)

1. En la consola de Firebase, ve a **"Authentication"** (menú izquierdo)
2. Haz clic en **"Comenzar"**
3. Haz clic en **"Email/Password"**
4. **Activa** la primera opción (Email/Password)
5. Haz clic en **"Guardar"**

### Crear Usuario Administrador:

6. Ve a la pestaña **"Users"**
7. Haz clic en **"Agregar usuario"**
8. Ingresa:
   - Email: `admin@tupanaderia.com` (o el que prefieras)
   - Contraseña: Crea una contraseña segura
9. Haz clic en **"Agregar usuario"**

**¡IMPORTANTE!** Guarda estas credenciales en un lugar seguro. Las necesitarás para iniciar sesión.

---

## 📦 Paso 5: Configurar Firestore Database

1. En la consola de Firebase, ve a **"Firestore Database"** (menú izquierdo)
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de producción"**
4. Haz clic en **"Siguiente"**
5. Selecciona la ubicación más cercana a tu país:
   - Para México: `us-central1`
   - Para España: `europe-west1`
6. Haz clic en **"Habilitar"**

### Configurar Reglas de Seguridad:

7. Ve a la pestaña **"Reglas"**
8. Reemplaza las reglas con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos (para que los clientes vean el catálogo)
    match /products/{product} {
      allow read: if true;
      // Solo usuarios autenticados pueden escribir
      allow write: if request.auth != null;
    }
  }
}
```

9. Haz clic en **"Publicar"**

---

## 📝 Paso 6: Agregar Productos a Firestore

Tienes dos opciones:

### Opción A: Agregar manualmente desde la consola (más fácil)

1. En Firestore Database, haz clic en **"Iniciar colección"**
2. ID de colección: `products`
3. Haz clic en **"Siguiente"**
4. Para el primer documento:
   - **ID de documento:** Auto-ID
   - Agrega estos campos (haz clic en "+ Agregar campo"):

   | Campo | Tipo | Valor |
   |-------|------|-------|
   | name | string | Croissant de Chocolate |
   | category | string | croissants |
   | price | number | 25 |
   | description | string | Croissant hojaldrado relleno con chocolate belga |
   | image | string | 🥐 |
   | available | boolean | true |

5. Haz clic en **"Guardar"**
6. Repite para cada producto que quieras agregar

### Opción B: Importar todos los productos automáticamente

Usa este script de Node.js para importar todos los productos de `src/data/products.js`:

1. Crea un archivo `scripts/importProducts.js`:

```javascript
// Instrucciones completas en el archivo FIREBASE_IMPORT_SCRIPT.md
```

---

## ✅ Paso 7: Verificar que Todo Funciona

1. Guarda todos los cambios
2. La aplicación se recargará automáticamente
3. El banner amarillo de advertencia debe desaparecer
4. Deberías ver tus productos en el catálogo

### Probar el Login de Admin:

1. Haz clic en el botón **"🔐 Admin"** en la esquina superior derecha
2. Ingresa las credenciales que creaste en el Paso 4
3. Deberías ver los controles de admin en cada producto:
   - Toggle de disponibilidad
   - Botón de editar precio

---

## 🎯 ¿Qué Puedes Hacer Ahora?

Como administrador logueado:
- ✅ Activar/desactivar productos (toggle verde/rojo)
- ✅ Editar precios en tiempo real
- ✅ Los cambios se ven instantáneamente para todos los clientes
- ✅ No necesitas refrescar la página

Como cliente (sin login):
- ✅ Ver solo productos disponibles
- ✅ Productos agotados se muestran en gris con badge "AGOTADO"
- ✅ No pueden agregar productos agotados al carrito

---

## 🔧 Solución de Problemas

### "Firebase no configurado"
- Verifica que copiaste correctamente el `firebaseConfig` en `src/services/firebase.js`
- Asegúrate de no tener comillas extras o espacios

### "Error al iniciar sesión"
- Verifica que el email/password sean correctos
- Asegúrate de haber habilitado "Email/Password" en Authentication

### "No veo los productos"
- Verifica que hayas creado la colección `products` en Firestore
- Revisa las reglas de seguridad
- Abre la consola del navegador (F12) para ver errores

### "Los cambios no se sincronizan"
- Verifica tu conexión a internet
- Revisa las reglas de Firestore
- Mira la consola del navegador para ver errores

---

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)
- [Authentication Docs](https://firebase.google.com/docs/auth)

---

## 💰 Límites del Plan Gratuito

Firebase tiene un plan gratuito muy generoso:

- **Firestore:** 50,000 lecturas/día, 20,000 escrituras/día
- **Authentication:** Ilimitado
- **Almacenamiento:** 1 GB

Para un catálogo de panadería pequeño, esto es **más que suficiente**.

---

¿Necesitas ayuda? Revisa la sección de solución de problemas o contacta al desarrollador.
