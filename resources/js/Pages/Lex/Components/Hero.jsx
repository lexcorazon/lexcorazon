import React, { useState, useEffect } from 'react'; // ⚠️ no olvides useState si lo usas
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ heroImages, activeImage, setActiveImage, activeText, setActiveText }) {

  
  const heroTexts = [
    {
      title: '¿Qué es Lex Corazon?',
      paragraphs: [
        'Lex Corazon es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto. Es un mapa para quienes sienten que lo que tienen dentro necesita una forma, una voz y una estética que les haga justicia.',
        'Nació de una urgencia: dejar atrás fórmulas prefabricadas y maneras huecas de “hacer marca”. Aquí la creatividad no se entiende como adorno ni estrategia fría, sino como una pulsión vital: un acto de honestidad radical y de belleza subversiva.',
        'El recorrido va de dentro hacia afuera. Primero se mira lo oculto, lo que incomoda, lo que bloquea. Después llega la rebelión: un motín contra lo que limita, un grito que abre paso a los talentos dormidos.',
        'De ahí se enciende la chispa: la cerilla que prende la esencia creativa y la convierte en materia prima. En etapas posteriores esa materia se moldea en identidad, se desborda en estética, hasta llegar finalmente a lo tangible: un proyecto real, coherente y encarnado.',
        'Lex Corazon es un cruce entre introspección, arte y estrategia. Un espacio donde conviven símbolos, narrativas, moda, filosofía y juego. Un laboratorio en el que las ideas no se quedan en la mente: se transforman en imágenes, palabras y estructuras capaces de sostenerse en el mundo.',
        'Cada persona que atraviesa este proceso encuentra su propio sistema creativo: una forma única de producir, comunicar y sostener lo que hace en el tiempo.',
      ],
    },
    {
      title: 'Lex Corazon — desde donde acompaño',
      paragraphs: [
        'He atravesado la confusión, el deseo, la ruptura, el vacío y la búsqueda de sentido. He aprendido a mirar mis bloqueos y mis impulsos con la misma curiosidad con la que observo el arte o el cielo.',
        'Desde ahí nació Lex Corazón: como una forma de darle cuerpo a algo que no es un método, sino una experiencia compartida.',
        'Acompaño a otras personas no porque tenga todas las respuestas, sino porque sé lo que es perder el pulso vital, y también lo que es recuperarlo.',
        'Uso la astrología, la introspección simbólica y la creatividad como espejos: formas de ver lo invisible, de traducir la emoción en lenguaje y el deseo en movimiento.',
        'No pretendo sanar ni enseñar a vivir. Sostengo un espacio donde cada persona pueda escucharse, moverse y entender su propio código: su manera única de estar viva.',
        'Mi ética es la honestidad. Mi herramienta, la experiencia. Y mi intención es simple: que las personas vuelvan a sentir su propio fuego, incluso si todavía no saben qué hacer con él.',
        'También acompaño a dar forma: a traducir lo que se siente o se intuye en algo que pueda verse, tocarse o compartirse. He trabajado muchos años entre la creación y la dirección —desde la marca María Magdalena hasta rodajes, pasando por procesos de identidad visual y narrativa.',
        'Esa experiencia me enseñó algo esencial: una idea no se materializa solo con técnica, sino con verdad. Por eso en Lex Corazon no solo miro lo interno, sino cómo eso puede expresarse afuera: una voz, un proyecto, una estética, una manera de habitar el mundo.',
        'Ayudo a ordenar, a estructurar, a encontrar coherencia sin apagar el instinto. No desde la exigencia de “hacer las cosas bien”, sino desde el deseo de que lo que nazca tenga alma.',
      ],
    },
  ];
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

  return (
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
      <div style={{ position: 'relative', flex: '1 1 36%', height: '80vh', overflow: 'hidden' }}>
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
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', top: 0, left: 0 }}
          />
        ))}

        {/* Flechas laterales */}
        <button
          onClick={() => setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          style={{
            position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', fontSize: 36,
            color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        >
          ‹
        </button>
        <button
          onClick={() => setActiveImage((prev) => (prev + 1) % heroImages.length)}
          style={{
            position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', fontSize: 36,
            color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        >
          ›
        </button>
      </div>

      {/* ✨ Texto dinámico */}
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
          {heroTexts[activeText].title && (
            <motion.div
              key={activeText}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 style={{ fontSize: 64, marginBottom: 24, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#fff' }}>
                {heroTexts[activeText].title}
              </h1>
              <div style={{ maxHeight: '55vh', overflowY: 'auto', paddingRight: 8, scrollbarWidth: 'none' }} className="no-scrollbar">
                {heroTexts[activeText].paragraphs.map((p, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                    style={{ marginBottom: 16, lineHeight: 1.7, opacity: 0.95, fontSize: 20, color: '#eee' }}>
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setActiveText(prev => (prev === 0 ? 1 : 0))}
          style={{
            position: 'absolute', bottom: 28, right: 40, background: '#fff', border: 'none',
            color: '#000', padding: '12px 26px', borderRadius: 6, fontSize: 16, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.border = '1px solid #fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.border = 'none'; }}
        >
          {activeText === 0 ? '¿Cómo te acompaño?' : '¿Qué es Lex Corazon?'}
        </button>
      </motion.div>
    </motion.section>
  );
}
