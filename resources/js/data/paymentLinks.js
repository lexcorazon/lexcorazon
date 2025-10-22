// Enlaces de pago de Stripe para Lex Corazón
export const paymentLinks = {
  // Sesiones individuales
  'Carta Natal': 'https://buy.stripe.com/dRmdRb9Qe5Fl8rn1Wd4c802',
  'Viaje a las tripas - Introspección': 'https://buy.stripe.com/5kQ7sNgeC2t922Z6ct4c80a',
  'Motín existencial - Talentos y propósito': 'https://buy.stripe.com/aFaeVfe6u6JpgXT58p4c809',
  'Caja de cerillas - Desbloqueo creativo': 'https://buy.stripe.com/bJe9AV8MaaZF6jf1Wd4c808',
  'Lex ID - Adn de marca': 'https://buy.stripe.com/00w28tgeC6JpcHD7gx4c807',
  'Aesthetic Overdose - Estética y concepto': 'https://buy.stripe.com/cNi4gBfayd7NfTPdEV4c806',
  'Carne y hueso - Creación de producto': 'https://buy.stripe.com/28EfZjbYm7Nt4b70S94c803',
  
  // Packs de sesiones
  'Pack de sesiones': {
    'introspectivas': 'https://buy.stripe.com/5kQbJ3aUi8Rx5fbdEV4c805',
    'construccion': 'https://buy.stripe.com/6oU00laUi9VB7nj1Wd4c804'
  },
  
  // Sesión de prueba
  'Sesión Prueba': 'https://buy.stripe.com/00wcN74vUc3JbDzasJ4c80b'
}

// Función para obtener el enlace de pago según la sesión y tipo de pack
export const getPaymentLink = (sessionTitle, packType = null) => {
  if (sessionTitle === 'Pack de sesiones' && packType) {
    return paymentLinks[sessionTitle][packType] || null
  }
  return paymentLinks[sessionTitle] || null
}
