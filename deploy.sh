#!/bin/bash

echo "🚀 Iniciando proceso de despliegue..."

# Limpiar cachés
echo "🧹 Limpiando cachés..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

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
echo "Verifica los títulos de página:"
echo "  - Landing (/): AJ & Lex"
echo "  - AJ (/aj): AJ"
echo "  - Lex (/lex): Lex"

