#!/bin/bash

# Script para configurar variables de entorno en Vercel
# Uso: ./setup-vercel-env.sh

echo "🚀 Configurando variables de entorno en Vercel..."
echo ""

# Usar Vercel CLI local (npx vercel)
VERCEL_CMD="npx vercel"

# Verificar que node_modules exista
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules no encontrado. Ejecutando npm install..."
    npm install
fi

# Leer el archivo .env
if [ ! -f .env ]; then
    echo "❌ Error: No se encontró el archivo .env"
    echo "Crea el archivo .env con tus credenciales de Firebase"
    exit 1
fi

echo "✅ Archivo .env encontrado"
echo ""
echo "Las siguientes variables se configurarán en Vercel:"
echo ""

# Leer y mostrar las variables
while IFS='=' read -r key value; do
    # Ignorar líneas vacías y comentarios
    if [[ ! -z "$key" ]] && [[ ! "$key" =~ ^# ]]; then
        echo "  - $key"
    fi
done < .env

echo ""
read -p "¿Continuar? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelado."
    exit 0
fi

echo ""
echo "Configurando variables en Vercel..."
echo ""

# Configurar cada variable en Vercel
while IFS='=' read -r key value; do
    # Ignorar líneas vacías y comentarios
    if [[ ! -z "$key" ]] && [[ ! "$key" =~ ^# ]]; then
        # Remover espacios y comillas
        value=$(echo "$value" | xargs)

        echo "📝 Configurando: $key"
        $VERCEL_CMD env add "$key" production <<< "$value" > /dev/null 2>&1
        $VERCEL_CMD env add "$key" preview <<< "$value" > /dev/null 2>&1
        $VERCEL_CMD env add "$key" development <<< "$value" > /dev/null 2>&1
    fi
done < .env

echo ""
echo "✅ Variables configuradas exitosamente!"
echo ""
echo "🔄 Ahora ejecuta: npx vercel --prod"
echo "   Para re-desplegar tu aplicación con las nuevas variables"
echo ""
echo "O usa: npm run vercel:deploy"
