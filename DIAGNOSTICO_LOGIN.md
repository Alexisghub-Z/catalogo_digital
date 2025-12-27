# 🔍 Diagnóstico de Problema de Login

## 🎯 Tu Problema
✅ El login funciona (acepta la contraseña)
❌ No te redirige ni muestra controles de admin

---

## 📋 Pasos de Diagnóstico

### Paso 1: Verificar la Consola del Navegador

1. Abre tu aplicación en el navegador
2. Presiona **F12** para abrir las Developer Tools
3. Ve a la pestaña **Console**
4. Intenta hacer login
5. Busca estos mensajes:

**Si ves:**
```
Usuario no autorizado como administrador
```
👉 **Problema:** Tu email NO está en la colección `admin_users` de Firestore

**Si ves:**
```
Error verificando admin: [algún error]
```
👉 **Problema:** Error de conexión con Firestore o reglas mal configuradas

**Si NO ves ningún mensaje:**
👉 **Problema:** El login está funcionando pero algo más falla

---

### Paso 2: Verificar Firestore - Colección admin_users

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Firestore Database**
4. Busca la colección **`admin_users`**

**¿Existe la colección `admin_users`?**

- ❌ **NO existe** → Este es el problema principal. Necesitas crearla.
- ✅ **SÍ existe** → Continúa al siguiente paso

---

### Paso 3: Verificar que tu Email está en admin_users

Dentro de la colección `admin_users`:

**¿Hay un documento con tu email exacto?**

Ejemplo de estructura correcta:
```
admin_users (colección)
└── admin@tupanaderia.com (documento) ← El ID es tu email
    ├── isAdmin: true (boolean)
    ├── email: "admin@tupanaderia.com" (string)
    └── createdAt: December 27, 2025 (timestamp)
```

**⚠️ IMPORTANTE - Verifica:**
- [ ] El **ID del documento** es EXACTAMENTE tu email (el mismo que usas para login)
- [ ] El campo `isAdmin` es **boolean** (no string) y su valor es **true**
- [ ] El email está en **minúsculas**
- [ ] No hay espacios extra al inicio o final del email

---

### Paso 4: Verificar Email en Authentication

1. En Firebase Console, ve a **Authentication** → **Users**
2. Copia el email EXACTO que aparece ahí
3. Ve a Firestore → `admin_users`
4. **El ID del documento debe ser IDÉNTICO al email de Authentication**

**Ejemplo:**
- Email en Authentication: `admin@tupanaderia.com`
- ID del documento en admin_users: `admin@tupanaderia.com` ✅
- NO: `Admin@tupanaderia.com` ❌ (mayúscula)
- NO: `admin@tupanaderia.com ` ❌ (espacio al final)

---

## 🛠️ Soluciones según el Problema

### Solución A: La colección admin_users NO existe

**Necesitas crearla manualmente:**

1. En Firestore Database, haz clic en **"+ Iniciar colección"**
2. ID de colección: `admin_users`
3. Clic en **"Siguiente"**
4. ID del documento: Tu email exacto (ejemplo: `admin@tupanaderia.com`)
5. Agrega estos campos:

| Campo | Tipo | Valor |
|-------|------|-------|
| isAdmin | boolean | true |
| email | string | admin@tupanaderia.com |
| createdAt | timestamp | (fecha actual) |

6. Clic en **"Guardar"**
7. Recarga la aplicación
8. Intenta hacer login de nuevo

---

### Solución B: El documento existe pero el email no coincide

**Opción 1: Corregir el documento en Firestore**
1. Ve a Firestore → `admin_users`
2. **Elimina** el documento incorrecto
3. Crea uno nuevo con el email EXACTO de Authentication

**Opción 2: Crear nuevo usuario con el email correcto**
1. Ve a Authentication → Users
2. Crea un nuevo usuario con el email que SÍ está en `admin_users`

---

### Solución C: El campo isAdmin no es boolean

1. Ve a Firestore → `admin_users` → tu documento
2. Haz clic en el campo `isAdmin`
3. Verifica que dice **"boolean"** y no **"string"**
4. Si es string, elimina el campo y créalo de nuevo como boolean con valor `true`

---

## ✅ Verificar que Funciona

Después de aplicar la solución:

1. **Cierra sesión** si estás logueado
2. **Recarga la página** (Ctrl + R o F5)
3. Haz clic en **"🔐 Admin"**
4. Ingresa email y contraseña
5. Abre la consola (F12) y mira los mensajes

**Resultado esperado:**
- ✅ El modal de login se cierra
- ✅ Aparece un badge **"👤 Admin"** en la esquina superior derecha
- ✅ Ves controles de admin en cada producto (toggle de disponibilidad, botón editar precio)
- ✅ Ves un botón **"+ Agregar Producto"** en el catálogo
- ✅ NO ves el botón del carrito flotante (los admins no lo necesitan)

---

## 🔍 Otras Verificaciones

### Verificar las Reglas de Firestore

1. Ve a Firestore Database → Pestaña **"Reglas"**
2. Asegúrate de que tengas estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/admin_users/$(request.auth.token.email));
    }

    match /products/{product} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /admin_users/{email} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
  }
}
```

3. Si las reglas son diferentes, reemplázalas con las de arriba
4. Haz clic en **"Publicar"**

---

## 📊 Resumen del Flujo Correcto

```
Usuario hace login
    ↓
Firebase Authentication verifica email/password ✅
    ↓
App.jsx recibe el usuario autenticado
    ↓
App.jsx llama a isUserAdmin(email)
    ↓
isUserAdmin busca el email en Firestore → admin_users/{email}
    ↓
¿Existe el documento Y isAdmin === true?
    ↓
SÍ → setIsAdmin(true) → Muestra controles de admin ✅
NO → setIsAdmin(false) → NO muestra controles ❌
```

---

## 📞 ¿Necesitas Ayuda Adicional?

Si después de seguir todos los pasos aún no funciona:

1. Comparte qué mensajes ves en la consola del navegador (F12)
2. Toma una captura de pantalla de tu colección `admin_users` en Firestore
3. Verifica que tengas conexión a internet
4. Intenta cerrar todas las pestañas y abrir una nueva

---

## 💡 Tips Adicionales

- Usa siempre minúsculas para los emails
- No agregues espacios al inicio o final
- El ID del documento en Firestore debe ser el email completo
- Firebase diferencia entre mayúsculas y minúsculas
- Asegúrate de estar usando el proyecto correcto en Firebase Console
