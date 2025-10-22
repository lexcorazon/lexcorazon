import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sessionsInfo } from '../data/sessionsInfo'
import { getPaymentLink } from '../../../data/paymentLinks'

export default function BookingModal({ bookingOpen, setBookingOpen, sessionTitle, handleStripeCheckout }) {
  const [form, setForm] = useState({
    birth_date: '', birth_place: '', birth_time: '', time_exact: true, phone: '',
    expectations: '', knows_astrology: '', life_point: '', creativity: ''
  })
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState(null)
  // Variables eliminadas: packType, stripeLoading (ya no se necesitan con enlaces directos)
  
  const isPack = sessionTitle === 'Pack de sesiones'
  const isIntrospective = ['Viaje a las tripas - Introspección', 'Motín existencial - Talentos y propósito', 'Caja de cerillas - Desbloqueo creativo'].includes(sessionTitle)
  const sessionInfo = sessionsInfo[sessionTitle] || {}

  // Bloquear scroll del fondo
  useEffect(() => {
    if (bookingOpen) {
      const prevBody = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prevBody }
    }
  }, [bookingOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    setSending(true); setSentOk(null)
    try {
      const res = await fetch('/lex/booking/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
        body: JSON.stringify({ ...form, session_title: sessionTitle }),
      })
      if (res.ok) {
        setSentOk(true)
        setForm({ birth_date:'', birth_place:'', birth_time:'', time_exact:false, phone:'', expectations:'', knows_astrology:'', life_point:'', creativity:'' })
      } else setSentOk(false)
    } catch { setSentOk(false) }
    finally { setSending(false) }
  }

  const handlePaymentLink = () => {
    const paymentLink = getPaymentLink(sessionTitle)
    
    if (paymentLink) {
      // Redirigir directamente al enlace de pago de Stripe
      window.open(paymentLink, '_blank')
    } else {
      alert('Enlace de pago no disponible para esta sesión')
    }
  }

  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            // IMPORTANTÍSIMO: el contenedor del modal SÍ puede hacer scroll si el contenido crece
            overflow: 'hidden'
          }}
        >
          {/* Botón cerrar, fuera del flujo para no solapar nada */}
<button
  onClick={() => setBookingOpen(false)}
  aria-label="Cerrar"
  style={{
    position: 'fixed', right: 16, top: 10, zIndex: 10000,
    fontSize: 36, lineHeight: 1, color: '#ddd',
    background: 'transparent', border: 'none', cursor: 'pointer'
  }}
>×</button>

          {/* Shell: ocupa toda la pantalla */}
          <div
            className="booking-shell"
            style={{
              position: 'absolute', inset: 0,
              // En móvil: un scroll único
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Contenido: grid en desktop, columna en móvil */}
            <div className="booking-content">
              {/* Panel Izquierdo – TEXTO */}
              <div className="booking-left">
                <h2 className="session-title">
                  {sessionTitle || 'Sesión Creativa Lex Corazon'}
                </h2>
                
                {/* Precio y duración */}
                {(sessionInfo.price || sessionInfo.duration) && (
                  <div className="session-info-box" style={{ marginBottom: 24 }}>
                    {sessionInfo.duration && (
                      <p style={{ fontSize: 16, color: '#FFD500', fontWeight: 700, marginBottom: 4 }}>
                        {sessionInfo.duration}
                      </p>
                    )}
                    {sessionInfo.price && (
                      <p style={{ fontSize: 18, color: '#fff', fontWeight: 700, marginBottom: 4 }}>
                        {sessionInfo.price}
                      </p>
                    )}
                    {sessionInfo.trial && (
                      <p style={{ fontSize: 14, color: '#77cee4', fontStyle: 'italic' }}>
                        {sessionInfo.trial}
                      </p>
                    )}
                  </div>
                )}
                
                {/* Descripción de la sesión */}
                <div 
                  className="session-description"
                  style={{ 
                    fontSize: 19, 
                    lineHeight: 1.8, 
                    color: '#ddd', 
                    textAlign: 'justify' 
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: sessionInfo.description || 'Esta sesión abre un espacio simbólico y creativo donde la astrología, la introspección y el arte se entrelazan para dar forma a lo invisible.' 
                  }}
                />

                {/* Botones de packs para "Pack de sesiones" - DEBAJO DEL TEXTO */}
                {isPack && (
                  <div style={{ display:'grid', gap:16, marginTop:24, padding:'24px', background:'rgba(255,255,255,0.05)', borderRadius:16, border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(10px)' }}>
                    <label style={{ color:'#fff', fontSize:18, fontWeight:700, textAlign:'center', marginBottom:8 }}>Selecciona el tipo de pack</label>
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      <button type="button" onClick={() => window.open('https://buy.stripe.com/5kQbJ3aUi8Rx5fbdEV4c805', '_blank')}
                        style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, cursor:'pointer', fontSize:16, color:'#000', padding:'16px 20px', background:'#fff', borderRadius:12, border:'1px solid rgba(0,0,0,0.1)', transition:'all 0.3s ease', fontWeight:600, boxShadow:'0 4px 15px rgba(0,0,0,0.1)' }}>
                        <div style={{ textAlign:'center' }}>
                          <div style={{fontWeight:700, fontSize:17}}>Sesiones Introspectivas</div>
                          <div style={{fontSize:14, color:'rgba(0,0,0,0.7)', marginTop:4}}>180€ - Viaje a las tripas, Motín existencial, Caja de cerillas</div>
                        </div>
                      </button>
                      <button type="button" onClick={() => window.open('https://buy.stripe.com/6oU00laUi9VB7nj1Wd4c804', '_blank')}
                        style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, cursor:'pointer', fontSize:16, color:'#000', padding:'16px 20px', background:'#fff', borderRadius:12, border:'1px solid rgba(0,0,0,0.1)', transition:'all 0.3s ease', fontWeight:600, boxShadow:'0 4px 15px rgba(0,0,0,0.1)' }}>
                        <div style={{ textAlign:'center' }}>
                          <div style={{fontWeight:700, fontSize:17}}>Sesiones de Construcción</div>
                          <div style={{fontSize:14, color:'rgba(0,0,0,0.7)', marginTop:4}}>270€ - Lex ID, Aesthetic Overdose, Carne y hueso</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel Derecho – FORMULARIO */}
              <div className="booking-right">
                <form onSubmit={handleSubmitBooking} style={{ display: 'grid', gap: 12, maxWidth: 600, margin: '0 auto' }}>
                  {['birth_date','birth_place','birth_time','phone','expectations'].map(f => {
                    const labels = {
                      birth_date:'Fecha de nacimiento*',
                      birth_place:'Lugar de nacimiento*',
                      birth_time:'Hora de nacimiento*',
                      phone:'Teléfono*',
                      expectations:'Expectativas'
                    }
                    return (
                      <div key={f} style={{ display: 'grid', gap: 8 }}>
                        <label style={{ color:'#ccc', fontSize:16 }}>{labels[f]}</label>
                        <input
                          name={f} value={form[f]} onChange={handleChange}
                          required={labels[f].includes('*')}
                          style={{
                            background:'#000', color:'#fff',
                            border:'1px solid #333', borderRadius:10,
                            padding:'14px 16px', fontSize:16
                          }}
                        />
                      </div>
                    )
                  })}

                  <div style={{ display:'grid', gap:8 }}>
                    <label style={{ color:'#ccc', fontSize:16 }}>¿Tienes conocimientos de astrología?</label>
                    <div style={{ display:'flex', gap:16 }}>
                      {['Sí','No'].map(opt => (
                        <label key={opt} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:15 }}>
                          <input
                            type="radio" name="knows_astrology" value={opt}
                            checked={form.knows_astrology===opt} onChange={handleChange}
                            style={{ accentColor:'#fff', transform:'scale(1.2)' }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ display:'grid', gap:8 }}>
                    <label style={{ color:'#ccc', fontSize:16 }}>¿En qué punto vital te encuentras?</label>
                    <textarea name="life_point" value={form.life_point} onChange={handleChange} rows={2}
                      style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                  </div>

                  <div style={{ display:'grid', gap:8 }}>
                    <label style={{ color:'#ccc', fontSize:16 }}>¿Qué relación tienes con la creatividad?</label>
                    <textarea name="creativity" value={form.creativity} onChange={handleChange} rows={2}
                      style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:20 }}>
                    <a href="https://wa.me/34678776392" target="_blank" rel="noreferrer"
                      style={{ background:'#25D366', color:'#fff', borderRadius:12, padding:'12px 18px', fontWeight:700, fontSize:17, textDecoration:'none', boxShadow:'0 4px 15px rgba(37, 211, 102, 0.3)', transition:'all 0.3s ease' }}>
                      💬 WhatsApp
                    </a>
                    
                    {/* Botón de sesión de prueba para sesiones introspectivas */}
                    {isIntrospective && (
                      <button type="button" onClick={() => window.open('https://buy.stripe.com/00wcN74vUc3JbDzasJ4c80b', '_blank')}
                        style={{ background:'#000', color:'#fff', borderRadius:12, padding:'12px 18px', fontWeight:700, fontSize:17, cursor:'pointer', border:'1px solid rgba(255,255,255,0.2)', boxShadow:'0 4px 15px rgba(0,0,0,0.3)', transition:'all 0.3s ease' }}>
                        Sesión Prueba (50€)
                      </button>
                    )}
                    
                    {/* Solo mostrar botón de pago si NO es un pack */}
                    {!isPack && (
                      <button type="button" onClick={handlePaymentLink}
                        style={{ background:'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', color:'#000', borderRadius:12, padding:'12px 18px', fontWeight:700, fontSize:17, cursor:'pointer', border:'1px solid rgba(255,255,255,0.2)', boxShadow:'0 4px 15px rgba(0,0,0,0.1)', transition:'all 0.3s ease' }}>
                        💳 Pagar con Stripe
                      </button>
                    )}
                    <button type="submit" disabled={sending || sentOk===true}
                      style={{ background: sentOk?'linear-gradient(135deg, #7CFFB2 0%, #5CB85C 100%)':(sending?'linear-gradient(135deg, #ccc 0%, #999 100%)':'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)'), color: sentOk?'#000':'#000', border:'none', borderRadius:12, padding:'12px 18px', fontWeight:700, fontSize:17, boxShadow: sentOk?'0 4px 15px rgba(124, 255, 178, 0.3)':'0 4px 15px rgba(0,0,0,0.1)', transition:'all 0.3s ease' }}>
                      {sentOk?'✅ Enviado':(sending?'Enviando…':'Enviar')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* CSS RESPONSIVE */}
<style>{`
  /* Efectos hover para botones */
  button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  
  a:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  
  /* Efectos hover específicos para cada botón */
  button[style*="background:'#000'"]:hover {
    background: #111 !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.4) !important;
  }
  
  a[style*="25D366"]:hover {
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4) !important;
  }
  
  button[style*="7CFFB2"]:hover {
    box-shadow: 0 8px 25px rgba(124, 255, 178, 0.4) !important;
  }
  
  /* Efectos hover para botones de packs blancos */
  button[style*="background:'#fff'"]:hover {
    background: #f8f9fa !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  /* 🌐 GENERAL — asegura que el modal cubra todo el viewport */
  .booking-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    height: 100vh;
    width: 100vw;
  }
  
  .booking-content {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
    max-width: 1200px;
    width: 90vw;
    height: 88vh;
    max-height: 88vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #333;
    margin: auto;
  }
  
  .booking-left {
    padding: 30px;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-right: 1px solid #333;
    overflow-y: auto;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .booking-left h2 {
    color: #fff !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    font-size: clamp(2.2rem,4vw,3.6rem) !important;
    font-weight: 900 !important;
    margin-bottom: 16px !important;
    text-transform: uppercase !important;
    line-height: 1.1 !important;
  }
  
  .booking-right {
    padding: 30px;
    background: rgba(0,0,0,0.3);
    overflow-y: hidden;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 🖥️ VERSIÓN WEB — centrado, sin scroll global, optimizado para mostrar todo el contenido */
  @media (min-width: 769px) {
    html, body {
      overflow: hidden !important;
    }

    .booking-modal {
      width: 92vw !important;
      height: 90vh !important;
      max-height: 90vh !important;
      margin: auto !important;
      border-radius: 16px;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      overflow: hidden !important;
      box-shadow: 0 0 80px rgba(255, 255, 255, 0.15);
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%);
    }

    /* Panel izquierdo SIN scroll (texto + selector) */
    .booking-left {
      height: 100%;
      overflow-y: hidden !important;
      overflow-x: hidden !important;
      padding: 22px 28px !important;
      border-right: 1px solid #222;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    /* Scrollbar estético para panel izquierdo */
    .booking-left::-webkit-scrollbar {
      width: 6px;
    }
    .booking-left::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
    }

    .booking-left h2 {
      font-size: clamp(1.3rem, 1.9vw, 1.7rem) !important;
      margin-bottom: 6px !important;
      color: #fff !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      line-height: 1.05 !important;
    }

    .booking-left .session-description p {
      font-size: 12.5px !important;
      line-height: 1.4 !important;
      margin-bottom: 7px;
      color: #ddd !important;
      text-align: center;
    }
    
    .booking-left .session-description ul {
      margin-left: 0;
      margin-bottom: 7px;
      list-style-position: inside;
      text-align: center;
    }
    
    .booking-left .session-description li {
      font-size: 12px !important;
      line-height: 1.35 !important;
      margin-bottom: 4px;
      color: #ddd !important;
      text-align: center;
    }
    
    .booking-left .session-description strong {
      color: #FFD500 !important;
      font-weight: 700;
    }


    /* Panel derecho SIN scroll */
    .booking-right {
      height: 100%;
      overflow-y: hidden !important;
      overflow-x: hidden !important;
      padding: 22px 28px !important;
      scroll-behavior: smooth;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .booking-right form {
      width: 100%;
      max-width: 380px;
      gap: 10px !important;
    }

    .booking-right form > div {
      gap: 5px !important;
    }

    .booking-right label {
      font-size: 13px !important;
    }

    .booking-right input,
    .booking-right textarea {
      padding: 9px 11px !important;
      font-size: 13px !important;
    }

    .booking-right textarea {
      rows: 2 !important;
      min-height: 50px !important;
    }

    /* Scrollbar estético */
    .booking-right::-webkit-scrollbar {
      width: 6px;
    }
    .booking-right::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
    }

    /* Botón de cierre dentro del modal */
    .close-btn {
      position: absolute;
      top: 22px;
      right: 22px;
      font-size: 34px;
      color: #aaa;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color 0.2s ease;
      z-index: 50;
    }

    .close-btn:hover {
      color: #fff;
    }
  }

  /* 📱 VERSIÓN MÓVIL — texto arriba, formulario abajo, scroll único */
  @media (max-width: 768px) {
    .booking-modal {
      display: flex !important;
      flex-direction: column !important;
      width: 100vw !important;
      height: 100dvh !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%) !important;
      backdrop-filter: blur(10px);
    }

    .booking-content {
      display: flex !important;
      flex-direction: column !important;
      height: auto !important;
      max-height: none !important;
    }

    .booking-left {
      order: 1 !important;
      border: none !important;
      padding: 32px 22px !important;
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%);
      overflow-y: visible !important;
      height: auto !important;
      width: 100% !important;
      display: block !important;
    }
    
    .booking-left h2 {
      color: #fff !important;
    }
    
    /* Ajustar tamaño de letra en móvil */
    .booking-left .session-description p {
      font-size: 15px !important;
      line-height: 1.7 !important;
      color: #ddd !important;
    }
    
    .booking-left .session-description ul {
      margin-left: 18px;
    }
    
    .booking-left .session-description li {
      font-size: 14px !important;
      line-height: 1.6 !important;
      color: #ddd !important;
    }
    
    .booking-left .session-description strong {
      color: #FFD500 !important;
      font-weight: 700;
    }

    .booking-right {
      order: 2 !important;
      border: none !important;
      padding: 28px 22px !important;
      overflow-y: visible !important;
      height: auto !important;
      width: 100% !important;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 20px;
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%);
    }

    .booking-right form {
      width: 100% !important;
      max-width: 350px;
      gap: 10px !important;
    }

    .booking-modal button[style*="position: absolute"],
    .close-btn {
      top: 16px !important;
      right: 16px !important;
      font-size: 32px !important;
      z-index: 99 !important;
    }
  }

  /* REGLA FINAL PARA TÍTULO - MÁXIMA PRIORIDAD */
  .booking-left h2.session-title {
    color: #fff !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    font-size: clamp(1.3rem, 1.9vw, 1.7rem) !important;
    font-weight: 900 !important;
    margin-bottom: 6px !important;
    text-transform: uppercase !important;
    line-height: 1.05 !important;
    position: relative !important;
    z-index: 999 !important;
  }
`}</style>


        </motion.div>
      )}
    </AnimatePresence>
  )
}
