# 🔒 Configuración de Seguridad - Sistema de Administradores

## ⚠️ IMPORTANTE: Configuración Obligatoria

Tu aplicación ahora tiene un **sistema de seguridad** que previene que cualquier usuario se convierta en administrador. Debes configurarlo correctamente en Firebase.

---

## 🛡️ Cómo Funciona la Seguridad

### Antes (INSEGURO):
❌ Cualquier usuario autenticado = Admin
❌ Cualquiera podía modificar/eliminar productos

### Ahora (SEGURO):
✅ Solo usuarios en lista de admins = Admin
✅ Firestore verifica permisos antes de permitir cambios
✅ Usuarios no autorizados no pueden modificar nada

---

## 📋 Configuración Paso a Paso

### Paso 1: Crear Colección de Administradores

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Firestore Database** (menú izquierdo)
4. Haz clic en **"Iniciar colección"** (o **"+ Agregar colección"** si ya tienes colecciones)
5. ID de colección: `admin_users`
6. Haz clic en **"Siguiente"**

---

### Paso 2: Agregar tu Email como Admin

7. **ID de documento:** Ingresa tu email completo (ejemplo: `admin@tupanaderia.com`)
   - **IMPORTANTE:** Usa exactamente el mismo email que usas para hacer login
   - Todo en minúsculas

8. Agrega estos campos:

   | Campo | Tipo | Valor |
   |-------|------|-------|
   | isAdmin | boolean | true |
   | email | string | admin@tupanaderia.com |
   | createdAt | timestamp | (fecha actual) |

9. Haz clic en **"Guardar"**

**Así debe verse:**
```
Colección: admin_users
└── Documento: admin@tupanaderia.com
    ├── isAdmin: true
    ├── email: "admin@tupanaderia.com"
    └── createdAt: December 21, 2025 at 10:00:00 AM
```

---

### Paso 3: Agregar Más Administradores (Opcional)

Para agregar otro admin:

1. En la colección `admin_users`, haz clic en **"Agregar documento"**
2. ID de documento: email del nuevo admin (ejemplo: `gerente@tupanaderia.com`)
3. Campos:
   - `isAdmin`: true (boolean)
   - `email`: gerente@tupanaderia.com (string)
   - `createdAt`: (timestamp actual)
4. Guardar

---

### Paso 4: Actualizar Reglas de Firestore

**CRÍTICO:** Debes actualizar las reglas de seguridad de Firestore.

1. En Firestore Database, ve a la pestaña **"Reglas"**
2. **Reemplaza COMPLETAMENTE** las reglas con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Función para verificar si un usuario es admin
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/admin_users/$(request.auth.token.email));
    }

    // Productos: Todos pueden leer, solo admins pueden escribir
    match /products/{product} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Lista de admins: Solo admins pueden leer/modificar
    match /admin_users/{email} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
  }
}
```

3. Haz clic en **"Publicar"**
4. Espera el mensaje de confirmación ✅

---

## ✅ Verificar que Funciona

### Test 1: Login como Admin
1. Cierra sesión si estás logueado
2. Haz clic en "🔐 Admin"
3. Ingresa el email que agregaste en `admin_users`
4. ✅ Deberías ver los controles de admin

### Test 2: Login como Usuario Normal
1. Cierra sesión
2. Crea un nuevo usuario en Firebase Authentication (email diferente al de `admin_users`)
3. Intenta hacer login con ese usuario
4. ✅ Deberías ver un mensaje en consola: "Usuario no autorizado como administrador"
5. ✅ NO deberías ver controles de admin

### Test 3: Verificar Reglas de Firestore
1. Abre las **Developer Tools** del navegador (F12)
2. Ve a la pestaña **Console**
3. Intenta hacer login con un usuario NO admin
4. ✅ Si intentara modificar productos, Firestore rechazaría la operación

---

## 🚨 Solución de Problemas

### "No veo controles de admin después de hacer login"

**Causa:** Tu email no está en la colección `admin_users` o está mal escrito.

**Solución:**
1. Ve a Firestore → Colección `admin_users`
2. Verifica que existe un documento con tu email EXACTO
3. El email debe estar en **minúsculas**
4. Verifica que el campo `isAdmin` sea `true` (boolean, no string)

---

### "Error de permisos al modificar productos"

**Causa:** Las reglas de Firestore no están actualizadas.

**Solución:**
1. Ve a Firestore → Pestaña "Reglas"
2. Copia y pega EXACTAMENTE las reglas del Paso 4
3. Haz clic en "Publicar"
4. Refresca la aplicación

---

### "Puedo hacer login pero dice 'Usuario no autorizado'"

**Causa:** El email en Authentication no coincide con el de `admin_users`.

**Solución:**
1. Ve a Authentication → Users
2. Copia el email EXACTO del usuario
3. Ve a Firestore → `admin_users`
4. Verifica que exista un documento con ese email exacto
5. Si no existe, créalo como se indica en el Paso 2

---

## 📊 Estructura de Datos Completa

```
Firestore Database
│
├── admin_users (colección)
│   ├── admin@tupanaderia.com (documento)
│   │   ├── isAdmin: true
│   │   ├── email: "admin@tupanaderia.com"
│   │   └── createdAt: timestamp
│   │
│   └── gerente@tupanaderia.com (documento)
│       ├── isAdmin: true
│       ├── email: "gerente@tupanaderia.com"
│       └── createdAt: timestamp
│
└── products (colección)
    ├── abc123 (documento)
    │   ├── name: "Croissant de Chocolate"
    │   ├── category: "croissants"
    │   ├── price: 25
    │   ├── description: "..."
    │   ├── image: "🥐"
    │   └── available: true
    │
    └── def456 (documento)
        └── ...
```

---

## 🔐 Nivel de Seguridad Actual

Con esta configuración tienes:

✅ **Autenticación de usuario** (Firebase Auth)
✅ **Verificación de admin** (Firestore Collection)
✅ **Reglas de seguridad** (Firestore Rules)
✅ **Validación en frontend** (React)
✅ **Validación en backend** (Firestore)

**Esto previene:**
- ❌ Usuarios no autenticados modificando productos
- ❌ Usuarios autenticados NO-admin modificando productos
- ❌ Manipulación directa de la base de datos sin permisos
- ❌ Ataques desde consola del navegador

---

## 💡 Recomendaciones Adicionales

### Para Mayor Seguridad:

1. **Usa contraseñas fuertes** para las cuentas de admin
2. **No compartas** las credenciales de admin
3. **Revisa regularmente** la lista de admins en Firestore
4. **Monitorea** los logs de Firebase para detectar actividad sospechosa

### Para Agregar Más Seguridad (Avanzado):

- Implementar autenticación de dos factores (2FA)
- Usar Firebase Security Rules testing
- Implementar rate limiting
- Agregar logs de auditoría

---

## 📚 Referencias

- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Best Practices](https://firebase.google.com/docs/firestore/security/rules-conditions)

---

**¿Necesitas ayuda?** Revisa la sección de solución de problemas o contacta al desarrollador.
