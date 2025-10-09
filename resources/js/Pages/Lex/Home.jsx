import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

export default function LexHome() {
  const [activeImage, setActiveImage] = useState(0)
  const [activeText, setActiveText] = useState(0)
  const heroImages = Array.from({ length: 21 }, (_, i) => `/images/lex/lex${i + 1}.jpg`)

  const textSlides = useMemo(() => ([
    {
      title: '¿Qué es Lex Corazón?',
      parts: [
        'Lex Corazón es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto...',
        'Nació de una urgencia: dejar atrás fórmulas prefabricadas y maneras huecas de “hacer marca”...',
      ],
    },
    {
      title: 'Lex Corazón — desde donde acompaño',
      parts: [
        'He atravesado la confusión, el deseo, la ruptura, el vacío y la búsqueda de sentido...',
        'Esa experiencia me enseñó algo esencial: <strong>una idea no se materializa solo con técnica, sino con verdad</strong>.',
      ],
    },
  ]), [])

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

    // Guarda Lenis en global para poder usarlo en el scroll de navegación
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

  /* ---------- Carrusel de imágenes ---------- */
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

  const prevText = useCallback(() => setActiveText((prev) => (prev - 1 + textSlides.length) % textSlides.length), [textSlides.length])
  const nextText = useCallback(() => setActiveText((prev) => (prev + 1) % textSlides.length), [textSlides.length])

  const containerStyle = { maxWidth: 2700, margin: '0 auto', padding: '0 32px' }
  const serviceCardStyle = {
    border: '1px solid #111',
    borderRadius: 8,
    padding: 16,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 260,
  }

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

  const reviews = [
    { name: 'Ana', text: 'Una experiencia transformadora, clara y práctica.' },
    { name: 'Luis', text: 'Contenido bien estructurado y fácil de seguir.' },
    { name: 'María', text: 'Las mentorías aportaron foco y resultados rápidos.' },
    { name: 'Sofía', text: 'El grupo de apoyo fue fundamental para mi progreso.' },
    { name: 'Carlos', text: 'Aprendí a gestionar mi tiempo y prioridades.' },
    { name: 'Elena', text: 'El material adicional enriqueció mucho el aprendizaje.' },
    { name: 'Javier', text: 'La comunidad fue un gran soporte durante el curso.' },
    { name: 'Lucía', text: 'Me ayudó a definir y alcanzar mis objetivos.' },
    { name: 'Miguel', text: 'Los ejercicios prácticos facilitaron la aplicación.' },
    { name: 'Isabel', text: 'Recomiendo este curso a cualquiera que busque crecimiento.' },
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
            boxSizing: 'border-box',
          }}
        >
          {/* Centro: Lex Corazón + navegación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#hero" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/lex-corazon.png"
                alt="Lex Corazón"
                style={{
                  height: 48,
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </a>

            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              <a href="#sessions" style={{ color: '#fff', textDecoration: 'none' }}>
                Servicios
              </a>
              <a href="#reviews" style={{ color: '#fff', textDecoration: 'none' }}>
                Reseñas
              </a>
              <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>
                Contacto
              </a>
            </nav>
          </div>

          {/* Derecha: logo AJ más pequeño */}
          <div
            style={{
              position: 'absolute',
              right: 32,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <a href="/aj" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img
                src="/images/BAJ.png"
                alt="Volver a AJ"
                style={{
                  height: 25,
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </a>
          </div>
        </div>
      </header>


      <main style={{ paddingTop: 0 }}>

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



        {/* ---------- SESIONES (sin espacio ni padding lateral) ---------- */}
        <motion.section
          {...fadeUp}
          id="sessions"
          style={{
            width: '100vw',
            background: '#000',
            padding: '0 0 80px 0', // 👈 sin padding lateral ni superior
            margin: 0, // 👈 sin separación respecto al hero
            position: 'relative',
          }}
        >
          {/* Grid de tarjetas */}
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
                <div style={{ minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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
                      display: 'flex',
                      alignItems: 'flex-end',
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
                      flexGrow: 1,
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
                    border: '1px solid #030303ff',
                    padding: '10px 18px',
                    borderRadius: 26,
                    fontSize: 30,
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




        {/* ---------- RESEÑAS (versión dinámica con carrusel horizontal) ---------- */}
        <motion.section
          {...fadeUp}
          id="reviews"
          style={{
            width: '100vw',
            background: '#000',
            color: '#fff',
            padding: '100px 0',
            overflow: 'hidden',
            position: 'relative',
          }}
        >


          {/* 🔹 Carrusel horizontal */}
          <motion.div
            style={{
              display: 'flex',
              gap: 34,
              padding: '0 25vw',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
            }}
            className="no-scrollbar"
          >
            {reviews.map((r, i) => (
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,255,255,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,255,255,0.05)'
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

                {/* 🌟 Efecto decorativo sutil */}
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

          {/* 🔸 Pequeña sombra inferior de transición */}
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
