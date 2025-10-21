import React from 'react'
import { motion } from 'framer-motion'

export default function SessionsOverview() {
  const fadeUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
    viewport: { once: true },
  }

  // Mapeo de nombres cortos a títulos completos para hacer scroll
  const sessionMap = {
    'Carta Natal': 'Carta Natal',
    'VIAJE A LAS TRIPAS': 'Viaje a las tripas - Introspección',
    'MOTÍN EXISTENCIAL': 'Motín existencial - Talentos y propósito',
    'CAJA DE CERILLAS': 'Caja de cerillas - Desbloqueo creativo',
    'LEX ID': 'Lex ID - Adn de marca',
    'AESTHETIC OVERDOSE': 'Aesthetic Overdose - Estética y concepto',
    'CARNE Y HUESO': 'Carne y hueso - Creación de producto'
  }

  const introspectivas = [
    'VIAJE A LAS TRIPAS',
    'MOTÍN EXISTENCIAL',
    'CAJA DE CERILLAS'
  ]

  const construccion = [
    'LEX ID',
    'AESTHETIC OVERDOSE',
    'CARNE Y HUESO'
  ]

  // Función para hacer scroll suave a una sesión
  const scrollToSession = (sessionName) => {
    const fullTitle = sessionMap[sessionName]
    const sessionId = 'session-' + fullTitle.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[áàä]/g, 'a')
      .replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i')
      .replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9-]/g, '')
    
    const element = document.getElementById(sessionId)
    if (element) {
      // Si existe window.lenis (smooth scroll), usarlo
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80, duration: 1.5 })
      } else {
        // Fallback a scroll nativo
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  return (
    <motion.section
      {...fadeUp}
      className="sessions-overview-section"
      style={{
        width: '100%',
        minHeight: '120vh',
        background: '#000',
        padding: '100px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        borderBottom: '1px solid #222'
      }}
    >
      {/* IZQUIERDA - Coaching Astrológico */}
      <div className="sessions-overview-left" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '1px solid #222',
        padding: '80px 60px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40
          }}
        >
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            color: '#77cee4',
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 1.2
          }}>
            COACHING<br />ASTROLÓGICO
          </h2>

          {/* Flecha hacia abajo */}
          <motion.div
            animate={{
              y: [0, 15, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontSize: 80,
              color: '#77cee4'
            }}
          >
            ↓
          </motion.div>

          <h3 
            onClick={() => scrollToSession('Carta Natal')}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 3,
              padding: '30px 50px',
              border: '3px solid #77cee4',
              borderRadius: 20,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#77cee4'
              e.currentTarget.style.color = '#000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#fff'
            }}
          >
            CARTA NATAL
          </h3>
        </motion.div>
      </div>

      {/* DERECHA - Mentoría Creativa */}
      <div className="sessions-overview-right" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 60px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Título principal */}
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            color: '#FFD500',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            MENTORÍA<br />CREATIVA
          </h2>

          {/* Subtítulo */}
          <h3 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            marginBottom: 50,
            textAlign: 'center'
          }}>
            VIAJE LEX CORAZÓN
          </h3>

          {/* Grid de sesiones */}
          <div className="sessions-grid-container" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: 50,
            marginTop: 50
          }}>
            {/* Columna Izquierda - Introspectivas */}
            <div className="sessions-grid-column" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 35
            }}>
              <h4 style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#FFD500',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 15,
                textAlign: 'center'
              }}>
                INTROSPECTIVAS
              </h4>
              {introspectivas.map((sesion, i) => (
                <motion.div
                  key={i}
                  onClick={() => scrollToSession(sesion)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    padding: '28px 35px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 16,
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600,
                    textAlign: 'center',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  whileHover={{
                    background: 'rgba(255, 213, 0, 0.15)',
                    borderColor: '#FFD500',
                    scale: 1.05
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut'
                  }}
                >
                  {sesion}
                </motion.div>
              ))}
            </div>

            {/* Línea separadora */}
            <div className="sessions-grid-separator" style={{
              width: 2,
              background: '#FFD500',
              height: '100%'
            }} />

            {/* Columna Derecha - Construcción */}
            <div className="sessions-grid-column" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 35
            }}>
              <h4 style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#FFD500',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 15,
                textAlign: 'center'
              }}>
                CONSTRUCCIÓN
              </h4>
              {construccion.map((sesion, i) => (
                <motion.div
                  key={i}
                  onClick={() => scrollToSession(sesion)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    padding: '28px 35px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 16,
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600,
                    textAlign: 'center',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  whileHover={{
                    background: 'rgba(255, 213, 0, 0.15)',
                    borderColor: '#FFD500',
                    scale: 1.05
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut'
                  }}
                >
                  {sesion}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS Responsive */}
      <style>{`
        /* Tablet y móvil */
        @media (max-width: 1024px) {
          .sessions-overview-section {
            grid-template-columns: 1fr !important;
            padding: 50px 20px !important;
            min-height: auto !important;
          }
          
          .sessions-overview-left {
            border-right: none !important;
            border-bottom: 1px solid #222;
            padding: 50px 20px !important;
            min-height: auto !important;
          }

          .sessions-overview-left h2 {
            font-size: clamp(2rem, 5vw, 3rem) !important;
          }

          .sessions-overview-left h3 {
            font-size: clamp(1.5rem, 4vw, 2.5rem) !important;
            padding: 20px 30px !important;
          }

          .sessions-overview-left > div > div {
            gap: 30px !important;
          }
          
          .sessions-overview-right {
            padding: 50px 20px !important;
          }

          .sessions-overview-right h2 {
            font-size: clamp(2rem, 5vw, 3rem) !important;
            margin-bottom: 15px !important;
          }

          .sessions-overview-right h3 {
            font-size: clamp(1.3rem, 3.5vw, 2rem) !important;
            margin-bottom: 35px !important;
          }

          .sessions-grid-container {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin-top: 35px !important;
          }

          .sessions-grid-separator {
            display: none !important;
          }

          .sessions-grid-column {
            gap: 18px !important;
          }

          .sessions-grid-column h4 {
            font-size: 19px !important;
            margin-bottom: 12px !important;
          }

          .sessions-grid-column > div {
            padding: 16px 20px !important;
            font-size: 15px !important;
            border-radius: 10px !important;
          }
        }

        /* Móvil pequeño */
        @media (max-width: 480px) {
          .sessions-overview-section {
            padding: 40px 20px !important;
          }

          .sessions-overview-left,
          .sessions-overview-right {
            padding: 40px 20px !important;
          }

          .sessions-overview-left h2 {
            font-size: 1.8rem !important;
            line-height: 1.1 !important;
          }

          .sessions-overview-left h3 {
            font-size: 1.4rem !important;
            padding: 18px 25px !important;
            letter-spacing: 2px !important;
          }

          .sessions-overview-left > div > div {
            gap: 25px !important;
          }

          .sessions-overview-left > div > div > div:nth-child(2) {
            font-size: 50px !important;
          }

          .sessions-overview-right h2 {
            font-size: 1.8rem !important;
            margin-bottom: 12px !important;
          }

          .sessions-overview-right h3 {
            font-size: 1.2rem !important;
            margin-bottom: 30px !important;
          }

          .sessions-grid-container {
            gap: 25px !important;
            margin-top: 30px !important;
          }

          .sessions-grid-column {
            gap: 14px !important;
          }

          .sessions-grid-column h4 {
            font-size: 17px !important;
            margin-bottom: 10px !important;
          }

          .sessions-grid-column > div {
            padding: 14px 18px !important;
            font-size: 14px !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </motion.section>
  )
}

