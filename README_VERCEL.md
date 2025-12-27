# 🚀 Despliegue Automático en Vercel

## Método Rápido con Script (Recomendado)

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Configurar Variables de Entorno Automáticamente

```bash
npm run vercel:env
```

Este script:
- ✅ Lee tu archivo `.env`
- ✅ Configura todas las variables en Vercel automáticamente
- ✅ Las aplica a Production, Preview y Development

### Paso 4: Desplegar

```bash
npm run vercel:deploy
```

O simplemente:

```bash
vercel --prod
```

---

## Método Manual (Sin CLI)

Si no quieres instalar Vercel CLI:

1. Ve a https://vercel.com/dashboard
2. Haz clic en tu proyecto
3. Settings → Environment Variables
4. Agrega estas variables una por una:

```
VITE_FIREBASE_API_KEY=AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc
VITE_FIREBASE_AUTH_DOMAIN=catalogo-panaderia-addd7.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=catalogo-panaderia-addd7
VITE_FIREBASE_STORAGE_BUCKET=catalogo-panaderia-addd7.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=920728414780
VITE_FIREBASE_APP_ID=1:920728414780:web:94c52670f31001df627139
VITE_FIREBASE_MEASUREMENT_ID=G-501HB9Y7CM
```

5. Marca las 3 opciones: Production, Preview, Development
6. Ve a Deployments → Redeploy

---

## Verificar que Funcionó

Después del despliegue:

1. Abre tu sitio: https://catalogo-digital-jade.vercel.app
2. Abre la consola (F12)
3. Ya NO deberías ver `auth/invalid-api-key`
4. Intenta hacer login

---

## Solución de Problemas

### Error: "vercel: command not found"

```bash
npm install -g vercel
```

### Las variables no se aplican

Después de agregar variables, debes re-desplegar:

```bash
vercel --prod
```

O desde la web: Deployments → Redeploy

---

## Archivos Importantes

- `vercel.json` - Configuración del proyecto en Vercel
- `.env` - Variables locales (NO se sube a Git)
- `.env.example` - Plantilla de variables
- `setup-vercel-env.sh` - Script para configurar variables automáticamente
