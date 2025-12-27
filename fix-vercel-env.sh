#!/bin/bash

echo "🔧 Configurando variables de entorno en Vercel..."
echo ""

# VITE_FIREBASE_API_KEY
echo "📝 VITE_FIREBASE_API_KEY"
npx vercel env add VITE_FIREBASE_API_KEY production plain <<EOF
AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc
EOF

npx vercel env add VITE_FIREBASE_API_KEY preview plain <<EOF
AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc
EOF

npx vercel env add VITE_FIREBASE_API_KEY development plain <<EOF
AIzaSyAedlTSSSn1wo655520H-_mmpJLoYuK-Vc
EOF

# VITE_FIREBASE_AUTH_DOMAIN
echo "📝 VITE_FIREBASE_AUTH_DOMAIN"
npx vercel env add VITE_FIREBASE_AUTH_DOMAIN production plain <<EOF
catalogo-panaderia-addd7.firebaseapp.com
EOF

npx vercel env add VITE_FIREBASE_AUTH_DOMAIN preview plain <<EOF
catalogo-panaderia-addd7.firebaseapp.com
EOF

npx vercel env add VITE_FIREBASE_AUTH_DOMAIN development plain <<EOF
catalogo-panaderia-addd7.firebaseapp.com
EOF

# VITE_FIREBASE_PROJECT_ID
echo "📝 VITE_FIREBASE_PROJECT_ID"
npx vercel env add VITE_FIREBASE_PROJECT_ID production plain <<EOF
catalogo-panaderia-addd7
EOF

npx vercel env add VITE_FIREBASE_PROJECT_ID preview plain <<EOF
catalogo-panaderia-addd7
EOF

npx vercel env add VITE_FIREBASE_PROJECT_ID development plain <<EOF
catalogo-panaderia-addd7
EOF

# VITE_FIREBASE_STORAGE_BUCKET
echo "📝 VITE_FIREBASE_STORAGE_BUCKET"
npx vercel env add VITE_FIREBASE_STORAGE_BUCKET production plain <<EOF
catalogo-panaderia-addd7.firebasestorage.app
EOF

npx vercel env add VITE_FIREBASE_STORAGE_BUCKET preview plain <<EOF
catalogo-panaderia-addd7.firebasestorage.app
EOF

npx vercel env add VITE_FIREBASE_STORAGE_BUCKET development plain <<EOF
catalogo-panaderia-addd7.firebasestorage.app
EOF

# VITE_FIREBASE_MESSAGING_SENDER_ID
echo "📝 VITE_FIREBASE_MESSAGING_SENDER_ID"
npx vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production plain <<EOF
920728414780
EOF

npx vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID preview plain <<EOF
920728414780
EOF

npx vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID development plain <<EOF
920728414780
EOF

# VITE_FIREBASE_APP_ID
echo "📝 VITE_FIREBASE_APP_ID"
npx vercel env add VITE_FIREBASE_APP_ID production plain <<EOF
1:920728414780:web:94c52670f31001df627139
EOF

npx vercel env add VITE_FIREBASE_APP_ID preview plain <<EOF
1:920728414780:web:94c52670f31001df627139
EOF

npx vercel env add VITE_FIREBASE_APP_ID development plain <<EOF
1:920728414780:web:94c52670f31001df627139
EOF

# VITE_FIREBASE_MEASUREMENT_ID
echo "📝 VITE_FIREBASE_MEASUREMENT_ID"
npx vercel env add VITE_FIREBASE_MEASUREMENT_ID production plain <<EOF
G-501HB9Y7CM
EOF

npx vercel env add VITE_FIREBASE_MEASUREMENT_ID preview plain <<EOF
G-501HB9Y7CM
EOF

npx vercel env add VITE_FIREBASE_MEASUREMENT_ID development plain <<EOF
G-501HB9Y7CM
EOF

echo ""
echo "✅ ¡Listo! Variables configuradas."
echo ""
echo "🚀 Ahora ejecuta: npx vercel --prod"
