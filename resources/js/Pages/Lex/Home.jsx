import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Header from './Header'




export default function LexHome() {
  const [activeImage, setActiveImage] = useState(0)
  const [activeText, setActiveText] = useState(0)
  const [showBooking, setShowBooking] = useState(false) // 🆕 Modal de reserva
  const heroImages = Array.from({ length: 18 }, (_, i) => `/images/lex/lex${i + 1}.jpg`)
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

  // Lista de reseñas definida fuera del render para evitar reinicios
const reviewsData = [
  {
    name: 'María Fernández',
    text: `La sesión con Alejandra para conocer mi carta natal fue muy emocionante.  
Me permitió entenderme mejor y conectar con mi versión más auténtica.  
Combinó astrología con un enfoque psicológico-evolutivo profundo.  
Me ayudó a reconocer mis luces, sombras y aspectos ocultos de mí misma.  
Su atención y delicadeza al tratar temas sensibles fue notable.  
Recomendable para quienes buscan armonizar sentimientos y pensamientos.  
Esta experiencia me ayudará a honrar mi evolución y constante sanación.`
  },
  {
    name: 'Ricardo',
    text: `Gracias Alejandra, por acercarme un poquito más a la comprensión de esos aspectos que me gobiernan, y por guiarme con tu sensibilidad para dar los próximos pasos de mi viaje.`
  },
  {
    name: 'Lu',
    text: `La lectura fué una maravilla. Me sentí muy a gusto. Generaste un espacio seguro y cercano y fue todo lo que necesitaba en una primera experiencia de lectura. Todo lo que me compartiste me ha abierto un lugar muy cálido dentro, de corazon te lo digo.`
  },
  {
    name: 'Violeta',
    text: `Me ha gustado la cercanía de Alejandra y su visión abierta de la astrología, partiendo de un hondo conocimiento de la misma para plantear la sesión de una manera que no es una simple lectura sino que sirve como herramienta para la autoexploración. Se nota que a Alejandra le apasiona lo que hace, se implica al máximo en la sesión. Una experiencia muy interesante.`
  },
  {
    name: 'Ana',
    text: `Ha sido un placer hacer una lectura de carta astral con Alejandra. Fue súper generosa desde el principio preguntándome en qué aspectos quería indagar para preparar la lectura según mis intereses de ese momento. Me sirvió muchísimo su lectura por la profundidad y amplitud que tuvo Alejandra para explicarme las distintas cuestiones que vio en mi carta. Sentí que fue una conversacion y que entre ambas íbamos puliendo la información que me proporcionaba. Por otro lado, le pedí ahondar sobre un aspecto en concreto y me envió al día siguiente materiales. Total que recomiendo 100% una lectura con ella y destaco su sensibilidad, generosidad e intuición. Gracias!`
  }
];

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openBookingFor = (title) => {
    setForm((f) => ({ ...f, session_title: title }))
    setBookingOpen(true)
  }

  // 📨 Envío del formulario de reserva
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    console.log('🚀 Enviando formulario...');
    setSending(true);
    setSentOk(null);

    try {
      const res = await fetch('/lex/booking/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        console.log('✅ Envío correcto');
        setSentOk(true);
        setSending(false);

        // Limpia los campos pero mantiene la sesión
        setForm({
          birth_date: '',
          birth_place: '',
          birth_time: '',
          time_exact: false,
          expectations: '',
          knows_astrology: '',
          life_point: '',
          creativity: '',
          session_title: form.session_title,
        });
      } else {
        console.error('❌ Error HTTP:', res.status);
        setSentOk(false);
        setSending(false);
      }
    } catch (error) {
      console.error('❌ Error en fetch:', error);
      setSentOk(false);
      setSending(false);
    }
  };


{/* ---------- COMPONENTE REVIEWCARD ---------- */}
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_HEIGHT = 180;

  return (
    <div
      style={{
        flex: '0 0 auto',
        width: 320,
        minHeight: 300,
        background: '#fff',
        color: '#000',
        borderRadius: 12,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
        scrollSnapAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ maxHeight: expanded ? 'none' : MAX_HEIGHT, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p style={{ fontStyle: 'italic', fontSize: 18, lineHeight: 1.6 }}>
          “{review.text}”
        </p>
      </div>

      {review.text.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 12,
            background: 'none',
            border: 'none',
            color: '#000',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'right',
          }}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}

      <footer style={{ fontWeight: 700, color: '#333', fontSize: 16, textAlign: 'right', marginTop: 16 }}>
        — {review.name}
      </footer>
    </div>
  );
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
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

  return (
    <div style={{ overflow: 'hidden', width: '100%', minHeight: '100vh' }}>
      
{/* ---------- header---------- */}
<Header />

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
                    ¿Qué es Lex Corazon?
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
                      'Lex Corazon es un viaje creativo en seis etapas que atraviesa las tripas, el imaginario y la carne de un proyecto. Es un mapa para quienes sienten que lo que tienen dentro necesita una forma, una voz y una estética que les haga justicia.',
                      'Nació de una urgencia: dejar atrás fórmulas prefabricadas y maneras huecas de “hacer marca”. Aquí la creatividad no se entiende como adorno ni estrategia fría, sino como una pulsión vital: un acto de honestidad radical y de belleza subversiva.',
                      'El recorrido va de dentro hacia afuera. Primero se mira lo oculto, lo que incomoda, lo que bloquea. Después llega la rebelión: un motín contra lo que limita, un grito que abre paso a los talentos dormidos.',
                      'De ahí se enciende la chispa: la cerilla que prende la esencia creativa y la convierte en materia prima. En etapas posteriores esa materia se moldea en identidad, se desborda en estética, hasta llegar finalmente a lo tangible: un proyecto real, coherente y encarnado.',
                      'Lex Corazon es un cruce entre introspección, arte y estrategia. Un espacio donde conviven símbolos, narrativas, moda, filosofía y juego. Un laboratorio en el que las ideas no se quedan en la mente: se transforman en imágenes, palabras y estructuras capaces de sostenerse en el mundo.',
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
                    Lex Corazon — desde donde acompaño
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
                      'Esa experiencia me enseñó algo esencial: una idea no se materializa solo con técnica, sino con verdad. Por eso en Lex Corazon no solo miro lo interno, sino cómo eso puede expresarse afuera: una voz, un proyecto, una estética, una manera de habitar el mundo.',
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
              {activeText === 0 ? '¿Cómo te acompaño?' : '¿Qué es Lex Corazon?'}
            </button>
          </motion.div>
        </motion.section>



{/* ---------- SESIONES ---------- */}
<motion.section
  {...fadeUp}
  id="sessions"
  style={{
    width: '100%',
    background: '#000',
    padding: '0 16px 80px 16px',
    margin: 0,
    position: 'relative',
  }}
>
  <style>
    {`
      .grid-responsive {
        display: grid;
        gap: 8px;
        border-top: 1px solid #111;
        border-left: 1px solid #111;
      }
      @media (min-width: 769px) {
        .grid-responsive.first-row {
          grid-template-columns: repeat(2, 1fr);
          margin-bottom: 8px;
        }
        .grid-responsive.other-rows {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 768px) {
        .grid-responsive {
          grid-template-columns: 1fr !important;
          margin-bottom: 8px;
        }
      }
    `}
  </style>

  {/* Primera fila 50/50 */}
  <div className="grid-responsive first-row">
    {[
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
    ].map((c, i) => {
      const isCartaNatal = c.title === 'Carta Natal';
      const isPack = c.title === 'Pack de sesiones';
      const isEtapa = false;

      return (
        <motion.article
          key={i}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={i}
          style={{
            borderRight: '1px solid #111',
            borderBottom: '1px solid #111',
            background: isCartaNatal ? '#77cee4ff' : '#FFD500',
            color: isCartaNatal ? '#fff' : '#000000ff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 460,
            padding: 32,
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            cursor: 'pointer',
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
            <div
              style={{
                color: isCartaNatal ? '#9ca3af' : '#6b7280',
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
                color: isCartaNatal ? '#0a0a0aff' : '#000',
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
                color: isCartaNatal ? '#080808ff' : '#222',
              }}
            >
              {c.desc}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: 'auto',
            }}
          >
            <button
              onClick={() => openBookingFor(c.title)}
              style={{
                background: isCartaNatal ? '#fff' : '#000',
                color: isCartaNatal ? '#000' : '#fff',
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
                if (isCartaNatal) {
                  e.currentTarget.style.background = '#FFD500';
                  e.currentTarget.style.color = '#fff';
                } else if (isPack) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                }
              }}
              onMouseLeave={(e) => {
                if (isCartaNatal) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                } else if (isPack) {
                  e.currentTarget.style.background = '#000';
                  e.currentTarget.style.color = '#fff';
                }
              }}
            >
              AGENDAR +INFO
            </button>
          </div>
        </motion.article>
      );
    })}
  </div>

  {/* Filas 2 y 3 */}
  <div className="grid-responsive other-rows">
    {[
      { title: 'Viaje a las tripas - Introspección', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Explora emociones, bloqueos y apegos para reconectar con tu yo más genuino.' },
      { title: 'Motín existencial - Talentos y propósito', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Descubre talentos dormidos y propósito vital con astrología psicológica.' },
      { title: 'Caja de cerillas - Desbloqueo creativo', category: 'SESIONES INTROSPECTIVAS/ VIAJE LEX CORAZON', desc: 'Libera tu creatividad y conecta con la chispa que transforma ideas en acción.' },
      { title: 'Lex ID - Adn de marca', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Define la base de tu proyecto o marca: quién eres, qué representas y qué valores te guían.' },
      { title: 'Aesthetic Overdose - Estética y concepto', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Construye tu universo visual y conceptual con estilo propio: tono, narrativa y estética.' },
      { title: 'Carne y hueso - Creación de producto', category: 'SESIONES DE CONSTRUCCIÓN/ VIAJE LEX CORAZON', desc: 'Convierte ideas en productos tangibles con coherencia y profundidad.' },
    ].map((c, i) => {
      const isEtapa = true;

      return (
        <motion.article
          key={i}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={i}
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
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            cursor: 'pointer',
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
            <div style={{ color: '#6b7280', fontSize: 14, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500, letterSpacing: 0.5 }}>
              {c.category}
            </div>
            <h3 style={{ margin: '0 0 12px', fontSize: 38, fontWeight: 700, color: '#000', lineHeight: 1.2, minHeight: 80 }}>
              {c.title}
            </h3>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: '#222' }}>
              {c.desc}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
            <button
              onClick={() => openBookingFor(c.title)}
              style={{ background: '#000', color: '#fff', border: '1px solid #000', padding: '10px 18px', borderRadius: 26, fontSize: 20, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: 0.5 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}
            >
              AGENDAR +INFO
            </button>

            <span style={{ fontWeight: 700, fontSize: 18, color: '#000' }}>
              ETAPA{i + 1}
            </span>
          </div>
        </motion.article>
      );
    })}
  </div>
</motion.section>

{/* ---------- MODAL DE RESERVA ---------- */}
<AnimatePresence>
  {bookingOpen && (
    <motion.div
      className="booking-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        backdropFilter: 'blur(10px)',
        padding: '40px 0',
      }}
    >
      <motion.div
        className="booking-modal"
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.96 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          width: '96vw',
          height: '92vh',
          maxWidth: 'none',
          background: 'linear-gradient(120deg, #0b0b0b 0%, #151515 100%)',
          color: '#fff',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(255,255,255,0.1)',
          position: 'relative',
        }}
      >
        {/* ❌ Botón cerrar */}
        <button
          onClick={() => {
            setBookingOpen(false);
            setSentOk(null);
            setSending(false);
          }}
          style={{
            position: 'absolute',
            right: 30,
            top: 20,
            background: 'transparent',
            color: '#aaa',
            border: 'none',
            fontSize: 40,
            cursor: 'pointer',
            zIndex: 10,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
        >
          ×
        </button>

        {/* 💫 Panel izquierdo */}
        <motion.div
          className="booking-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            padding: '100px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid #222',
            background:
              'radial-gradient(circle at top left, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 900,
              marginBottom: 28,
              textTransform: 'uppercase',
              letterSpacing: 1,
              lineHeight: 1.1,
            }}
          >
            {form.session_title || 'Sesión Creativa Lex Corazon'}
          </h2>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.9,
              color: '#ddd',
              maxWidth: 640,
              textAlign: 'justify',
              marginBottom: 24,
            }}
          >
            Esta sesión abre un espacio simbólico y creativo donde la astrología,
            la introspección y el arte se entrelazan para dar forma a lo invisible.
            <br /><br />
            Te acompañaré a mirar con profundidad, a ordenar lo caótico y a
            traducir lo interno en algo tangible: tu propio lenguaje creativo.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: 16,
              color: '#999',
              fontStyle: 'italic',
            }}
          >
            “Lo simbólico se convierte en materia,
            y la emoción se vuelve estructura.”
          </motion.div>
        </motion.div>

        {/* 🤍 Panel derecho */}
        <motion.div
          className="booking-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            padding: '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>
            Completa tus datos
          </h3>

          <form
            onSubmit={handleSubmitBooking}
            style={{
              display: 'grid',
              gap: 18,
              width: '100%',
            }}
          >
            {/* Fecha nacimiento */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>Fecha de nacimiento*</label>
              <input
                name="birth_date"
                placeholder="DD/MM/AAAA"
                value={form.birth_date}
                onChange={handleChange}
                required
                style={{
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 16,
                }}
              />
            </div>

            {/* Lugar nacimiento */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>Lugar de nacimiento (Ciudad, País)*</label>
              <input
                name="birth_place"
                placeholder="Ciudad, País"
                value={form.birth_place}
                onChange={handleChange}
                required
                style={{
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 16,
                }}
              />
            </div>

            {/* Hora nacimiento */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ color: '#ccc', fontSize: 16 }}>Hora de nacimiento*</label>
                <input
                  name="birth_time"
                  placeholder="14:30"
                  value={form.birth_time}
                  onChange={handleChange}
                  required
                  style={{
                    background: '#000',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: 10,
                    padding: '14px 16px',
                    fontSize: 16,
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
                  fontSize: 15,
                }}
              >
                <input
                  type="checkbox"
                  name="time_exact"
                  checked={form.time_exact}
                  onChange={handleChange}
                />
                Hora exacta
              </label>
            </div>

            {/* Expectativas */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>¿Qué esperas de la sesión?</label>
              <input
                name="expectations"
                value={form.expectations}
                onChange={handleChange}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 16,
                }}
              />
            </div>

            {/* Conocimientos astrología */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>¿Tienes conocimientos de astrología?</label>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Sí', 'No'].map((option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      fontSize: 15,
                    }}
                  >
                    <input
                      type="radio"
                      name="knows_astrology"
                      value={option}
                      checked={form.knows_astrology === option}
                      onChange={handleChange}
                      style={{ accentColor: '#fff', transform: 'scale(1.2)' }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Punto vital */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>¿En qué punto vital te encuentras?</label>
              <textarea
                name="life_point"
                rows={3}
                value={form.life_point}
                onChange={handleChange}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 16,
                }}
              />
            </div>

            {/* Relación creatividad */}
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ color: '#ccc', fontSize: 16 }}>¿Qué relación tienes con la creatividad?</label>
              <textarea
                name="creativity"
                rows={3}
                value={form.creativity}
                onChange={handleChange}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 16,
                }}
              />
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 20 }}>
              <a
                href="https://wa.me/34678776392"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#000',
                  borderRadius: 10,
                  padding: '12px 18px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: 17,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                💬 AGENDAR
              </a>

              <a
                href="/stripe/checkout"
                style={{
                  background: '#fff',
                  color: '#000',
                  borderRadius: 10,
                  padding: '12px 18px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: 17,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                💳 Pagar con Stripe
              </a>

              <button
                type="submit"
                disabled={sending || sentOk === true}
                style={{
                  background: sentOk
                    ? '#7CFFB2'
                    : sending
                      ? '#ccc'
                      : '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 10,
                  padding: '12px 18px',
                  fontWeight: 700,
                  cursor: sentOk ? 'not-allowed' : 'pointer',
                  fontSize: 17,
                  transition: 'all 0.3s ease',
                }}
              >
                {sentOk
                  ? '✅ Enviado'
                  : sending
                    ? 'Enviando…'
                    : 'Enviar formulario'}
              </button>
            </div>

            {/* ✅ Mensajes de estado */}
            <AnimatePresence mode="wait">
              {sentOk !== null && !sending && (
                <motion.div
                  key={sentOk ? 'success' : 'error'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    color: sentOk ? '#7CFFB2' : '#FF8A8A',
                    fontSize: 15,
                    marginTop: 12,
                    background: sentOk
                      ? 'rgba(124,255,178,0.08)'
                      : 'rgba(255,138,138,0.08)',
                    padding: '8px 12px',
                    borderRadius: 6,
                    textAlign: 'center',
                  }}
                >
                  {sentOk ? (
                    <>
                      ✅ ¡Listo! Tus datos se han enviado correctamente a{' '}
                      <strong>lexcorazon@gmail.com</strong>.
                    </>
                  ) : (
                    <>❌ Hubo un problema al enviar. Revisa los campos o inténtalo de nuevo.</>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>

      {/* 💎 Estilos responsive */}
      <style>{`
  /* ----- Ajuste de la X para que no se superponga en móvil ----- */
  @media (max-width: 1024px) {
    .booking-modal button[style*="font-size: 40px"] {
      top: 12px !important;
      right: 16px !important;
      font-size: 36px !important;
      background: rgba(0, 0, 0, 0.4) !important;
      border-radius: 50% !important;
      width: 46px !important;
      height: 46px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #fff !important;
    }

    .booking-modal button[style*="font-size: 40px"]:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }

  @media (max-width: 600px) {
    .booking-modal button[style*="font-size: 40px"] {
      top: 10px !important;
      right: 10px !important;
      width: 42px !important;
      height: 42px !important;
      font-size: 32px !important;
    }
  }
`}</style>
      <style>{`
        @media (max-width: 1024px) {
          .booking-modal {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            height: auto !important;
            width: 95vw !important;
            max-height: none !important;
            overflow: visible !important;
          }

          .booking-left {
            order: 1;
            padding: 60px 40px !important;
            border-right: none !important;
            border-bottom: 1px solid #222 !important;
            text-align: center !important;
          }

          .booking-right {
            order: 2;
            padding: 40px 32px !important;
            background: none !important;
            overflow-y: visible !important;
          }

          .booking-left h2 {
            font-size: clamp(2rem, 6vw, 2.8rem) !important;
          }

          .booking-left p {
            font-size: 17px !important;
            line-height: 1.7 !important;
          }

          .booking-right h3 {
            font-size: 22px !important;
            text-align: center;
            margin-bottom: 18px;
          }

          .booking-right input,
          .booking-right textarea {
            font-size: 15px !important;
            padding: 12px 14px !important;
          }

          .booking-right button,
          .booking-right a {
            font-size: 15px !important;
            padding: 10px 16px !important;
          }
        }

        @media (max-width: 600px) {
          .booking-left {
            padding: 40px 22px !important;
          }

          .booking-left h2 {
            font-size: 1.8rem !important;
          }

          .booking-right {
            padding: 32px 20px !important;
          }

          .booking-right input,
          .booking-right textarea {
            font-size: 14px !important;
            padding: 10px 12px !important;
          }

          .booking-right button,
          .booking-right a {
            font-size: 14px !important;
            padding: 10px 14px !important;
          }
        }

        @media (min-width: 1200px) {
          .booking-modal {
            width: 96vw !important;
            height: 92vh !important;
            max-width: none !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
      <style>{`
  /* --- Fix para que el panel izquierdo sea totalmente visible en móvil --- */
  @media (max-width: 1024px) {
    .booking-overlay {
      align-items: flex-start !important;
      justify-content: center !important;
      overflow-y: auto !important;
      padding: 20px 0 60px 0 !important;
    }

    .booking-modal {
      margin-top: 60px !important;
      margin-bottom: 60px !important;
      height: auto !important;
      max-height: none !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .booking-left, .booking-right {
      width: 100% !important;
      border: none !important;
    }
  }

  @media (max-width: 600px) {
    .booking-overlay {
      padding: 10px 0 40px 0 !important;
    }

    .booking-left {
      padding: 36px 20px !important;
    }

    .booking-right {
      padding: 28px 18px !important;
    }
  }
`}</style>

    </motion.div>
  )}
</AnimatePresence>


        

{/* ---------- RESEÑAS ---------- */}
<section
  id="reviews"
  style={{
    width: '100%',
    background: '#000',
    color: '#fff',
    padding: '120px 0',
    overflow: 'hidden',
    position: 'relative',
  }}
>

<div
  className="reviews-container no-scrollbar"
  style={{
    display: 'flex',
    alignItems: 'flex-start',
    overflowX: 'auto',
    gap: 24,
    padding: '0 16px 40px 16px',
  }}
>
  {reviewsData.map((r, i) => (
    <ReviewCard key={i} review={r} />
  ))}
</div>

<style>{`
  @media (max-width: 768px) {
    .reviews-container {
      justify-content: flex-start;
    }
  }
  @media (min-width: 769px) {
    .reviews-container {
      justify-content: center;
    }
  }
`}</style>


  <style>{`
    /* ⚡ Responsive */
    @media (max-width: 768px) {
      .reviews-container {
        justify-content: flex-start; /* pega a la izquierda en móvil */
      }
    }
    @media (min-width: 769px) {
      .reviews-container {
        justify-content: center; /* centrado en escritorio */
      }
    }
  `}</style>


</section>

{/* ---------- FOOTER ---------- */}
<footer
  style={{
    width: '100vw',
    background: '#000',
    color: '#fff',
    padding: '40px 16px',
    textAlign: 'center',
    borderTop: '1px solid #111',
  }}
>
  <p>© {new Date().getFullYear()} Lex Corazon — Todos los derechos reservados</p>
</footer>

</main>
</div>

  )
}
