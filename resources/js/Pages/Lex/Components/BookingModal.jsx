import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingModal({ bookingOpen, setBookingOpen, sessionTitle, handleStripeCheckout }) {
  const [form, setForm] = useState({
    birth_date: '', birth_place: '', birth_time: '', time_exact: true, phone: '',
    expectations: '', knows_astrology: '', life_point: '', creativity: ''
  });
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(null);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bookingOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault(); setSending(true); setSentOk(null);
    try {
      const res = await fetch('/lex/booking/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
        body: JSON.stringify({ ...form, session_title: sessionTitle })
      });
      if (res.ok) { 
        setSentOk(true); setSending(false);
        setForm({ birth_date: '', birth_place: '', birth_time: '', time_exact: false, phone: '', expectations: '', knows_astrology: '', life_point: '', creativity: '' }); 
      }
      else { setSentOk(false); setSending(false); }
    } catch { setSentOk(false); setSending(false); }
  };

  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200, backdropFilter: 'blur(10px)', padding: '20px', overflowY: 'auto'
          }}
        >
          <motion.div
            className="booking-modal"
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.96 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              width: '96vw', maxWidth: '1100px', height: '92vh',
              background: 'linear-gradient(120deg,#0b0b0b 0%,#151515 100%)', color: '#fff',
              display: 'grid', gridTemplateColumns: '1.1fr 1fr', borderRadius: 18,
              boxShadow: '0 0 80px rgba(255,255,255,0.1)', position: 'relative',
              maxHeight: '90vh', overflow: 'hidden', gap: 0
            }}
          >
            {/* Cerrar */}
            <button onClick={() => setBookingOpen(false)} style={{ position: 'absolute', right: 20, top: 10, fontSize: 36, color: '#aaa', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>×</button>

            {/* Panel izquierdo (texto) */}
            <motion.div className="booking-left" style={{
              padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              borderRight: '1px solid #222', background: 'radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%)'
            }}>
              <h2 style={{ fontSize: 'clamp(2.5rem,4vw,4rem)', fontWeight: 900, marginBottom: 28, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.1 }}>
                {sessionTitle || 'Sesión Creativa Lex Corazon'}
              </h2>
              <p style={{ fontSize: 22, lineHeight: 1.9, color: '#ddd', maxWidth: '100%', textAlign: 'justify', marginBottom: 24 }}>
                Esta sesión abre un espacio simbólico y creativo donde la astrología, la introspección y el arte se entrelazan para dar forma a lo invisible.
              </p>
            </motion.div>

            {/* Panel derecho (formulario) */}
            <motion.div className="booking-right" style={{ padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <form onSubmit={handleSubmitBooking} style={{ display: 'grid', gap: 16, width: '100%' }}>
                {['birth_date','birth_place','birth_time','phone','expectations'].map(f => {
                  const labels = { birth_date:'Fecha de nacimiento*', birth_place:'Lugar de nacimiento*', birth_time:'Hora de nacimiento*', phone:'Teléfono*', expectations:'Expectativas' };
                  return <div key={f} style={{ display:'grid', gap:8 }}>
                    <label style={{ color:'#ccc', fontSize:16 }}>{labels[f]}</label>
                    <input name={f} placeholder="" value={form[f]} onChange={handleChange} required={labels[f].includes('*')}
                      style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                  </div>
                })}
                {/* Conocimientos astrología */}
                <div style={{ display:'grid', gap:8 }}>
                  <label style={{ color:'#ccc', fontSize:16 }}>¿Tienes conocimientos de astrología?</label>
                  <div style={{ display:'flex', gap:16 }}>
                    {['Sí','No'].map(opt => (
                      <label key={opt} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:15 }}>
                        <input type="radio" name="knows_astrology" value={opt} checked={form.knows_astrology===opt} onChange={handleChange} style={{ accentColor:'#fff', transform:'scale(1.2)' }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Punto vital */}
                <div style={{ display:'grid', gap:8 }}>
                  <label style={{ color:'#ccc', fontSize:16 }}>¿En qué punto vital te encuentras?</label>
                  <textarea name="life_point" value={form.life_point} onChange={handleChange} rows={3} style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                </div>
                {/* Creatividad */}
                <div style={{ display:'grid', gap:8 }}>
                  <label style={{ color:'#ccc', fontSize:16 }}>¿Qué relación tienes con la creatividad?</label>
                  <textarea name="creativity" value={form.creativity} onChange={handleChange} rows={3} style={{ background:'#000', color:'#fff', border:'1px solid #333', borderRadius:10, padding:'14px 16px', fontSize:16 }} />
                </div>

                {/* Botones WhatsApp, Stripe y Enviar alineados */}
                <div style={{ display:'flex', gap:16, marginTop:16, flexWrap:'wrap' }}>
                  <a href="https://wa.me/34678776392" target="_blank" rel="noreferrer" style={{ background:'#25D366', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17, display:'inline-flex', alignItems:'center', justifyContent:'center', textDecoration:'none', cursor:'pointer', transition:'transform 0.2s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>💬 Contactar por WhatsApp</a>
                  <button type="button" onClick={handleStripeCheckout} style={{ background:'#fff', color:'#000', borderRadius:10, padding:'12px 18px', fontWeight:700, fontSize:17, cursor:'pointer', transition:'transform 0.2s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>💳 Pagar con Stripe</button>
                  <button type="submit" disabled={sending||sentOk===true} style={{ background: sentOk?'#7CFFB2':sending?'#ccc':'#fff', color:'#000', border:'none', borderRadius:10, padding:'12px 18px', fontWeight:700, cursor:sending?'not-allowed':'pointer', fontSize:17, transition:'all 0.3s ease' }}>
                    {sentOk?'✅ Enviado':sending?'Enviando…':'Enviar formulario'}
                  </button>
                </div>
              </form>
            </motion.div>

            <style>{`
              @media(max-width:768px){
                .booking-modal {
                  grid-template-columns:1fr !important;
                  grid-template-rows:auto auto !important;
                  max-height:95vh !important;
                  overflow-y:auto !important;
                  gap:0;
                }
                .booking-left {
                  border-right:none !important;
                  border-bottom:1px solid #222;
                  padding:20px !important;
                }
                .booking-right {
                  padding:20px !important;
                  overflow-y:visible !important;
                }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
