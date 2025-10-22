# Guía: Crear Productos en Stripe para Lex Corazón

## 📋 Productos a Crear

Necesitas crear **9 productos** en total en tu dashboard de Stripe. Aquí está la lista completa con todos los detalles:

---

### 🔮 SESIONES INDIVIDUALES

#### 1. Carta Natal
- **Nombre del producto**: Carta Natal - Sesión de Coaching Astrológico
- **Descripción**: Lectura profunda de carta natal para comprender patrones internos, talentos y desafíos vitales.
- **Precio**: **100 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_CARTA_NATAL`

#### 2. Viaje a las tripas - Introspección
- **Nombre del producto**: Viaje a las tripas - Sesión Introspectiva
- **Descripción**: Explora emociones, bloqueos y apegos para reconectar con tu yo más genuino.
- **Precio**: **70 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_VIAJE_TRIPAS`

#### 3. Motín existencial - Talentos y propósito
- **Nombre del producto**: Motín Existencial - Talentos y Propósito
- **Descripción**: Identifica tus fortalezas y define un rumbo vital alineado con tu esencia.
- **Precio**: **70 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_MOTIN_EXISTENCIAL`

#### 4. Caja de cerillas - Desbloqueo creativo
- **Nombre del producto**: Caja de Cerillas - Desbloqueo Creativo
- **Descripción**: Supera bloqueos y activa tu potencial creativo con herramientas prácticas.
- **Precio**: **70 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_CAJA_CERILLAS`

#### 5. Lex ID - ADN de marca
- **Nombre del producto**: Lex ID - ADN de Marca
- **Descripción**: Define la identidad conceptual de tu marca desde tu propósito y valores.
- **Precio**: **100 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_LEX_ID`

#### 6. Aesthetic Overdose - Estética y concepto
- **Nombre del producto**: Aesthetic Overdose - Estética y Concepto
- **Descripción**: Desarrolla un universo estético coherente que comunique tu identidad.
- **Precio**: **100 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_AESTHETIC_OVERDOSE`

#### 7. Carne y hueso - Creación de producto
- **Nombre del producto**: Carne y Hueso - Creación de Producto
- **Descripción**: Materializa tu concepto en productos tangibles con dirección creativa integral.
- **Precio**: **100 EUR**
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_CARNE_HUESO`

---

### 📦 PACKS DE SESIONES

#### 8. Pack Sesiones Introspectivas
- **Nombre del producto**: Pack Sesiones Introspectivas
- **Descripción**: Incluye 3 sesiones: Viaje a las tripas, Motín existencial y Caja de cerillas (Ahorra 30€)
- **Precio**: **180 EUR** (en lugar de 210€)
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_PACK_INTROSPECTIVAS`

#### 9. Pack Sesiones de Construcción
- **Nombre del producto**: Pack Sesiones de Construcción
- **Descripción**: Incluye 3 sesiones: Lex ID, Aesthetic Overdose y Carne y hueso (Ahorra 30€)
- **Precio**: **270 EUR** (en lugar de 300€)
- **Tipo**: Pago único (One-time payment)
- **Variable ENV**: `STRIPE_PRICE_PACK_CONSTRUCCION`

---

## 📝 Pasos para Crear Cada Producto en Stripe

### Paso 1: Acceder al Dashboard
1. Inicia sesión en [https://dashboard.stripe.com/](https://dashboard.stripe.com/)
2. Ve a **Productos** en el menú lateral

### Paso 2: Crear Producto
Para cada uno de los 9 productos listados arriba:

1. Haz clic en **"+ Añadir producto"** o **"Create product"**

2. Completa los campos:
   - **Nombre**: Usa el nombre del producto indicado arriba
   - **Descripción**: Copia la descripción proporcionada
   - **Imagen**: (Opcional) Puedes subir una imagen representativa

3. En la sección de **Precios**:
   - **Modelo de precio**: Selecciona **"Standard pricing"** (precio estándar)
   - **Precio**: Ingresa el monto indicado para cada producto
   - **Moneda**: Selecciona **EUR** (Euro)
   - **Tipo de facturación**: Selecciona **"One time"** (pago único)

4. Haz clic en **"Guardar producto"** o **"Save product"**

### Paso 3: Copiar el Price ID

Después de crear cada producto:

1. El dashboard te mostrará el producto creado
2. En la sección de **Pricing**, verás un ID que comienza con `price_`
3. **Haz clic en el Price ID para copiarlo** (ejemplo: `price_1ABC2DEF3GHI4JKL5`)
4. Guarda este ID temporalmente en un bloc de notas junto con el nombre del producto

---

## ⚙️ Configurar Variables de Entorno

Una vez que hayas creado todos los productos y tengas los 9 Price IDs:

### Paso 1: Crear archivo .env

Si no tienes un archivo `.env` en la raíz de tu proyecto:

```bash
# En tu terminal, ejecuta:
cp .env.example .env
```

### Paso 2: Obtener las claves de API de Stripe

1. En el dashboard de Stripe, ve a **Developers** > **API keys**
2. Copia las siguientes claves:
   - **Publishable key** (clave pública): Comienza con `pk_test_...` o `pk_live_...`
   - **Secret key** (clave secreta): Comienza con `sk_test_...` o `sk_live_...`
     - ⚠️ Haz clic en **"Reveal test key"** para ver la clave secreta

### Paso 3: Agregar las claves al archivo .env

Abre tu archivo `.env` y busca/agrega estas líneas:

```env
# Claves de API de Stripe
STRIPE_SECRET=sk_test_TU_CLAVE_SECRETA_AQUI
STRIPE_KEY=pk_test_TU_CLAVE_PUBLICA_AQUI
```

### Paso 4: Agregar los Price IDs al archivo .env

Agrega los 9 Price IDs que copiaste de Stripe:

```env
# Price IDs de Stripe - Sesiones individuales
STRIPE_PRICE_CARTA_NATAL=price_1ABC2DEF3GHI4JKL5
STRIPE_PRICE_VIAJE_TRIPAS=price_2ABC2DEF3GHI4JKL5
STRIPE_PRICE_MOTIN_EXISTENCIAL=price_3ABC2DEF3GHI4JKL5
STRIPE_PRICE_CAJA_CERILLAS=price_4ABC2DEF3GHI4JKL5
STRIPE_PRICE_LEX_ID=price_5ABC2DEF3GHI4JKL5
STRIPE_PRICE_AESTHETIC_OVERDOSE=price_6ABC2DEF3GHI4JKL5
STRIPE_PRICE_CARNE_HUESO=price_7ABC2DEF3GHI4JKL5

# Price IDs de Stripe - Packs
STRIPE_PRICE_PACK_INTROSPECTIVAS=price_8ABC2DEF3GHI4JKL5
STRIPE_PRICE_PACK_CONSTRUCCION=price_9ABC2DEF3GHI4JKL5
```

⚠️ **Reemplaza** los valores de ejemplo (`price_1ABC...`) con tus Price IDs reales de Stripe.

---

## 🧪 Probar los Pagos

### Modo Test (Desarrollo)

Cuando uses las claves que comienzan con `sk_test_` y `pk_test_`:

1. Los pagos no serán reales
2. Puedes usar tarjetas de prueba de Stripe:
   - **Tarjeta que funciona**: `4242 4242 4242 4242`
   - **Tarjeta que falla**: `4000 0000 0000 0002`
   - **Fecha de vencimiento**: Cualquier fecha futura (ej: 12/25)
   - **CVC**: Cualquier 3 dígitos (ej: 123)
   - **Código postal**: Cualquier código (ej: 28001)

### Modo Producción (Producción)

Cuando estés listo para recibir pagos reales:

1. **Activa tu cuenta de Stripe**:
   - Ve a **Settings** > **Account details**
   - Completa todos los datos requeridos (información de negocio, datos bancarios, etc.)

2. **Crea los productos en modo producción**:
   - Repite el proceso de creación de productos (pasos anteriores)
   - Esta vez estarán en modo producción

3. **Actualiza las claves en .env**:
   - Reemplaza las claves de test por las de producción:
   - `sk_test_...` → `sk_live_...`
   - `pk_test_...` → `pk_live_...`

4. **Actualiza los Price IDs en .env**:
   - Los Price IDs de producción serán diferentes a los de test
   - Copia los nuevos Price IDs de los productos de producción

---

## ✅ Checklist de Verificación

Antes de poner en producción, verifica:

- [ ] Todos los 9 productos creados en Stripe
- [ ] Los 9 Price IDs copiados y guardados
- [ ] Archivo `.env` creado y configurado
- [ ] Claves de API de Stripe agregadas al `.env`
- [ ] Los 9 Price IDs agregados al `.env`
- [ ] Probado el flujo de pago con tarjetas de test
- [ ] Cuenta de Stripe activada (para producción)
- [ ] Productos creados en modo producción (cuando estés listo)
- [ ] Claves y Price IDs actualizados para producción

---

## 📚 Recursos Útiles

- [Dashboard de Stripe](https://dashboard.stripe.com/)
- [Documentación de Stripe](https://stripe.com/docs)
- [Tarjetas de prueba de Stripe](https://stripe.com/docs/testing)
- [Guía de activación de cuenta](https://stripe.com/docs/account/activation)

---

## 🆘 Problemas Comunes

### "No se encontró el precio configurado para esta sesión"
- Verifica que el Price ID esté correctamente copiado en el `.env`
- Asegúrate de que no hay espacios extra al principio o final
- Comprueba que el nombre de la variable coincida exactamente con el código

### "Invalid API Key provided"
- Verifica que hayas copiado la clave completa (incluye el prefijo `sk_test_` o `sk_live_`)
- Asegúrate de que estés usando la clave correcta (test vs producción)
- Verifica que no haya espacios al principio o final de la clave

### El pago se procesa pero no recibo confirmación
- Verifica que las URLs de success y cancel estén correctas
- Revisa los logs de Laravel en `storage/logs/laravel.log`
- Comprueba que el servidor esté correctamente configurado

---

## 📞 Soporte

Si tienes problemas con la configuración:
- Revisa los logs de Laravel: `storage/logs/laravel.log`
- Revisa los logs de Stripe en el dashboard
- Consulta la documentación de Stripe para más detalles

