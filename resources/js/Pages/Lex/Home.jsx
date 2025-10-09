import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

export default function LexHome() {
  const [activeImage, setActiveImage] = useState(0)
  const [activeText, setActiveText] = useState(0)
  const [showBooking, setShowBooking] = useState(false) // 🆕 Modal de reserva
  const heroImages = Array.from({ length: 21 }, (_, i) => `/images/lex/lex${i + 1}.jpg`)
    // 🧾 Control del formulario de reserva
  const [bookingOpen, setBookingOpen] = useState(false)
  const [form, setForm] = useState({
    birth_date: '',
    birth_place: '',
    birth_time: '',
    time_exact: true,
    expectations: '',
    knows_astrology: false,
    life_point: '',
    creativity: '',
    session_title: '',
  })
  const [sending, setSending] = useState(false)
  const [sentOk, setSentOk] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openBookingFor = (title) => {
    setForm((f) => ({ ...f, session_title: title }))
    setBookingOpen(true)
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    try {
      setSending(true)
      const res = await fetch('/lex/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content ?? '',
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setSentOk(Boolean(data.ok))
    } catch (err) {
      setSentOk(false)
    } finally {
      setSending(false)
    }
  }


  /* ---------- Scroll cinematográfico ---------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.lenis = lenis
    return () => lenis.destroy()
  }, [])

  /* ---------- Scroll suave ---------- */
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    const handleClick = (e) => {
      e.preventDefault()
      const targetId = e.currentTarget.getAttribute('href')
      const target = document.querySelector(targetId)
      if (target && window.lenis) {
        const offset = target.offsetTop - 80
        window.lenis.scrollTo(offset)
      }
    }
    links.forEach((link) => link.addEventListener('click', handleClick))
    return () => links.forEach((link) => link.removeEventListener('click', handleClick))
  }, [])

  /* ---------- Carrusel imágenes hero ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [heroImages.length])

  /* ---------- Cambio automático texto ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveText((prev) => (prev === 0 ? 1 : 0))
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  const fadeUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
    viewport: { once: true },
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <div style={{ overflow: 'hidden', width: '100%', minHeight: '100vh' }}>
      {/* ---------- Header ---------- */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          background: '#1f1f1f',
          color: '#fff',
          borderBottom: '1px solid #333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '12px 32px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#hero" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/lex-corazon.png" alt="Lex Corazón" style={{ height: 48, objectFit: 'contain', cursor: 'pointer' }} />
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontWeight: 500, fontSize: 16 }}>
              <a href="#sessions" style={{ color: '#fff', textDecoration: 'none' }}>Servicios</a>
              <a href="#reviews" style={{ color: '#fff', textDecoration: 'none' }}>Reseñas</a>
              <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</a>
            </nav>
          </div>

          <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>
            <a href="/aj" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img src="/images/BAJ.png" alt="Volver a AJ" style={{ height: 25, objectFit: 'contain', cursor: 'pointer' }} />
            </a>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 0 }}>
        {/* ---------- HERO ---------- */}
{/* ---------- HERO (fondo negro + texto blanco completo) ---------- */}
<motion.section
  id="hero"
  style={{
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '80vh',
    background: '#000',
    overflow: 'hidden',
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
>
  {/* 🖼️ Carrousel de imágenes */}
  <div
    style={{
      position: 'relative',
      flex: '1 1 36%',
      height: '80vh',
      overflow: 'hidden',
    }}
  >
    {heroImages.map((src, i) => (
      <motion.img
        key={i}
        src={src}
        alt={`Lex ${i + 1}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: i === activeImage ? 1 : 0,
          scale: i === activeImage ? 1 : 1.05,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
        }}
      />
    ))}

    {/* Flechas laterales */}
    <button
      onClick={() => setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
      style={{
        position: 'absolute',
        top: '50%',
        left: 16,
        transform: 'translateY(-50%)',
        fontSize: 36,
        color: 'rgba(255,255,255,0.7)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
    >
      ‹
    </button>

    <button
      onClick={() => setActiveImage((prev) => (prev + 1) % heroImages.length)}
      style={{
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: 'translateY(-50%)',
        fontSize: 36,
        color: 'rgba(255,255,255,0.7)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
    >
      ›
    </button>
  </div>

  {/* ✨ Texto dinámico a la derecha */}
  <motion.div
    style={{
      flex: '1 1 64%',
      padding: '72px 56px',
      background: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Roboto, system-ui',
    }}
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
  >
    <AnimatePresence mode="wait">
      {activeText === 0 ? (
        <motion.div
          key="lex1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            style={{
              fontSize: 64,
              marginBottom: 24,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: '#fff',
            }}
          >
            ¿Qué es Lex Corazón?
          </h1>
          <div
            style={{
              maxHeight: '55vh',
              overflowY: 'auto',
              paddingRight: 8,
              scrollbarWidth: 'none',
            }}
            className="no-scrollbar"
          >
            {[
              'Lex Corazón es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto. Es un mapa para quienes sienten que lo que tienen dentro necesita una forma, una voz y una estética que les haga justicia.',
              'Nació de una urgencia: dejar atrás fórmulas prefabricadas y maneras huecas de “hacer marca”. Aquí la creatividad no se entiende como adorno ni estrategia fría, sino como una pulsión vital: un acto de honestidad radical y de belleza subversiva.',
              'El recorrido va de dentro hacia afuera. Primero se mira lo oculto, lo que incomoda, lo que bloquea. Después llega la rebelión: un motín contra lo que limita, un grito que abre paso a los talentos dormidos.',
              'De ahí se enciende la chispa: la cerilla que prende la esencia creativa y la convierte en materia prima. En etapas posteriores esa materia se moldea en identidad, se desborda en estética, hasta llegar finalmente a lo tangible: un proyecto real, coherente y encarnado.',
              'Lex Corazón es un cruce entre introspección, arte y estrategia. Un espacio donde conviven símbolos, narrativas, moda, filosofía y juego. Un laboratorio en el que las ideas no se quedan en la mente: se transforman en imágenes, palabras y estructuras capaces de sostenerse en el mundo.',
              'Cada persona que atraviesa este proceso encuentra su propio sistema creativo: una forma única de producir, comunicar y sostener lo que hace en el tiempo.',
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                style={{
                  marginBottom: 16,
                  lineHeight: 1.7,
                  opacity: 0.95,
                  fontSize: 20,
                  color: '#eee',
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="lex2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            style={{
              fontSize: 64,
              marginBottom: 24,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: '#fff',
            }}
          >
            Lex Corazón — desde donde acompaño
          </h1>
          <div
            style={{
              maxHeight: '55vh',
              overflowY: 'auto',
              paddingRight: 8,
              scrollbarWidth: 'none',
            }}
            className="no-scrollbar"
          >
            {[
              'He atravesado la confusión, el deseo, la ruptura, el vacío y la búsqueda de sentido. He aprendido a mirar mis bloqueos y mis impulsos con la misma curiosidad con la que observo el arte o el cielo.',
              'Desde ahí nació Lex Corazón: como una forma de darle cuerpo a algo que no es un método, sino una experiencia compartida.',
              'Acompaño a otras personas no porque tenga todas las respuestas, sino porque sé lo que es perder el pulso vital, y también lo que es recuperarlo.',
              'Uso la astrología, la introspección simbólica y la creatividad como espejos: formas de ver lo invisible, de traducir la emoción en lenguaje y el deseo en movimiento.',
              'No pretendo sanar ni enseñar a vivir. Sostengo un espacio donde cada persona pueda escucharse, moverse y entender su propio código: su manera única de estar viva.',
              'Mi ética es la honestidad. Mi herramienta, la experiencia. Y mi intención es simple: que las personas vuelvan a sentir su propio fuego, incluso si todavía no saben qué hacer con él.',
              'También acompaño a dar forma: a traducir lo que se siente o se intuye en algo que pueda verse, tocarse o compartirse. He trabajado muchos años entre la creación y la dirección —desde la marca María Magdalena hasta rodajes, pasando por procesos de identidad visual y narrativa.',
              'Esa experiencia me enseñó algo esencial: una idea no se materializa solo con técnica, sino con verdad. Por eso en Lex Corazón no solo miro lo interno, sino cómo eso puede expresarse afuera: una voz, un proyecto, una estética, una manera de habitar el mundo.',
              'Ayudo a ordenar, a estructurar, a encontrar coherencia sin apagar el instinto. No desde la exigencia de “hacer las cosas bien”, sino desde el deseo de que lo que nazca tenga alma.',
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                style={{
                  marginBottom: 16,
                  lineHeight: 1.7,
                  opacity: 0.95,
                  fontSize: 20,
                  color: '#eee',
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* 🔘 Botón para alternar texto */}
    <button
      onClick={() => setActiveText((prev) => (prev === 0 ? 1 : 0))}
      style={{
        position: 'absolute',
        bottom: 28,
        right: 40,
        background: '#fff',
        border: 'none',
        color: '#000',
        padding: '12px 26px',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#000'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.border = '1px solid #fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#fff'
        e.currentTarget.style.color = '#000'
        e.currentTarget.style.border = 'none'
      }}
    >
      {activeText === 0 ? '¿Cómo te acompaño?' : '¿Qué es Lex Corazón?'}
    </button>
  </motion.div>
</motion.section>


        {/* ---------- SESIONES ---------- */}
        <motion.section
          {...fadeUp}
          id="sessions"
          style={{
            width: '100vw',
            background: '#000',
            padding: '0 0 80px 0',
            margin: 0,
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              borderTop: '1px solid #111',
              borderLeft: '1px solid #111',
            }}
          >
            {[
              {
                title: 'Carta Natal',
                category: 'Sesiones astrológicas',
                desc: 'Una lectura profunda de tu carta natal para comprender tus patrones internos, talentos y desafíos vitales.',
              },
              {
                title: 'Viaje a las tripas',
                category: 'Sesiones introspectivas',
                desc: 'Explora emociones, bloqueos y apegos para reconectar con tu yo más genuino.',
              },
              {
                title: 'Motín existencial',
                category: 'Talentos y propósito',
                desc: 'Descubre talentos dormidos y propósito vital con astrología psicológica.',
              },
              {
                title: 'Caja de cerillas',
                category: 'Experimentación creativa',
                desc: 'Libera tu creatividad y conecta con la chispa que transforma ideas en acción.',
              },
              {
                title: 'Lex ID',
                category: 'ADN de marca',
                desc: 'Define la base de tu proyecto o marca: quién eres, qué representas y qué valores te guían.',
              },
              {
                title: 'Aesthetic Overdose',
                category: 'Estética y concepto',
                desc: 'Construye tu universo visual y conceptual con estilo propio: tono, narrativa y estética.',
              },
              {
                title: 'Carne y hueso',
                category: 'Creación de producto',
                desc: 'Convierte ideas en productos tangibles con coherencia y profundidad.',
              },
              {
                title: 'Pack de sesiones',
                category: 'Programas completos',
                desc: 'Un acompañamiento integral en varias sesiones, combinando introspección y acción para una transformación sostenida.',
              },
            ].map((c, i) => (
              <motion.article
                key={i}
                style={{
                  borderRight: '1px solid #111',
                  borderBottom: '1px solid #111',
                  background: '#fff',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 460,
                  padding: 32,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div style={{ minHeight: 240 }}>
                  <div
                    style={{
                      color: '#6b7280',
                      fontSize: 14,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  >
                    {c.category}
                  </div>

                  <h3
                    style={{
                      margin: '0 0 12px',
                      fontSize: 38,
                      fontWeight: 700,
                      color: '#000',
                      lineHeight: 1.2,
                      minHeight: 80,
                    }}
                  >
                    {c.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: 18,
                      lineHeight: 1.5,
                      color: '#222',
                    }}
                  >
                    {c.desc}
                  </p>
                </div>

<button
  onClick={() => openBookingFor(c.title)}
  style={{
    marginTop: 20,
    alignSelf: 'flex-start',
    background: '#000',
    color: '#fff',
    border: '1px solid #000',
    padding: '10px 18px',
    borderRadius: 26,
    fontSize: 20,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: 0.5,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#fff'
    e.currentTarget.style.color = '#000'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = '#000'
    e.currentTarget.style.color = '#fff'
  }}
>
  AGENDAR +INFO
</button>

              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* ---------- MODAL DE RESERVA ---------- */}
        <AnimatePresence>
{bookingOpen && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}
  >
    <div
      style={{
        width: 'min(720px, 92vw)',
        background: '#0b0b0b',
        color: '#fff',
        border: '1px solid #222',
        borderRadius: 12,
        padding: 28,
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      {/* Botón cerrar */}
      <button
        onClick={() => setBookingOpen(false)}
        style={{
          position: 'absolute',
          right: 14,
          top: 12,
          background: 'transparent',
          color: '#aaa',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
        }}
      >
        ×
      </button>

      <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800 }}>Reserva tu sesión</h3>
      {form.session_title && (
        <div style={{ color: '#bbb', fontSize: 14, marginBottom: 18 }}>
          Sesión seleccionada: <strong style={{ color: '#fff' }}>{form.session_title}</strong>
        </div>
      )}

      {/* -------- FORMULARIO -------- */}
      <form onSubmit={handleSubmitBooking} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ color: '#ccc', fontSize: 14 }}>Fecha de nacimiento*</label>
          <input
            name="birth_date"
            placeholder="DD/MM/AAAA"
            value={form.birth_date}
            onChange={handleChange}
            required
            style={{
              background: '#000',
              color: '#fff',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '12px 14px',
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ color: '#ccc', fontSize: 14 }}>Lugar de nacimiento (Ciudad, País)*</label>
          <input
            name="birth_place"
            placeholder="Ciudad, País"
            value={form.birth_place}
            onChange={handleChange}
            required
            style={{
              background: '#000',
              color: '#fff',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '12px 14px',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ color: '#ccc', fontSize: 14 }}>Hora de nacimiento (HH:MM)*</label>
            <input
              name="birth_time"
              placeholder="14:30"
              value={form.birth_time}
              onChange={handleChange}
              required
              style={{
                background: '#000',
                color: '#fff',
                border: '1px solid #222',
                borderRadius: 8,
                padding: '12px 14px',
              }}
            />
          </div>
          <label
            style={{
              alignSelf: 'end',
              color: '#ddd',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              fontSize: 14,
            }}
          >
            <input type="checkbox" name="time_exact" checked={form.time_exact} onChange={handleChange} />
            Hora exacta
          </label>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ color: '#ccc', fontSize: 14 }}>¿Qué esperas de la sesión?</label>
          <input
            name="expectations"
            value={form.expectations}
            onChange={handleChange}
            style={{
              background: '#000',
              color: '#fff',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '12px 14px',
            }}
          />
        </div>

        <label
          style={{
            color: '#ddd',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            fontSize: 14,
          }}
        >
          <input type="checkbox" name="knows_astrology" checked={form.knows_astrology} onChange={handleChange} />
          Tengo conocimientos de astrología
        </label>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ color: '#ccc', fontSize: 14 }}>¿En qué punto vital te encuentras?</label>
          <textarea
            name="life_point"
            rows={3}
            value={form.life_point}
            onChange={handleChange}
            style={{
              background: '#000',
              color: '#fff',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '12px 14px',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ color: '#ccc', fontSize: 14 }}>¿Qué relación tienes con la creatividad?</label>
          <textarea
            name="creativity"
            rows={3}
            value={form.creativity}
            onChange={handleChange}
            style={{
              background: '#000',
              color: '#fff',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '12px 14px',
              resize: 'vertical',
            }}
          />
        </div>

        {/* CTA WhatsApp + Stripe + Enviar */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 8,
          }}
        >
          <a
            href="https://wa.me/34XXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              gap: 10,
              alignItems: 'center',
              background: '#25D366',
              color: '#000',
              borderRadius: 8,
              padding: '10px 16px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            💬 Agenda por WhatsApp
          </a>

          <a
            href="/stripe/checkout"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#fff',
              color: '#000',
              borderRadius: 8,
              padding: '10px 16px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            💳 Pagar con Stripe
          </a>

          <button
            type="submit"
            disabled={sending}
            style={{
              marginLeft: 'auto',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              padding: '12px 18px',
              fontWeight: 700,
              cursor: 'pointer',
              opacity: sending ? 0.6 : 1,
            }}
          >
            {sending ? 'Enviando…' : 'Enviar formulario'}
          </button>
        </div>

        {sentOk === true && (
          <div style={{ color: '#7CFFB2', fontSize: 14, marginTop: 8 }}>
            ¡Listo! Tus datos se han enviado a <strong>lexcorazon@gmail.com</strong>.
          </div>
        )}
        {sentOk === false && (
          <div style={{ color: '#FF8A8A', fontSize: 14, marginTop: 8 }}>
            Hubo un problema al enviar. Revisa los campos o inténtalo de nuevo.
          </div>
        )}
      </form>
    </div>
  </div>
)}



        </AnimatePresence>

        {/* ---------- RESEÑAS ---------- */}
        <motion.section
          {...fadeUp}
          id="reviews"
          style={{
            width: '100vw',
            background: '#000',
            color: '#fff',
            padding: '120px 0',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 60,
              letterSpacing: 1,
            }}
          >
            Lo que dicen quienes vivieron Lex Corazón
          </h2>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                gap: 34,
                overflow: 'hidden',
                width: '70%',
                scrollBehavior: 'smooth',
              }}
              className="no-scrollbar"
            >
              {[
                { name: 'Ana', text: 'Una experiencia transformadora. Me ayudó a ver mis procesos creativos con una claridad brutal.' },
                { name: 'Luis', text: 'Lex Corazón no es una metodología, es una experiencia que me devolvió las ganas de crear desde lo auténtico.' },
                { name: 'María', text: 'Su acompañamiento fue un espejo de honestidad. Salí con una identidad creativa completamente nueva.' },
                { name: 'Valeria', text: 'Nunca imaginé que mi historia pudiera tener una voz tan estética. Lex Corazón me ayudó a encontrarla.' },
                { name: 'Diego', text: 'Cada sesión fue una revelación. De lo simbólico a lo concreto, todo cobró sentido.' },
                { name: 'Lucía', text: 'Hay algo profundamente humano en este proceso. No se trata solo de crear, sino de recordarte por qué empezaste.' },
                { name: 'Carmen', text: 'Sentí que me devolvía a mí misma. Una alquimia entre arte, emoción y estrategia que transforma de verdad.' },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  style={{
                    flex: '0 0 420px',
                    background: '#fff',
                    color: '#000',
                    borderRadius: 12,
                    padding: '32px 28px',
                    boxShadow: '0 10px 25px rgba(255,255,255,0.05)',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 12px 30px rgba(255,255,255,0.15)',
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontStyle: 'italic',
                      fontSize: 20,
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    “{r.text}”
                  </motion.p>
                  <footer
                    style={{
                      fontWeight: 600,
                      color: '#333',
                      fontSize: 16,
                      textAlign: 'right',
                    }}
                  >
                    — {r.name}
                  </footer>

                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '6px',
                      background: 'linear-gradient(90deg, #fff 0%, #999 100%)',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 🔸 Sombra decorativa inferior */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.section>

        {/* ---------- FOOTER ---------- */}
        <motion.footer
          style={{
            width: '100vw',
            background: '#000',
            color: '#fff',
            padding: '40px 16px',
            textAlign: 'center',
            borderTop: '1px solid #111',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Lex Corazón — Todos los derechos reservados</p>
        </motion.footer>
      </main>
    </div>
  )
}
