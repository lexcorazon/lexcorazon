import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BookingModal({ bookingOpen, setBookingOpen, sessionTitle, handleStripeCheckout }) {
  const [form, setForm] = useState({
    birth_date: '', birth_place: '', birth_time: '', time_exact: true, phone: '',
    expectations: '', knows_astrology: '', life_point: '', creativity: ''
  })
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState(null)
  const [packType, setPackType] = useState('') // 'introspectivas' o 'construccion'
  const [stripeLoading, setStripeLoading] = useState(false)
  
  const isPack = sessionTitle === 'Pack de sesiones'

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

  const handleStripePayment = async () => {
    // Validar que si es pack, se haya seleccionado el tipo
    if (isPack && !packType) {
      alert('Por favor, selecciona el tipo de pack antes de proceder al pago')
      return
    }

    setStripeLoading(true)
    try {
      const res = await fetch('/stripe/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' 
        },
        body: JSON.stringify({ 
          sessionTitle: sessionTitle,
          packType: isPack ? packType : null
        }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url
      } else {
        alert(data.error || 'Error al iniciar el pago')
      }
    } catch (error) {
      console.error('Error en el checkout:', error)
      alert('Error al conectar con Stripe')
    } finally {
      setStripeLoading(false)
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
            <div
              className="booking-modal"
              style={{
                minHeight: '100dvh',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                background: 'linear-gradient(120deg,#0b0b0b 0%,#151515 100%)',
                color: '#fff'
              }}
            >
              {/* Panel Izquierdo – TEXTO */}
              <div
                className="booking-left"
                style={{
                  padding: '72px 56px 48px',
                  borderRight: '1px solid #222',
                  background: 'radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%)'
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem,4vw,3.6rem)',
                    fontWeight: 900, marginBottom: 24,
                    textTransform: 'uppercase', lineHeight: 1.1
                  }}
                >
                  {sessionTitle || 'Sesión Creativa Lex Corazon'}
                </h2>
                <p style={{ fontSize: 20, lineHeight: 1.8, color: '#ddd', textAlign: 'justify' }}>
                  Esta sesión abre un espacio simbólico y creativo donde la astrología, la introspección y el arte
                  se entrelazan para dar forma a lo invisible. Es un encuentro para quienes desean reconectar con su
                  propósito, recuperar la creatividad dormida y entender su propio lenguaje interior.
                </p>
              </div>

              {/* Panel Derecho – FORMULARIO */}
              <div className="booking-right" style={{ padding: '56px', background: 'rgba(0,0,0,0.75)' }}>
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

                  {/* Selector de tipo de pack solo para "Pack de sesiones" */}
                  {isPack && (
                    <div style={{ display:'grid', gap:8, marginTop:8, padding:'16px', background:'rgba(255,213,0,0.1)', borderRadius:10, border:'1px solid #FFD500' }}>
                      <label style={{ color:'#FFD500', fontSize:17, fontWeight:700 }}>Selecciona el tipo de pack *</label>
                      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                        <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer', fontSize:16, color:'#fff', padding:'12px', background:packType==='introspectivas'?'rgba(255,213,0,0.2)':'transparent', borderRadius:8, border:'1px solid '+(packType==='introspectivas'?'#FFD500':'#333'), transition:'all 0.2s' }}>
                          <input
                            type="radio" 
                            name="packType" 
                            value="introspectivas"
                            checked={packType==='introspectivas'} 
                            onChange={(e) => setPackType(e.target.value)}
                            style={{ accentColor:'#FFD500', transform:'scale(1.3)' }}
                          />
                          <div>
                            <div style={{fontWeight:700}}>Sesiones Introspectivas</div>
                            <div style={{fontSize:14, color:'#aaa'}}>180€ - Viaje a las tripas, Motín existencial, Caja de cerillas</div>
                          </div>
                        </label>
                        <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer', fontSize:16, color:'#fff', padding:'12px', background:packType==='construccion'?'rgba(255,213,0,0.2)':'transparent', borderRadius:8, border:'1px solid '+(packType==='construccion'?'#FFD500':'#333'), transition:'all 0.2s' }}>
                          <input
                            type="radio" 
                            name="packType" 
                            value="construccion"
                            checked={packType==='construccion'} 
                            onChange={(e) => setPackType(e.target.value)}
                            style={{ accentColor:'#FFD500', transform:'scale(1.3)' }}
                          />
                          <div>
                            <div style={{fontWeight:700}}>Sesiones de Construcción</div>
                            <div style={{fontSize:14, color:'#aaa'}}>270€ - Lex ID, Aesthetic Overdose, Carne y hueso</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:20 }}>
                    <a href="https://wa.me/34678776392" target="_blank" rel="noreferrer"
                      style={{ background:'#25D366', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17, textDecoration:'none' }}>
                      💬 WhatsApp
                    </a>
                    <button type="button" onClick={handleStripePayment} disabled={stripeLoading}
                      style={{ background:stripeLoading?'#ccc':'#fff', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17, cursor:stripeLoading?'not-allowed':'pointer' }}>
                      {stripeLoading ? '⏳ Procesando...' : '💳 Pagar con Stripe'}
                    </button>
                    <button type="submit" disabled={sending || sentOk===true}
                      style={{ background: sentOk?'#7CFFB2':(sending?'#ccc':'#fff'), color:'#000', border:'none', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17 }}>
                      {sentOk?'✅ Enviado':(sending?'Enviando…':'Enviar')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* CSS RESPONSIVE */}
<style>{`
  /* 🌐 GENERAL — asegura que el modal cubra todo el viewport */
  .booking-modal {
    width: 100vw !important;
    height: 100dvh !important;
    max-height: 100dvh !important;
    overflow: hidden !important;
    margin: 0 auto !important;
    box-sizing: border-box;
  }

  /* 🖥️ VERSIÓN WEB — centrado, sin scroll global, optimizado para mostrar todo el contenido */
  @media (min-width: 769px) {
    html, body {
      overflow: hidden !important;
    }

    .booking-modal {
      width: 92vw !important;
      height: 92vh !important;
      max-height: 92vh !important;
      margin: auto !important;
      border-radius: 16px;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      overflow: hidden !important;
      box-shadow: 0 0 80px rgba(255, 255, 255, 0.15);
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%);
    }

    /* Panel izquierdo fijo (texto) */
    .booking-left {
      height: 100%;
      overflow: hidden !important;
      padding: 40px 40px !important;
      border-right: 1px solid #222;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .booking-left h2 {
      font-size: clamp(1.8rem, 3vw, 2.8rem) !important;
      margin-bottom: 16px !important;
    }

    .booking-left p {
      font-size: 17px !important;
      line-height: 1.6 !important;
    }

    /* Panel derecho sin scroll interno */
    .booking-right {
      height: 100%;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      padding: 35px 40px !important;
      scroll-behavior: smooth;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
    }

    .booking-right form {
      width: 100%;
      gap: 12px !important;
    }

    .booking-right form > div {
      gap: 6px !important;
    }

    .booking-right label {
      font-size: 14px !important;
    }

    .booking-right input,
    .booking-right textarea {
      padding: 10px 12px !important;
      font-size: 14px !important;
    }

    .booking-right textarea {
      rows: 2 !important;
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
      overflow-y: auto !important; /* un solo scroll vertical */
      overflow-x: hidden !important;
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%) !important;
      backdrop-filter: blur(10px);
    }

    .booking-left {
      order: 1 !important;
      border: none !important;
      border-bottom: 1px solid #222;
      padding: 32px 22px !important;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%);
    }

    .booking-right {
      order: 2 !important;
      padding: 28px 22px !important;
      overflow: visible !important;
      flex-grow: 1;
    }

    .booking-modal button[style*="position: absolute"],
    .close-btn {
      top: 16px !important;
      right: 16px !important;
      font-size: 32px !important;
      z-index: 99 !important;
    }
  }
`}</style>


        </motion.div>
      )}
    </AnimatePresence>
  )
}
