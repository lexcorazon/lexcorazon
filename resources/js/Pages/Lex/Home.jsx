import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

export default function LexHome() {
  const [activeImage, setActiveImage] = useState(0)
  const [activeText, setActiveText] = useState(0)
  const heroImages = Array.from({ length: 21 }, (_, i) => `/images/lex/lex${i + 1}.jpg`)

  // 🌀 Carrusel de reseñas automático
  const [activeReview, setActiveReview] = useState(0)
  const reviews = [
    { name: 'Ana', text: 'Una experiencia transformadora. Me ayudó a ver mis procesos creativos con una claridad brutal.' },
    { name: 'Luis', text: 'Lex Corazón no es una metodología, es una experiencia que me devolvió las ganas de crear desde lo auténtico.' },
    { name: 'María', text: 'Su acompañamiento fue un espejo de honestidad. Salí con una identidad creativa completamente nueva.' },
    { name: 'Valeria', text: 'Nunca imaginé que mi historia pudiera tener una voz tan estética. Lex Corazón me ayudó a encontrarla.' },
    { name: 'Diego', text: 'Cada sesión fue una revelación. De lo simbólico a lo concreto, todo cobró sentido.' },
    { name: 'Lucía', text: 'Hay algo profundamente humano en este proceso. No se trata solo de crear, sino de recordarte por qué empezaste.' },
    { name: 'Carmen', text: 'Sentí que me devolvía a mí misma. Una alquimia entre arte, emoción y estrategia que transforma de verdad.' },
  ]

  // Ref y control del carrusel horizontal
  const reviewsContainerRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const scrollCarousel = (direction) => {
    const container = reviewsContainerRef.current
    if (!container) return
    const cardWidth = container.firstChild?.offsetWidth + 34 || 0
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      scrollCarousel('right')
    }, 6000)
    return () => clearInterval(interval)
  }, [paused])

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

  /* ---------- Scroll suave en navegación ---------- */
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

  /* ---------- Carrusel de imágenes del hero ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [heroImages.length])

  /* ---------- Cambio automático de texto ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveText((prev) => (prev === 0 ? 1 : 0))
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  const prevText = useCallback(() => setActiveText((prev) => (prev - 1 + 2) % 2), [])
  const nextText = useCallback(() => setActiveText((prev) => (prev + 1) % 2), [])

  const containerStyle = { maxWidth: 2700, margin: '0 auto', padding: '0 32px' }

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

  const extraCourses = [
    {
      title: 'Carta Natal',
      category: 'Sesiones astrológicas',
      desc: 'Una lectura profunda de tu carta natal para comprender tus patrones internos, talentos y desafíos vitales.',
    },
    {
      title: 'Pack de Sesiones',
      category: 'Programas completos',
      desc: 'Un acompañamiento integral en varias sesiones, combinando introspección y acción para una transformación sostenida.',
    },
  ]

  const coursesRow1 = [
    {
      title: 'Viaje a las tripas - Introspección',
      category: 'Sesiones introspectivas',
      desc: 'Explora emociones, bloqueos y apegos para reconectar con tu yo más genuino.',
    },
    {
      title: 'Motín existencial - Talentos y propósito',
      category: 'Sesiones introspectivas',
      desc: 'Descubre talentos reprimidos y propósito vital con astrología psicológica.',
    },
    {
      title: 'Caja de cerillas - Experimentación creativa',
      category: 'Sesiones introspectivas',
      desc: 'Libera tu creatividad y conecta con la chispa que transforma ideas en acción.',
    },
  ]

  const coursesRow2 = [
    {
      title: 'Lex ID - ADN de marca',
      category: 'Sesiones de construcción',
      desc: 'Define la base de tu proyecto o marca: quién eres, qué representas y qué valores te guían.',
    },
    {
      title: 'Aesthetic Overdose - Estética y concepto',
      category: 'Sesiones de construcción',
      desc: 'Construye tu universo visual y conceptual con estilo propio: tono, narrativa y estética.',
    },
    {
      title: 'Carne y hueso - Creación de producto',
      category: 'Sesiones de construcción',
      desc: 'Convierte ideas en productos tangibles con coherencia y profundidad.',
    },
  ]

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
        {/* ---------- HERO (negro + texto blanco) ---------- */}
        <motion.section
          id="hero"
          style={{ display: 'flex', flexWrap: 'wrap', minHeight: '80vh', background: '#000', overflow: 'hidden' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div style={{ position: 'relative', flex: '1 1 36%', height: '80vh', overflow: 'hidden' }}>
            {heroImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Lex ${i + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: i === activeImage ? 1 : 0, scale: i === activeImage ? 1 : 1.05 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ))}
          </div>

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
            }}
          >
            <AnimatePresence mode="wait">
              {activeText === 0 ? (
                <motion.div key="lex1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                  <h1 style={{ fontSize: 64, fontWeight: 700, textTransform: 'uppercase', marginBottom: 24 }}>¿Qué es Lex Corazón?</h1>
                  <p style={{ fontSize: 20, lineHeight: 1.7, color: '#eee' }}>
                    Lex Corazón es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto.
                  </p>
                  <p style={{ fontSize: 20, lineHeight: 1.7, color: '#eee' }}>
                    Aquí la creatividad no se entiende como adorno ni estrategia fría, sino como una pulsión vital: un acto de honestidad radical y de belleza subversiva.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="lex2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                  <h1 style={{ fontSize: 64, fontWeight: 700, textTransform: 'uppercase', marginBottom: 24 }}>
                    Lex Corazón — desde donde acompaño
                  </h1>
                  <p style={{ fontSize: 20, lineHeight: 1.7, color: '#eee' }}>
                    Acompaño a otras personas no porque tenga todas las respuestas, sino porque sé lo que es perder el pulso vital, y también lo que es recuperarlo.
                  </p>
                  <p style={{ fontSize: 20, lineHeight: 1.7, color: '#eee' }}>
                    Mi ética es la honestidad. Mi herramienta, la experiencia. Y mi intención es simple: que las personas vuelvan a sentir su propio fuego, incluso si todavía no saben qué hacer con él.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

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
            {[extraCourses[0], ...coursesRow1, ...coursesRow2, extraCourses[1]].map((c, i) => (
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

        {/* ---------- RESEÑAS (carrusel automático con loop infinito) ---------- */}
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

          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              ref={reviewsContainerRef}
              style={{
                display: 'flex',
                gap: 34,
                overflow: 'hidden',
                width: '70%',
                scrollBehavior: 'smooth',
              }}
              className="no-scrollbar"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {reviews.concat(reviews[0]).map((r, i) => (
                <motion.div
                  key={i}
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

            {/* 🔘 Flechas laterales */}
            <button
              onClick={() => scrollCarousel('left')}
              style={{
                position: 'absolute',
                left: '10%',
                background: 'transparent',
                border: 'none',
                fontSize: 48,
                color: '#fff',
                cursor: 'pointer',
                opacity: 0.6,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
            >
              ‹
            </button>

            <button
              onClick={() => scrollCarousel('right')}
              style={{
                position: 'absolute',
                right: '10%',
                background: 'transparent',
                border: 'none',
                fontSize: 48,
                color: '#fff',
                cursor: 'pointer',
                opacity: 0.6,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
            >
              ›
            </button>
          </div>
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
