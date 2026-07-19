#!/bin/bash
# =====================================================
# SETUP.SH - Instalación completa del proyecto
# Bombas de Calor LATAM - B2B SaaS
# =====================================================

echo "🌡️  Bombas de Calor LATAM - Setup"
echo "===================================="

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no encontrado. Instálalo primero:"
    echo "   https://nodejs.org/ (versión 20+)"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Node.js 20+ requerido. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v)"

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "❌ Git no encontrado. Instálalo primero."
    exit 1
fi
echo "✅ Git $(git --version)"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

# Crear archivo .env.local si no existe
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creando .env.local..."
    cp .env.example .env.local
    echo "⚠️  EDITA .env.local con tus credenciales de Supabase:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
fi

# Crear carpetas necesarias
mkdir -p public/images/products
mkdir -p public/images/hero
mkdir -p public/docs

echo ""
echo "✅ Setup completo!"
echo ""
echo "🚀 Próximos pasos:"
echo "   1. Edita .env.local con tus credenciales"
echo "   2. Ejecuta el SQL en Supabase (supabase/migrations/001_initial_schema.sql)"
echo "   3. npm run dev  ← para iniciar en localhost:3000"
echo ""
echo "📚 Lee README.md para más detalles."
