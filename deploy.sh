#!/bin/bash

echo "🚀 Iniciando proceso de despliegue..."

# Limpiar cachés
echo "🧹 Limpiando cachés..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Compilar assets
echo "📦 Compilando assets frontend..."
npm run build

# Optimizar para producción
echo "⚡ Optimizando para producción..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ejecutar migraciones (si las hay)
echo "📊 Ejecutando migraciones..."
php artisan migrate --force

echo "✅ Despliegue completado!"
echo ""
echo "⚠️  IMPORTANTE: Si los títulos aún no funcionan, ejecuta:"
echo "   php artisan config:clear && php artisan config:cache"
echo ""
echo "Verifica los títulos de página:"
echo "  - Landing (/): AJ & LEX"
echo "  - AJ (/aj): AJ & LEX"
echo "  - Lex (/lex): AJ & LEX"
echo ""
echo "Todas las páginas deben mostrar 'AJ & LEX' en la pestaña del navegador."

