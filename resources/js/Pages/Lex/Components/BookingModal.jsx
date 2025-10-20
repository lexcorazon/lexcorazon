import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BookingModal({ bookingOpen, setBookingOpen, sessionTitle, handleStripeCheckout }) {
  const [form, setForm] = useState({
    birth_date: '', birth_place: '', birth_time: '', time_exact: true, phone: '',
    expectations: '', knows_astrology: '', life_point: '', creativity: ''
  })
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState(null)

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
                <form onSubmit={handleSubmitBooking} style={{ display: 'grid', gap: 16, maxWidth: 600, margin: '0 auto' }}>
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
                    <textarea name="life_point" value={form.life_point} onChange={handleChange} rows={3}
                      style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                  </div>

                  <div style={{ display:'grid', gap:8 }}>
                    <label style={{ color:'#ccc', fontSize:16 }}>¿Qué relación tienes con la creatividad?</label>
                    <textarea name="creativity" value={form.creativity} onChange={handleChange} rows={3}
                      style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:20 }}>
                    <a href="https://wa.me/34678776392" target="_blank" rel="noreferrer"
                      style={{ background:'#25D366', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17, textDecoration:'none' }}>
                      💬 WhatsApp
                    </a>
                    <button type="button" onClick={handleStripeCheckout}
                      style={{ background:'#fff', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17 }}>
                      💳 Pagar con Stripe
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
/* Desktop: dos columnas con scroll interno en cada panel */
@media (min-width: 769px) {
  .booking-modal {
    transform: scale(0.8);               /* 🔥 reduce un 20% */
    transform-origin: center center;
    height: 100dvh;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }

  .booking-left,
  .booking-right {
    height: 100dvh;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .booking-right::-webkit-scrollbar,
  .booking-left::-webkit-scrollbar {
    width: 6px;
  }

  .booking-right::-webkit-scrollbar-thumb,
  .booking-left::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 4px;
  }
}
            /* Móvil: una sola columna y un solo scroll (el shell) */
            @media (max-width: 768px) {
              .booking-modal {
                display: block !important;      /* una columna */
                min-height: 100dvh !important;
              }
              .booking-left {
                border-right: none !important;
                border-bottom: 1px solid #222;
                padding: 88px 22px 28px !important; /* deja aire bajo el texto */
              }
              .booking-right {
                padding: 28px 22px 56px !important;
              }
              /* importantísimo: los paneles NO deben tener scroll propio en móvil */
              .booking-left, .booking-right { overflow: visible !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
