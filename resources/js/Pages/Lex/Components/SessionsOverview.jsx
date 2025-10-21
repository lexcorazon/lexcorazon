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
    'Viaje a las tripas': 'Viaje a las tripas - Introspección',
    'Motín existencial': 'Motín existencial - Talentos y propósito',
    'Caja de cerillas': 'Caja de cerillas - Desbloqueo creativo',
    'Lex ID': 'Lex ID - Adn de marca',
    'Aesthetic Overdose': 'Aesthetic Overdose - Estética y concepto',
    'Carne y hueso': 'Carne y hueso - Creación de producto'
  }

  const introspectivas = [
    'Viaje a las tripas',
    'Motín existencial',
    'Caja de cerillas'
  ]

  const construccion = [
    'Lex ID',
    'Aesthetic Overdose',
    'Carne y hueso'
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
        minHeight: '100vh',
        background: '#000',
        padding: '80px 40px',
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
        padding: '60px 40px',
        background: 'radial-gradient(circle at center, rgba(119, 206, 228, 0.15) 0%, transparent 70%)'
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
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#77cee4',
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 1.2
          }}>
            Coaching<br />Astrológico
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
              fontSize: 60,
              color: '#77cee4'
            }}
          >
            ↓
          </motion.div>

          <h3 
            onClick={() => scrollToSession('Carta Natal')}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 3,
              padding: '20px 40px',
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
        padding: '60px 40px',
        background: 'radial-gradient(circle at center, rgba(255, 213, 0, 0.1) 0%, transparent 70%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Título principal */}
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#FFD500',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            Mentoría<br />Creativa
          </h2>

          {/* Subtítulo */}
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            marginBottom: 50,
            textAlign: 'center'
          }}>
            Viaje Lex Corazon
          </h3>

          {/* Grid de sesiones */}
          <div className="sessions-grid-container" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: 40,
            marginTop: 40
          }}>
            {/* Columna Izquierda - Introspectivas */}
            <div className="sessions-grid-column" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              <h4 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#FFD500',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 10,
                textAlign: 'center'
              }}>
                Introspectivas
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
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    background: 'rgba(255, 213, 0, 0.15)',
                    borderColor: '#FFD500',
                    scale: 1.05
                  }}
                >
                  {sesion}
                </motion.div>
              ))}
            </div>

            {/* Línea separadora */}
            <div className="sessions-grid-separator" style={{
              width: 1,
              background: 'linear-gradient(to bottom, transparent, #FFD500, transparent)',
              height: '100%'
            }} />

            {/* Columna Derecha - Construcción */}
            <div className="sessions-grid-column" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              <h4 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#FFD500',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 10,
                textAlign: 'center'
              }}>
                Construcción
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
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    background: 'rgba(255, 213, 0, 0.15)',
                    borderColor: '#FFD500',
                    scale: 1.05
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
            padding: 40px 20px !important;
            min-height: auto !important;
          }
          
          .sessions-overview-left {
            border-right: none !important;
            border-bottom: 1px solid #222;
            padding: 40px 20px !important;
            min-height: 60vh !important;
          }
          
          .sessions-overview-right {
            padding: 40px 20px !important;
          }

          .sessions-grid-container {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin-top: 30px !important;
          }

          .sessions-grid-separator {
            display: none !important;
          }

          .sessions-grid-column h4 {
            font-size: 16px !important;
          }
        }

        /* Móvil pequeño */
        @media (max-width: 480px) {
          .sessions-overview-section {
            padding: 30px 16px !important;
          }

          .sessions-overview-left,
          .sessions-overview-right {
            padding: 30px 16px !important;
          }

          .sessions-grid-column > div {
            padding: 14px 16px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </motion.section>
  )
}

