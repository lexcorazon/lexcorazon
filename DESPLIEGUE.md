# Instrucciones de Despliegue

## Después de actualizar el código en producción

Cuando hagas cambios en la configuración, rutas, o vistas, necesitas ejecutar estos comandos en el servidor:

### 1. Limpiar cachés de Laravel

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### 2. Optimizar para producción (opcional pero recomendado)

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. Compilar assets de frontend

Si actualizaste archivos JS/CSS:

```bash
npm run build
```

## Problema específico: Títulos de página

Si los títulos de página siguen mostrando "Alejandra Jaime" o "${APP_NAME}" después de los cambios:

1. Asegúrate de que el archivo `app/Http/Middleware/HandleInertiaRequests.php` tenga:
   ```php
   protected $titleTemplate = '%s';
   ```

2. Ejecuta en el servidor:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

3. Reinicia el servidor web (si usas servicios como PHP-FPM):
   ```bash
   sudo systemctl restart php8.2-fpm  # ajusta la versión de PHP
   ```

## Variables de entorno importantes

Asegúrate de que tu archivo `.env` en producción NO tenga valores incorrectos para:

```env
APP_NAME=LexCorazon
```

Aunque con el `titleTemplate = '%s'` configurado, esto no debería afectar los títulos de página.

## Verificación

Después de ejecutar los comandos, verifica que los títulos sean:
- **Landing** (`/`): "AJ & Lex"
- **Página AJ** (`/aj`): "AJ"
- **Página Lex** (`/lex`): "Lex"

## Si sigues teniendo problemas

1. Verifica que los cambios en `HandleInertiaRequests.php` estén en el servidor
2. Comprueba que `resources/views/app.blade.php` tenga `@inertiaHead` correctamente
3. Revisa los logs de Laravel: `storage/logs/laravel.log`

