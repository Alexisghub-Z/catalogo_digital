# 📸 Configuración de Firebase Storage para Imágenes

Firebase Storage ya está implementado en el código. Solo necesitas habilitarlo en la consola de Firebase.

## 🚀 Pasos para habilitar Firebase Storage

### Paso 1: Ir a Storage en Firebase Console

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **catalogo-panaderia-addd7**
3. En el menú lateral izquierdo, haz clic en **"Storage"**

### Paso 2: Crear el bucket de Storage

1. Haz clic en **"Comenzar"** (Get Started)
2. Te preguntará sobre las reglas de seguridad:
   - Selecciona **"Comenzar en modo de producción"**
   - Haz clic en **"Siguiente"**
3. Selecciona la ubicación (debe ser la misma que Firestore):
   - Para México: **us-central1**
   - Haz clic en **"Listo"**

### Paso 3: Configurar reglas de seguridad

1. Ve a la pestaña **"Rules"** (Reglas)
2. **Borra todo** el contenido y **pega esto**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Carpeta de productos
    match /products/{imageId} {
      // Todos pueden leer (ver las imágenes)
      allow read: if true;

      // Solo usuarios autenticados pueden escribir (subir/eliminar)
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024  // Máximo 5MB
                   && request.resource.contentType.matches('image/.*');  // Solo imágenes
    }
  }
}
```

3. Haz clic en **"Publicar"**

---

## ✅ ¡Listo! Ahora puedes subir imágenes

Desde el panel de administrador:
1. Inicia sesión como admin
2. Haz clic en **"➕ Agregar Producto"**
3. Verás una sección para **"Imagen del producto"**
4. Haz clic en el área de subida
5. Selecciona una imagen de tu computadora
6. La imagen se subirá automáticamente cuando guardes el producto

---

## 📋 Características de las imágenes:

- ✅ Formatos aceptados: JPG, PNG, WebP, GIF
- ✅ Tamaño máximo: **5 MB**
- ✅ Preview antes de subir
- ✅ URLs permanentes y seguras
- ✅ Optimización automática de Firebase
- ✅ Si no subes imagen, usa emoji por defecto

---

## 🔒 Seguridad

Las reglas configuradas permiten:
- ✅ **Lectura pública**: Todos pueden VER las imágenes de productos
- ✅ **Escritura autenticada**: Solo administradores logueados pueden SUBIR imágenes
- ✅ **Validación de tamaño**: Máximo 5MB por imagen
- ✅ **Validación de tipo**: Solo archivos de imagen

---

## 🎨 Compatibilidad

El sistema es compatible con:
- **Imágenes reales** (URLs de Firebase Storage)
- **Emojis** (si no subes imagen, usa el emoji por defecto)

Ambos se muestran correctamente en el catálogo.

---

## 💰 Límites del plan gratuito

Firebase Storage gratis incluye:
- **5 GB** de almacenamiento
- **1 GB/día** de transferencia de datos
- **50,000 descargas/día**

Para un catálogo de panadería con ~50 productos:
- Cada imagen ~500 KB
- Total: ~25 MB
- **Más que suficiente** para tu negocio

---

## 🐛 Solución de problemas

### "Error al subir imagen"
- Verifica que la imagen sea menor a 5MB
- Asegúrate de que sea un archivo de imagen válido
- Revisa las reglas de Storage en Firebase

### "Permission denied"
- Verifica que estés logueado como admin
- Revisa las reglas de Storage
- Asegúrate de haber publicado las reglas correctamente

### "La imagen no se muestra"
- Espera unos segundos después de subir
- Refresca la página
- Verifica que la URL se guardó en Firestore

---

¿Necesitas ayuda? Revisa la consola del navegador (F12) para ver errores detallados.
