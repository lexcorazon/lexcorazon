# 📧 Configuración de Email para Lex Corazón

## Problema Resuelto

Se han corregido los siguientes issues en el código:
- ✅ El `BookingController` ahora usa correctamente la clase `LexBookingMail`
- ✅ La clase `LexBookingMail` usa la vista correcta (`lex_booking.blade.php`)
- ✅ Se agregaron logs para debugging

## 🔧 Configuración Necesaria en .env

Para que los emails se envíen correctamente, necesitas configurar tu archivo `.env` con los datos SMTP.

### Opción 1: Gmail (Recomendado)

Agrega o reemplaza estas líneas en tu `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password-aqui
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu-email@gmail.com
MAIL_FROM_NAME="Lex Corazón"
```

### 📝 Pasos para obtener la contraseña de aplicación de Gmail:

1. Ve a tu cuenta de Google
2. Activa la **verificación en 2 pasos** (si no la tienes activada)
3. Ve a: https://myaccount.google.com/apppasswords
4. Selecciona **"Correo"** y el dispositivo que uses
5. Google generará una contraseña de 16 caracteres
6. Copia esa contraseña y pégala en `MAIL_PASSWORD`
7. ⚠️ **NO uses tu contraseña normal de Gmail**

---

### Opción 2: Mailtrap (Para Testing)

Si quieres probar primero sin usar tu email real:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=tu-username-mailtrap
MAIL_PASSWORD=tu-password-mailtrap
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lexcorazon.com
MAIL_FROM_NAME="Lex Corazón"
```

1. Crea una cuenta gratis en: https://mailtrap.io
2. Ve a tu inbox de prueba
3. Copia las credenciales SMTP
4. Los emails no se enviarán realmente, pero podrás verlos en Mailtrap

---

### Opción 3: SendGrid (Producción profesional)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=tu-sendgrid-api-key
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lexcorazon.com
MAIL_FROM_NAME="Lex Corazón"
```

---

## 🧪 Probar la Configuración

Después de configurar tu `.env`:

1. **Reinicia el servidor** (importante):
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

2. **Prueba enviando el formulario** desde tu web

3. **Revisa los logs** si algo falla:
   ```bash
   # Windows PowerShell
   Get-Content storage/logs/laravel.log -Tail 50

   # O abre el archivo directamente en:
   storage/logs/laravel.log
   ```

---

## 🐛 Debugging

Si sigues sin recibir emails:

1. **Verifica que el archivo `.env` tenga la configuración correcta**
2. **Asegúrate de haber reiniciado el servidor**
3. **Revisa los logs** en `storage/logs/laravel.log`
4. **Verifica la consola del navegador** para ver si hay errores JavaScript
5. **Verifica la respuesta del servidor** en la pestaña Network de las DevTools

---

## 📬 Email de Destino

El email se está enviando a: **lexcorazon@gmail.com**

Si quieres cambiarlo, edita el archivo:
`app/Http/Controllers/BookingController.php` en la línea 19

---

## ✅ Checklist Final

- [ ] Configuré las variables MAIL_* en mi `.env`
- [ ] Ejecuté `php artisan config:clear`
- [ ] Reinicié el servidor de desarrollo
- [ ] Probé enviar el formulario
- [ ] Revisé mi bandeja de entrada (y spam)
- [ ] Si falló, revisé `storage/logs/laravel.log`

