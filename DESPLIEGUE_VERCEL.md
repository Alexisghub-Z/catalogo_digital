# 🚀 Guía de Despliegue en Vercel

## 📋 Configuración de Variables de Entorno en Vercel

### Paso 1: Acceder a la Configuración del Proyecto

1. Ve a https://vercel.com/
2. Inicia sesión con tu cuenta
3. Haz clic en tu proyecto (catalogo-panaderia o el nombre que le hayas dado)
4. Ve a **Settings** (Configuración)
5. En el menú lateral, haz clic en **Environment Variables**

### Paso 2: Agregar las Variables de Firebase

Debes agregar estas 7 variables una por una:

#### Variable 1: VITE_FIREBASE_API_KEY
- **Key:** `VITE_FIREBASE_API_KEY`
- **Value:** `AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc`
- **Environments:** Selecciona todas (Production, Preview, Development)
- Haz clic en **Add**

#### Variable 2: VITE_FIREBASE_AUTH_DOMAIN
- **Key:** `VITE_FIREBASE_AUTH_DOMAIN`
- **Value:** `catalogo-panaderia-addd7.firebaseapp.com`
- **Environments:** Selecciona todas
- Haz clic en **Add**

#### Variable 3: VITE_FIREBASE_PROJECT_ID
- **Key:** `VITE_FIREBASE_PROJECT_ID`
- **Value:** `catalogo-panaderia-addd7`
- **Environments:** Selecciona todas
- Haz clic en **Add**

#### Variable 4: VITE_FIREBASE_STORAGE_BUCKET
- **Key:** `VITE_FIREBASE_STORAGE_BUCKET`
- **Value:** `catalogo-panaderia-addd7.firebasestorage.app`
- **Environments:** Selecciona todas
- Haz clic en **Add**

#### Variable 5: VITE_FIREBASE_MESSAGING_SENDER_ID
- **Key:** `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** `920728414780`
- **Environments:** Selecciona todas
- Haz clic en **Add**

#### Variable 6: VITE_FIREBASE_APP_ID
- **Key:** `VITE_FIREBASE_APP_ID`
- **Value:** `1:920728414780:web:94c52670f31001df627139`
- **Environments:** Selecciona todas
- Haz clic en **Add**

#### Variable 7: VITE_FIREBASE_MEASUREMENT_ID
- **Key:** `VITE_FIREBASE_MEASUREMENT_ID`
- **Value:** `G-501HB9Y7CM`
- **Environments:** Selecciona todas
- Haz clic en **Add**

### Paso 3: Re-desplegar el Proyecto

Después de agregar todas las variables:

1. Ve a la pestaña **Deployments** en Vercel
2. Haz clic en los 3 puntos (⋮) del último deployment
3. Selecciona **Redeploy**
4. Confirma el re-despliegue

O simplemente:
1. Haz un commit y push de tus cambios al repositorio
2. Vercel automáticamente hará un nuevo despliegue con las variables configuradas

---

## 🔧 Alternativa: Copiar/Pegar Rápido

Si prefieres copiar y pegar todas las variables de una vez:

```
VITE_FIREBASE_API_KEY=AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc
VITE_FIREBASE_AUTH_DOMAIN=catalogo-panaderia-addd7.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=catalogo-panaderia-addd7
VITE_FIREBASE_STORAGE_BUCKET=catalogo-panaderia-addd7.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=920728414780
VITE_FIREBASE_APP_ID=1:920728414780:web:94c52670f31001df627139
VITE_FIREBASE_MEASUREMENT_ID=G-501HB9Y7CM
```

Copia este bloque y pégalo en un lugar seguro para agregarlas a Vercel.

---

## ✅ Verificar que Funciona

Después del despliegue:

1. Abre tu sitio en Vercel (el URL que te dio Vercel, ejemplo: `tu-proyecto.vercel.app`)
2. Abre la consola del navegador (F12)
3. Verifica que NO veas errores de Firebase
4. Intenta hacer login como administrador
5. Debería funcionar correctamente

---

## 🔍 Solución de Problemas

### "Firebase not configured" en Vercel

**Causa:** Las variables de entorno no se cargaron correctamente.

**Solución:**
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que todas las 7 variables estén agregadas
3. Verifica que NO haya espacios al inicio o final de los valores
4. Re-despliega el proyecto

### Las variables no aparecen en el build

**Causa:** En Vite, las variables deben empezar con `VITE_`

**Solución:**
- ✅ CORRECTO: `VITE_FIREBASE_API_KEY`
- ❌ INCORRECTO: `FIREBASE_API_KEY`

Todas las variables ya tienen el prefijo `VITE_` así que deberían funcionar.

### Error "import.meta.env is undefined"

**Causa:** Estás usando una versión vieja de Vite o las variables no están configuradas.

**Solución:**
1. Verifica que estés usando Vite 4+ (revisa `package.json`)
2. Asegúrate de que las variables en Vercel tengan el prefijo `VITE_`

---

## 📝 Comandos para Verificar Localmente

Antes de desplegar, puedes probar localmente:

```bash
# Verificar que las variables se carguen
npm run dev
```

La aplicación debería funcionar correctamente con el archivo `.env` que creamos.

---

## 🔒 Seguridad

**¿Es seguro exponer estas claves?**

✅ **SÍ**, las claves de configuración de Firebase (API Key, Project ID, etc.) están diseñadas para ser públicas.

🔐 **La seguridad real está en:**
- Las reglas de Firestore (que ya configuraste)
- Las reglas de Authentication
- La verificación de admin en `admin_users`

Estas claves solo permiten **conectarse** a Firebase, pero las **reglas de seguridad** controlan qué puede hacer cada usuario.

---

## 📚 Recursos

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)

---

¿Listo para desplegar? 🚀
