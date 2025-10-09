import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

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
        <section id="hero" style={{ display: 'flex', flexWrap: 'wrap', minHeight: '80vh', position: 'relative' }}>
          <motion.div
            style={{ position: 'relative', flex: '1 1 36%', overflow: 'hidden', background: '#000' }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {heroImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Lex ${i + 1}`}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === activeImage ? 1 : 0,
                  transition: 'opacity 2s ease-in-out, transform 8s ease-in-out',
                  transform: i === activeImage ? 'scale(1)' : 'scale(1.1)',
                }}
              />
            ))}
          </motion.div>

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
              fontFamily: 'Roboto, system-ui',
            }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          >
            <div key={activeText}>
              <h1 style={{ fontSize: 36, marginBottom: 24, fontWeight: 700 }}>{textSlides[activeText].title}</h1>
              {textSlides[activeText].parts.map((p, idx) => (
                <p key={idx} style={{ lineHeight: 1.7, opacity: 0.95 }} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </motion.div>
        </section>

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
