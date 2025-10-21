# Configuración de Stripe para Lex Corazón

## Variables de Entorno Requeridas

Para que el sistema de pagos con Stripe funcione correctamente, necesitas agregar las siguientes variables a tu archivo `.env`:

### Claves de API de Stripe

```env
STRIPE_SECRET=sk_test_...    # Tu clave secreta de Stripe (empieza con sk_test_ o sk_live_)
STRIPE_KEY=pk_test_...       # Tu clave pública de Stripe (empieza con pk_test_ o pk_live_)
```

### Price IDs para cada Sesión

Necesitas crear productos y precios en tu dashboard de Stripe y luego copiar los Price IDs aquí:

```env
# Sesiones individuales
STRIPE_PRICE_CARTA_NATAL=price_...                    # 100€
STRIPE_PRICE_VIAJE_TRIPAS=price_...                   # 70€
STRIPE_PRICE_MOTIN_EXISTENCIAL=price_...              # 70€
STRIPE_PRICE_CAJA_CERILLAS=price_...                  # 70€
STRIPE_PRICE_LEX_ID=price_...                         # 100€
STRIPE_PRICE_AESTHETIC_OVERDOSE=price_...             # 100€
STRIPE_PRICE_CARNE_HUESO=price_...                    # 100€

# Packs de sesiones
STRIPE_PRICE_PACK_INTROSPECTIVAS=price_...            # 180€
STRIPE_PRICE_PACK_CONSTRUCCION=price_...              # 270€
```

## Cómo obtener los Price IDs

1. Accede a tu [Dashboard de Stripe](https://dashboard.stripe.com/)
2. Ve a **Productos** en el menú lateral
3. Crea un producto para cada sesión con el precio correspondiente:
   - **Carta Natal** → 100 EUR
   - **Viaje a las tripas - Introspección** → 70 EUR
   - **Motín existencial - Talentos y propósito** → 70 EUR
   - **Caja de cerillas - Desbloqueo creativo** → 70 EUR
   - **Lex ID - Adn de marca** → 100 EUR
   - **Aesthetic Overdose - Estética y concepto** → 100 EUR
   - **Carne y hueso - Creación de producto** → 100 EUR
   - **Pack Sesiones Introspectivas** → 180 EUR
   - **Pack Sesiones de Construcción** → 270 EUR

4. Una vez creado cada producto, copia el **Price ID** (empieza con `price_`)
5. Pega cada Price ID en tu archivo `.env` según corresponda

## Resumen de Precios

| Sesión | Precio | Variable ENV |
|--------|--------|--------------|
| Carta Natal | 100€ | `STRIPE_PRICE_CARTA_NATAL` |
| Viaje a las tripas | 70€ | `STRIPE_PRICE_VIAJE_TRIPAS` |
| Motín existencial | 70€ | `STRIPE_PRICE_MOTIN_EXISTENCIAL` |
| Caja de cerillas | 70€ | `STRIPE_PRICE_CAJA_CERILLAS` |
| Lex ID | 100€ | `STRIPE_PRICE_LEX_ID` |
| Aesthetic Overdose | 100€ | `STRIPE_PRICE_AESTHETIC_OVERDOSE` |
| Carne y hueso | 100€ | `STRIPE_PRICE_CARNE_HUESO` |
| Pack Introspectivas | 180€ | `STRIPE_PRICE_PACK_INTROSPECTIVAS` |
| Pack Construcción | 270€ | `STRIPE_PRICE_PACK_CONSTRUCCION` |

## Testing

Para probar los pagos en modo test:

1. Usa claves de API de test (empiezan con `sk_test_` y `pk_test_`)
2. Usa tarjetas de prueba de Stripe:
   - **Éxito**: `4242 4242 4242 4242`
   - **Fallo**: `4000 0000 0000 0002`
   - Cualquier fecha futura y cualquier CVC de 3 dígitos

## Producción

Cuando estés listo para recibir pagos reales:

1. Reemplaza las claves de API de test por las claves de producción (empiezan con `sk_live_` y `pk_live_`)
2. Crea los productos en modo producción en Stripe
3. Actualiza los Price IDs en tu archivo `.env` con los IDs de producción

## Flujo de Pago

1. Usuario hace clic en "Pagar con Stripe" en el modal de booking
2. Si es "Pack de sesiones", debe seleccionar el tipo (introspectivas o construcción)
3. Se crea una sesión de checkout en Stripe
4. Usuario es redirigido a Stripe Checkout
5. Tras pagar exitosamente, regresa a `/lex?payment=success`
6. Si cancela, regresa a `/lex?payment=cancelled`

## Soporte

- [Documentación de Stripe](https://stripe.com/docs)
- [Dashboard de Stripe](https://dashboard.stripe.com/)
- [Guía de Testing](https://stripe.com/docs/testing)

