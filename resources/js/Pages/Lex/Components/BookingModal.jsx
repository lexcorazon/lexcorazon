import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookingModal({ bookingOpen, setBookingOpen, sessionTitle, handleStripeCheckout }) {
  const [form, setForm] = useState({
    birth_date: '',
    birth_place: '',
    birth_time: '',
    time_exact: true,
    phone: '',
    expectations: '',
    knows_astrology: '',
    life_point: '',
    creativity: '',
  })
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState(null)

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [bookingOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    setSending(true)
    setSentOk(null)
    try {
      const res = await fetch('/lex/booking/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        body: JSON.stringify({ ...form, session_title: sessionTitle }),
      })
      if (res.ok) {
        setSentOk(true)
        setSending(false)
        setForm({
          birth_date: '',
          birth_place: '',
          birth_time: '',
          time_exact: false,
          phone: '',
          expectations: '',
          knows_astrology: '',
          life_point: '',
          creativity: '',
        })
      } else {
        setSentOk(false)
        setSending(false)
      }
    } catch {
      setSentOk(false)
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            backdropFilter: 'blur(10px)',
            padding: 0,
          }}
        >
          <motion.div
            className="booking-modal"
            initial={{ opacity: 0, y: 80, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.97 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(120deg,#0b0b0b 0%,#151515 100%)',
              color: '#fff',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              borderRadius: 0,
              boxShadow: '0 0 80px rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* ❌ Botón Cerrar */}
            <button
              onClick={() => setBookingOpen(false)}
              style={{
                position: 'absolute',
                right: 24,
                top: 18,
                fontSize: 40,
                color: '#aaa',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
            >
              ×
            </button>

            {/* 🖋 Panel Izquierdo */}
            <div
              className="booking-left"
              style={{
                padding: '60px 60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: '1px solid #222',
                background:
                  'radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%)',
                overflowY: 'auto',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                  fontWeight: 900,
                  marginBottom: 28,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  lineHeight: 1.1,
                }}
              >
                {sessionTitle || 'Sesión Creativa Lex Corazon'}
              </h2>
              <p
                style={{
                  fontSize: 22,
                  lineHeight: 1.9,
                  color: '#ddd',
                  maxWidth: '100%',
                  textAlign: 'justify',
                }}
              >
                Esta sesión abre un espacio simbólico y creativo donde la astrología, la
                introspección y el arte se entrelazan para dar forma a lo invisible.
              </p>
            </div>

            {/* 📋 Panel Derecho */}
            <div
              className="booking-right"
              style={{
                padding: '50px',
                overflowY: 'auto',
                background: 'rgba(0,0,0,0.7)',
              }}
            >
              <form
                onSubmit={handleSubmitBooking}
                style={{
                  display: 'grid',
                  gap: 16,
                  width: '100%',
                  maxWidth: 580,
                  margin: '0 auto',
                }}
              >
                {['birth_date', 'birth_place', 'birth_time', 'phone', 'expectations'].map((f) => {
                  const labels = {
                    birth_date: 'Fecha de nacimiento*',
                    birth_place: 'Lugar de nacimiento*',
                    birth_time: 'Hora de nacimiento*',
                    phone: 'Teléfono*',
                    expectations: 'Expectativas',
                  }
                  return (
                    <div key={f} style={{ display: 'grid', gap: 8 }}>
                      <label style={{ color: '#ccc', fontSize: 16 }}>{labels[f]}</label>
                      <input
                        name={f}
                        value={form[f]}
                        onChange={handleChange}
                        required={labels[f].includes('*')}
                        style={{
                          background: '#000',
                          color: '#fff',
                          border: '1px solid #333',
                          borderRadius: 10,
                          padding: '14px 16px',
                          fontSize: 16,
                        }}
                      />
                    </div>
                  )
                })}

                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ color: '#ccc', fontSize: 16 }}>¿Tienes conocimientos de astrología?</label>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {['Sí', 'No'].map((opt) => (
                      <label
                        key={opt}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          cursor: 'pointer',
                          fontSize: 15,
                        }}
                      >
                        <input
                          type="radio"
                          name="knows_astrology"
                          value={opt}
                          checked={form.knows_astrology === opt}
                          onChange={handleChange}
                          style={{ accentColor: '#fff', transform: 'scale(1.2)' }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ color: '#ccc', fontSize: 16 }}>¿En qué punto vital te encuentras?</label>
                  <textarea
                    name="life_point"
                    value={form.life_point}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      background: '#000',
                      color: '#fff',
                      border: '1px solid #333',
                      borderRadius: 10,
                      padding: '14px 16px',
                      fontSize: 16,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ color: '#ccc', fontSize: 16 }}>¿Qué relación tienes con la creatividad?</label>
                  <textarea
                    name="creativity"
                    value={form.creativity}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      background: '#000',
                      color: '#fff',
                      border: '1px solid #333',
                      borderRadius: 10,
                      padding: '14px 16px',
                      fontSize: 16,
                    }}
                  />
                </div>

                {/* 🟢 Botones finales */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 20 }}>
                  <a
                    href="https://wa.me/34678776392"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#000',
                      borderRadius: 10,
                      padding: '12px 18px',
                      fontWeight: 700,
                      fontSize: 17,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    💬 WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    style={{
                      background: '#fff',
                      color: '#000',
                      borderRadius: 10,
                      padding: '12px 18px',
                      fontWeight: 700,
                      fontSize: 17,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    💳 Pagar con Stripe
                  </button>

                  <button
                    type="submit"
                    disabled={sending || sentOk === true}
                    style={{
                      background: sentOk ? '#7CFFB2' : sending ? '#ccc' : '#fff',
                      color: '#000',
                      border: 'none',
                      borderRadius: 10,
                      padding: '12px 18px',
                      fontWeight: 700,
                      cursor: sending ? 'not-allowed' : 'pointer',
                      fontSize: 17,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {sentOk ? '✅ Enviado' : sending ? 'Enviando…' : 'Enviar'}
                  </button>
                </div>
              </form>
            </div>

<style>{`
  /* 🌐 GENERAL — asegura que el modal cubra todo el viewport */
  .booking-modal {
    width: 100vw !important;
    height: 100dvh !important;
    max-height: 100dvh !important;
    overflow: hidden !important;
    margin: 0 !important;
  }

  /* 🖥️ WEB: dos columnas y scroll bloqueado del fondo */
  @media (min-width: 769px) {
    body {
      overflow: hidden !important;
    }

    .booking-modal {
      display: grid !important;
      grid-template-columns: 1.2fr 1fr !important;
      height: 100dvh !important;
      overflow: hidden !important;
    }

    .booking-left,
    .booking-right {
      height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
    }

    .booking-right::-webkit-scrollbar {
      width: 6px;
    }
    .booking-right::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
    }
  }

  /* 📱 MÓVIL: texto arriba, formulario abajo, scroll único */
  @media (max-width: 768px) {
    .booking-modal {
      display: flex !important;
      flex-direction: column !important;
      width: 100vw !important;
      height: 100dvh !important;
      overflow-y: auto !important; /* 🔥 un solo scroll fluido */
      background: linear-gradient(120deg,#0b0b0b 0%,#151515 100%) !important;
      backdrop-filter: blur(10px);
    }

    .booking-left {
      order: 1 !important;
      border: none !important;
      border-bottom: 1px solid #222;
      padding: 32px 22px !important;
      flex-shrink: 0;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%);
    }

    .booking-right {
      order: 2 !important;
      padding: 28px 22px !important;
      overflow: visible !important;
      flex-grow: 1;
    }

    /* 🔝 X siempre arriba visible, sin tapar texto */
    .booking-modal button[style*="position: absolute"] {
      top: 16px !important;
      right: 16px !important;
      font-size: 32px !important;
      z-index: 99 !important;
    }
  }
`}</style>



          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
