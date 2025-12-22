# Catálogo Digital - Panadería & Cafetería

## 🚀 Proyecto Completado

Tu catálogo digital está listo y funcionando en: **http://localhost:5176/**

## 🔐 Panel de Administrador con Firebase

**IMPORTANTE:** Este proyecto incluye un panel de administrador integrado que te permite:
- ✅ Activar/desactivar productos en tiempo real
- ✅ Editar precios desde cualquier dispositivo
- ✅ Los cambios se sincronizan instantáneamente para todos los clientes
- ✅ Login seguro con email/contraseña

### ¿Cómo configurar Firebase?

**Sigue las instrucciones detalladas en:** `FIREBASE_SETUP.md`

Es un proceso de ~15-20 minutos que incluye:
1. Crear proyecto gratuito en Firebase
2. Configurar autenticación
3. Configurar base de datos Firestore
4. Crear usuario administrador
5. Importar productos

**Si NO configuras Firebase:**
- El catálogo funcionará normalmente con datos locales
- NO tendrás panel de administrador
- Los productos no se podrán activar/desactivar

---

## ⚙️ Configuración Importante

### Configurar el número de WhatsApp

Antes de usar en producción, debes cambiar el número de WhatsApp:

1. Abre el archivo: `src/utils/whatsapp.js`
2. En la línea 2, cambia el número:

```javascript
const WHATSAPP_NUMBER = '5212288888888'; // Cambia por tu número
```

**Formato del número:**
- Código de país (México: 52)
- Número completo sin espacios, guiones ni paréntesis
- Ejemplo para México: `5219876543210`
- Ejemplo para otros países: `1234567890` (código país + número)

## 📦 Productos Incluidos

### Croissants Rellenos (8 variedades):
- Chocolate ($25)
- Nutella ($28)
- Jamón y Queso ($30)
- Cajeta ($26)
- Fresa ($27)
- Manzana ($27)
- Queso Crema ($29)
- Piña ($27)

### Roles de Canela (3 variedades):
- Clásico ($22)
- Con Nuez ($25)
- XL ($35)

### Café por Kilo (4 variedades):
- Americano ($250/kg)
- Colombiano ($320/kg)
- Orgánico ($380/kg)
- Descafeinado ($290/kg)

## ✏️ Personalización

### Cambiar productos
Edita: `src/data/products.js`

### Cambiar colores
Edita las variables CSS en: `src/index.css` (líneas 12-17)

### Cambiar nombre de la tienda
Edita: `src/App.jsx` (línea 13)

## 🛠️ Comandos

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Crear versión de producción
npm run preview  # Vista previa de producción
```

## 📱 Funcionalidades

### Para Clientes:
✅ Catálogo de productos con imágenes
✅ Filtro por categorías (Todos, Croissants, Roles, Café)
✅ **Carrito de compras** con contador de items
✅ Agregar/eliminar productos del carrito
✅ Controles de cantidad (+/-)
✅ Cálculo automático de subtotales y total
✅ Botón flotante del carrito con badge de notificación
✅ Panel lateral del carrito con animaciones
✅ **Envío completo del pedido por WhatsApp** con todos los productos
✅ Mensaje formateado con cantidades, precios y total
✅ Productos agotados visibles pero no ordenables
✅ Diseño responsive (móvil y desktop)
✅ CSS puro (sin frameworks)

### Para Administradores:
✅ **Panel de admin integrado en el catálogo**
✅ Login seguro con Firebase Authentication
✅ **Activar/desactivar productos** en tiempo real
✅ **Editar precios** desde cualquier dispositivo
✅ Sincronización instantánea con Firebase
✅ Cambios visibles para todos los clientes inmediatamente
✅ Sin necesidad de recargar la página
✅ Acceso desde móvil, tablet o computadora

## 🛒 Cómo funciona el carrito

1. El usuario navega por el catálogo y hace clic en "Agregar 🛒" en los productos
2. Los productos se acumulan en el carrito (botón flotante inferior derecho)
3. El badge muestra la cantidad total de items
4. Al abrir el carrito, puede:
   - Ver todos los productos agregados
   - Aumentar/disminuir cantidades con los botones +/-
   - Eliminar productos individuales
   - Ver el total calculado automáticamente
5. Al finalizar, presiona "Enviar Pedido por WhatsApp"
6. Se abre WhatsApp con un mensaje formateado que incluye:
   - Lista completa de productos con cantidades
   - Precio unitario de cada item
   - Subtotal por producto
   - Total general del pedido

## 👤 Cómo usar el Panel de Administrador

### Para acceder como admin:

1. Haz clic en el botón **"🔐 Admin"** en la esquina superior derecha
2. Ingresa tu email y contraseña (configurados en Firebase)
3. Una vez dentro verás:
   - Badge **"👤 Admin"** en el header
   - Botón **"Cerrar sesión"**
   - Controles especiales en cada producto

### Controles de administrador en productos:

Cada producto muestra:

**Toggle de Disponibilidad:**
- ✅ Verde = Disponible (clientes pueden ordenar)
- ⛔ Rojo = Agotado (se muestra en gris con badge "AGOTADO")
- Los cambios son instantáneos para todos

**Editar Precio:**
- Clic en "✏️ Editar precio"
- Ingresa el nuevo precio
- ✓ para guardar o ✕ para cancelar
- Los cambios se actualizan en tiempo real

### Vista del cliente cuando un producto está agotado:

- Tarjeta en gris con opacidad reducida
- Badge rojo "⛔ AGOTADO" en la esquina
- Botón deshabilitado "No disponible"
- No se puede agregar al carrito
