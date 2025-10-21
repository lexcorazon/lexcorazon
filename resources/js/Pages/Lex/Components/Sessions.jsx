import React from 'react';
import { motion } from 'framer-motion';

export const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Sessions({ cardVariant, openBookingFor }) {
  // Primera fila
  const firstRow = [
    {
      title: 'Carta Natal',
      category: 'SESIONES CARTA NATAL/ COACHING ASTROLÓGICO',
      desc: 'Una lectura profunda de tu carta natal para comprender tus patrones internos, talentos y desafíos vitales.',
    },
    {
      title: 'Pack de sesiones',
      category: 'Programas completos',
      desc: 'Un acompañamiento integral en varias sesiones, combinando introspección y acción para una transformación sostenida.',
    },
  ];

    const fadeUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
    viewport: { once: true },
  }

  // Filas 2 y 3
  const otherRows = [
    { title: 'Viaje a las tripas - Introspección', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Explora emociones, bloqueos y apegos para reconectar con tu yo más genuino.' },
    { title: 'Motín existencial - Talentos y propósito', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Descubre talentos dormidos y propósito vital con astrología psicológica.' },
    { title: 'Caja de cerillas - Desbloqueo creativo', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Libera tu creatividad y conecta con la chispa que transforma ideas en acción.' },
    { title: 'Lex ID - Adn de marca', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Define la base de tu proyecto o marca: quién eres, qué representas y qué valores te guían.' },
    { title: 'Aesthetic Overdose - Estética y concepto', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Construye tu universo visual y conceptual con estilo propio: tono, narrativa y estética.' },
    { title: 'Carne y hueso - Creación de producto', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Convierte ideas en productos tangibles con coherencia y profundidad.' },
  ];

  // Crear ID único para cada sesión basado en el título
  const createSessionId = (title) => {
    return 'session-' + title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[áàä]/g, 'a')
      .replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i')
      .replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9-]/g, '');
  };

  const renderCard = (c, i, isFirstRow = false) => {
    const isCartaNatal = c.title === 'Carta Natal';
    const isPack = c.title === 'Pack de sesiones';
    const sessionId = createSessionId(c.title);

    return (
      <motion.article
        key={i}
        id={sessionId}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={i}
        style={{
          borderRight: '1px solid #111',
          borderBottom: '1px solid #111',
          background: isFirstRow ? (isCartaNatal ? '#77cee4ff' : '#FFD500') : '#fff',
          color: isFirstRow ? (isCartaNatal ? '#fff' : '#000') : '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 460,
          padding: 32,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          cursor: 'pointer',
          scrollMarginTop: '100px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ minHeight: 240 }}>
          <div style={{ color: isFirstRow ? (isCartaNatal ? '#9ca3af' : '#6b7280') : '#6b7280', fontSize: 14, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500, letterSpacing: 0.5 }}>
            {c.category}
          </div>
          <h3 style={{ margin: '0 0 12px', fontSize: 38, fontWeight: 700, color: isFirstRow ? (isCartaNatal ? '#0a0a0aff' : '#000') : '#000', lineHeight: 1.2, minHeight: 80 }}>
            {c.title}
          </h3>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: isFirstRow ? (isCartaNatal ? '#080808ff' : '#222') : '#222' }}>
            {c.desc}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
          <button
            onClick={() => openBookingFor(c.title)}
            style={{
              background: isFirstRow ? (isCartaNatal ? '#fff' : '#000') : '#000',
              color: isFirstRow ? (isCartaNatal ? '#000' : '#fff') : '#fff',
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
              if (isFirstRow) {
                if (isCartaNatal) { e.currentTarget.style.background = '#FFD500'; e.currentTarget.style.color = '#fff'; }
                if (isPack) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }
              } else {
                e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000';
              }
            }}
            onMouseLeave={(e) => {
              if (isFirstRow) {
                if (isCartaNatal) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }
                if (isPack) { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }
              } else {
                e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff';
              }
            }}
          >
            AGENDAR +INFO
          </button>
          {!isFirstRow && <span style={{ fontWeight: 700, fontSize: 18, color: '#000' }}>ETAPA{i + 1}</span>}
        </div>
      </motion.article>
    );
  };

  return (
    <motion.section
      {...fadeUp}
      id="sessions"
      style={{ width: '100%', background: '#000', padding: '0 16px 80px 16px', margin: 0, position: 'relative' }}
    >
      <style>{`
        .grid-responsive {
          display: grid;
          gap: 8px;
          border-top: 1px solid #111;
          border-left: 1px solid #111;
        }
        @media (min-width: 769px) {
          .grid-responsive.first-row { grid-template-columns: repeat(2, 1fr); margin-bottom: 8px; }
          .grid-responsive.other-rows { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; margin-bottom: 8px; }
        }
      `}</style>

      <div className="grid-responsive first-row">{firstRow.map((c, i) => renderCard(c, i, true))}</div>
      <div className="grid-responsive other-rows">{otherRows.map((c, i) => renderCard(c, i))}</div>
    </motion.section>
  );
}
