import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero({ heroImages, activeImage, setActiveImage, activeText, setActiveText }) {
  const scrollRef = useRef(null)

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
  ]

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [heroImages.length, setActiveImage])

  // Cambio de bloque de texto automático
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveText((prev) => (prev === 0 ? 1 : 0))
    }, 20000)
    return () => clearInterval(timer)
  }, [setActiveText])

  // Handler nativo: deja que el scroll sea del contenedor; si está en top/bottom, deja pasar al body
  const handleWheel = (e) => {
    const el = scrollRef.current
    if (!el) return
    const delta = e.deltaY
    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
    const canScrollInside = !(atTop && delta < 0) && !(atBottom && delta > 0)
    if (canScrollInside) {
      // dejamos que el navegador desplace el contenedor, pero no el body
      e.stopPropagation()
      // no llamamos a preventDefault → no hay warnings de passive listeners
    }
    // si no puede seguir desplazándose, no detenemos nada y el body recibe la rueda
  }

  return (
    <motion.section
      id="hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '100vh',
        background: '#000',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* Carrusel (solo desktop) */}
      <div className="hero-carousel" style={{ position: 'relative', flex: '1 1 36%', height: '100vh', overflow: 'hidden' }}>
        {heroImages.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Lex ${i + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: i === activeImage ? 1 : 0, scale: i === activeImage ? 1 : 1.05 }}
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

        {/* Flechas desktop */}
        <button
          onClick={() => setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="hero-arrow left"
        >
          ‹
        </button>
        <button
          onClick={() => setActiveImage((prev) => (prev + 1) % heroImages.length)}
          className="hero-arrow right"
        >
          ›
        </button>
      </div>

      {/* Texto */}
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
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 4rem)',
                marginBottom: 24,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {heroTexts[activeText].title}
            </h1>

            {/* Contenedor scroll interno */}
            <div
              ref={scrollRef}
              onWheel={handleWheel}
              className="custom-scrollbar no-arrows"
              style={{
                maxHeight: '55vh',
                paddingRight: 12,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollBehavior: 'smooth',
                scrollbarGutter: 'stable',
              }}
            >
              {heroTexts[activeText].paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                  style={{
                    marginBottom: 16,
                    lineHeight: 1.7,
                    opacity: 0.95,
                    fontSize: 32,
                    color: '#eee',
                    textAlign: 'justify',
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setActiveText((prev) => (prev === 0 ? 1 : 0))}
          className="hero-button"
        >
          {activeText === 0 ? '¿Cómo te acompaño?' : '¿Qué es Lex Corazon?'}
        </button>

        <style>{`
          /* Scrollbar */
          .no-arrows::-webkit-scrollbar-button { display: none !important; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.25);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.45);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
          }

          /* Flechas (desktop) */
          .hero-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 36px;
            color: rgba(255,255,255,0.7);
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 10;
            transition: color 0.3s ease;
          }
          .hero-arrow.left { left: 16px; }
          .hero-arrow.right { right: 16px; }
          .hero-arrow:hover { color: #fff; }

          /* Responsive móvil: sin fotos + hero más corto */
          @media (max-width: 1024px) {
            #hero {
              flex-direction: column;
              padding-top: 50px !important;
              min-height: 90vh !important;
            }
            .hero-carousel { display: none !important; }
            #hero h1 {
              font-size: 1.8rem !important;
              text-align: center;
              line-height: 1.2;
              margin-top: 1rem;
            }
            .custom-scrollbar { max-height: 50vh !important; }
            .hero-button {
              position: static !important;
              margin: 2rem auto 0 auto !important;
              display: block !important;
            }
          }
.hero-button {
  position: absolute;
  bottom: 28px;
  right: 40px;
  background: #fff;
  color: #000;
  border: none;
  padding: 12px 26px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-button:hover {
  background: #000;
  color: #fff;
  border: 1px solid #fff;
}

/* 🧠 Evita quedarse “pegado” en móvil */
.hero-button:focus,
.hero-button:active {
  background: #fff !important;
  color: #000 !important;
  border: none !important;
}

/* En móvil, centrado y estilo consistente */
@media (max-width: 1024px) {
  .hero-button {
    background: #fff !important;
    color: #000 !important;
    position: static !important;
    margin: 2rem auto 0 auto !important;
    display: block !important;
  }
}

        `}</style>
      </motion.div>
    </motion.section>
  )
}
