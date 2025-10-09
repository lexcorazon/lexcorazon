import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [heroImages.length])
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveText((prev) => (prev === 0 ? 1 : 0))
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  const prevText = useCallback(() => setActiveText((prev) => (prev - 1 + textSlides.length) % textSlides.length), [textSlides.length])
  const nextText = useCallback(() => setActiveText((prev) => (prev + 1) % textSlides.length), [textSlides.length])

  const containerStyle = { maxWidth: 1200, margin: '0 auto', padding: '0 16px' }
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
  ]

  return (
    <div style={{ overflow: 'hidden', width: '100%', minHeight: '100vh' }}>
      {/* ---------- Header ---------- */}
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
                  height: 25, // 🔥 50% más pequeño
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </a>
          </div>
        </div>
      </header>


      <main style={{ paddingTop: 0 }}>
        {/* ---------- HERO ---------- */}
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

            {/* Flechas de navegación imágenes */}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              ›
            </button>
          </div>

          {/* ✨ Bloque derecho con carrusel de texto */}
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
              overflow: 'hidden', // ✅ bloquea scroll lateral por completo
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
                      fontSize: 66,
                      marginBottom: 24,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    ¿Qué es Lex Corazon?
                  </h1>
                  <div
                    style={{
                      maxHeight: '55vh',
                      overflowY: 'auto',
                      paddingRight: 8,
                      scrollbarWidth: 'none', // Firefox
                    }}
                    className="no-scrollbar"
                  >

                    {[
                      'Lex Corazón es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto. Es un mapa para quienes sienten que lo que tienen dentro necesita una forma, una voz y una estética que les haga justicia.',
                      'Nació de una urgencia: dejar atrás fórmulas prefabricadas y maneras huecas de “hacer marca”. Aquí la creatividad no se entiende como adorno ni como estrategia fría, sino como una pulsión vital, un acto de honestidad radical y de belleza subversiva.',
                      'El recorrido va de dentro hacia afuera. Primero se mira lo oculto, lo que incomoda, lo que bloquea. Después llega la rebelión: un motín contra lo que limita, un grito que abre paso a los talentos dormidos. De ahí se enciende la chispa, la cerilla que prende la esencia creativa y la convierte en materia prima.',
                      'Lex Corazón es un cruce entre introspección, arte y estrategia. Un espacio donde conviven símbolos, narrativas, moda, filosofía y juego.',
                      'En la práctica, Lex Corazón es un proceso diseñado para que cada persona pueda conocerse a fondo: identificar sus talentos, reconocer su propósito y darle valor a su propia “mercancía interna”.',
                      'Lex Corazón no entrega una fórmula cerrada; acompaña a que cada creador encuentre la suya. Porque la verdadera libertad creativa no es producir sin límites, sino diseñar un marco propio en el que lo que somos pueda expresarse sin filtros.',
                    ].map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                        style={{
                          marginBottom: 14,
                          lineHeight: 1.7,
                          opacity: 0.95,
                          fontSize: 16,
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
                      fontSize: 66,
                      marginBottom: 24,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    Lex Corazón — desde donde acompaño
                  </h1>
                  <div
                    style={{
                      maxHeight: '55vh',
                      overflowY: 'auto',
                      paddingRight: 8,
                      scrollbarWidth: 'none', // Firefox
                    }}
                    className="no-scrollbar"
                  >

                    {[
                      'He atravesado la confusión, el deseo, la ruptura, el vacío y la búsqueda de sentido.',
                      'He aprendido a mirar mis bloqueos y mis impulsos con la misma curiosidad con la que observo el arte o el cielo.',
                      'Desde ahí nació Lex Corazón: como una forma de darle cuerpo a algo que no es un método, sino una experiencia compartida.',
                      'Acompaño a otras personas no porque tenga todas las respuestas, sino porque sé lo que es perder el pulso vital, y también lo que es recuperarlo.',
                      'Uso la astrología, la introspección simbólica y la creatividad como espejos: formas de ver lo invisible, de traducir la emoción en lenguaje, y el deseo en movimiento.',
                      'Mi ética es la honestidad. Mi herramienta, la experiencia. Y mi intención es simple: que las personas vuelvan a sentir su propio fuego, incluso si todavía no saben qué hacer con él.',
                      'He trabajado muchos años entre la creación y la dirección —desde la marca María Magdalena hasta los rodajes, pasando por procesos de identidad visual, concepto y narrativa.',
                      'Esa experiencia me enseñó algo esencial: una idea no se materializa solo con técnica, sino con verdad.',
                      'Por eso en Lex Corazón no solo miro lo interno, sino cómo eso puede expresarse afuera: una voz, un proyecto, una estética, una manera de habitar el mundo.',
                    ].map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                        style={{
                          marginBottom: 14,
                          lineHeight: 1.7,
                          opacity: 0.95,
                          fontSize: 16,
                        }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 🔹 Flecha simple para cambiar texto */}
            <button
              onClick={() => setActiveText((prev) => (prev === 0 ? 1 : 0))}
              style={{
                position: 'absolute',
                bottom: 24,
                right: 36,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 20,
                lineHeight: 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#fff'
              }}
            >
              {activeText === 0 ? '›' : '‹'}
            </button>
          </motion.div>
        </motion.section>





        {/* ---------- SESIONES ---------- */}
        <motion.section {...fadeUp} id="sessions" style={{ ...containerStyle, padding: '40px 16px' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>Sesiones</h2>

          {/* 1️⃣ Sesiones astrológicas */}
          <div style={{ margin: '8px 0 16px', color: '#111', fontWeight: 700 }}>Sesiones astrológicas</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <motion.article
              style={{ ...serviceCardStyle, gridColumn: '1 / 2' }}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div>
                <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', marginBottom: 6 }}>
                  {extraCourses[0].category}
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{extraCourses[0].title}</h3>
                <p style={{ margin: 0 }}>{extraCourses[0].desc}</p>
              </div>
            </motion.article>
          </div>

          {/* 2️⃣ Sesiones introspectivas */}
          <div style={{ margin: '28px 0 16px', color: '#111', fontWeight: 700 }}>Sesiones introspectivas</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {coursesRow1.map((c, i) => (
              <motion.article
                key={i}
                style={serviceCardStyle}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div>
                  <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', marginBottom: 6 }}>{c.category}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{c.title}</h3>
                  <p style={{ margin: 0 }}>{c.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* 3️⃣ Sesiones de construcción */}
          <div style={{ margin: '28px 0 16px', color: '#111', fontWeight: 700 }}>Sesiones de construcción</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {coursesRow2.map((c, i) => (
              <motion.article
                key={i}
                style={serviceCardStyle}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div>
                  <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', marginBottom: 6 }}>{c.category}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{c.title}</h3>
                  <p style={{ margin: 0 }}>{c.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* 4️⃣ Programas completos */}
          <div style={{ margin: '28px 0 16px', color: '#111', fontWeight: 700 }}>Programas completos</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <motion.article
              style={{ ...serviceCardStyle, gridColumn: '1 / 2' }}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div>
                <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', marginBottom: 6 }}>
                  {extraCourses[1].category}
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{extraCourses[1].title}</h3>
                <p style={{ margin: 0 }}>{extraCourses[1].desc}</p>
              </div>
            </motion.article>
          </div>
        </motion.section>

        {/* ---------- RESEÑAS ---------- */}
        <motion.section {...fadeUp} id="reviews" style={{ ...containerStyle, padding: '60px 16px' }}>
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>Reseñas</h2>
          {reviews.map((r, i) => (
            <motion.blockquote
              key={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                border: '1px solid #111',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                background: '#fff',
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: 18 }}>“{r.text}”</p>
              <footer style={{ marginTop: 8, color: '#6b7280' }}>— {r.name}</footer>
            </motion.blockquote>
          ))}
        </motion.section>

        {/* ---------- FOOTER ---------- */}
        <motion.footer
          style={{ background: '#000', color: '#fff', padding: '32px 16px', textAlign: 'center' }}
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
