import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SiteLayout from '@/Layouts/SiteLayout'
import { aj } from '@/data/aj'
import Lenis from '@studio-freight/lenis'

/* ---------- Lenis scroll suave ---------- */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}

const slug = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/* ---------- Clipping de prensa ---------- */
function Clipping({ items }) {
  return (
    <div className="w-full">
      <motion.div
        className="flex gap-4 px-4 md:px-8 flex-wrap w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="flex-1 min-w-[250px] relative"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-40 overflow-hidden shadow-md cursor-pointer relative"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.medio}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-2 left-2 px-4 py-1 bg-black rounded-md text-white text-2xl font-extrabold shadow-lg">
                {item.medio}
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ---------- AutoAspectTile ---------- */
function AutoAspectTile({ title, media = [], images = [], onOpen, description }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const [direction, setDirection] = useState(1)

  // Detectar si es vídeo
  const isVideo =
    sources.length > 0 &&
    (/\.(mp4|webm)$/i.test(sources[0]) || /vimeo\.com/i.test(sources[0]))

  const nextImage = () => {
    setDirection(1)
    setCurIdx((prev) => (prev + 1) % sources.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurIdx((prev) => (prev - 1 + sources.length) % sources.length)
  }

  const renderMedia = (src) => {
    if (!src) return null
    const scaleAnim = [1, 1.01, 1]
    const translateAnim = [direction * 10, 0, 0]
    const commonProps = {
      className: 'absolute inset-0 w-full h-full object-cover',
      initial: { opacity: 0, x: translateAnim[0], scale: scaleAnim[0] },
      animate: { opacity: 1, x: translateAnim[1], scale: scaleAnim[1] },
      exit: { opacity: 0, x: translateAnim[2], scale: scaleAnim[2] },
      transition: { duration: 0.6, ease: 'easeInOut' },
    }

    if (/\.(mp4|webm)$/i.test(src)) {
      return (
        <motion.video
          key={src}
          {...commonProps}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )
    }
    if (/vimeo\.com/i.test(src)) {
      const id = src.match(/vimeo\.com\/(\d+)/)?.[1] || src
      return (
        <motion.iframe
          key={src}
          {...commonProps}
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1`}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      )
    }
    return <motion.img key={src} {...commonProps} src={src} alt={title} />
  }

  return (
    <motion.article
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        zIndex: 50,
      }}
      className="relative w-full h-full overflow-visible"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderMedia(sources[curIdx])}

      {/* 🔹 Overlay */}
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${
            isVideo ? "relative" : "absolute inset-0"
          } bg-black/80 flex flex-col justify-center items-center text-white text-center p-6 z-50 ${
            onOpen && !isVideo ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() =>
            onOpen && !isVideo && onOpen({ title, description, media: sources })
          }
        >
          {/* Título */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl font-bold mb-4"
          >
            {title}
          </motion.span>

          {/* SOLO en vídeos mostramos la descripción */}
          {isVideo && description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="overflow-hidden text-sm md:text-base opacity-90 leading-relaxed space-y-3 max-w-[90%] text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* SOLO en normales el CTA "Ver proyecto" */}
          {!isVideo && onOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg underline mt-4"
            >
              Ver proyecto
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Botones navegación */}
      {hover && sources.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-50"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-50"
          >
            ›
          </button>
        </>
      )}
    </motion.article>
  )
}



/* ---------- VideoCarousel3D ---------- */
function VideoCarousel3D({ videos = [] }) {
  const [curIdx, setCurIdx] = useState(0)
  const prev = () => setCurIdx((curIdx - 1 + videos.length) % videos.length)
  const next = () => setCurIdx((curIdx + 1) % videos.length)
  const getStyle = (index) => {
    const diff = (index - curIdx + videos.length) % videos.length
    if (diff === 0) return { scale: 1, opacity: 1, zIndex: 30, x: 0 }
    if (diff === 1) return { scale: 0.8, opacity: 0.6, zIndex: 20, x: '60%' }
    if (diff === videos.length - 1) return { scale: 0.8, opacity: 0.6, zIndex: 20, x: '-60%' }
    return { scale: 0.5, opacity: 0, zIndex: 10 }
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center h-[380px] sm:h-[460px] md:h-[540px]">
      <div className="relative w-full flex justify-center items-center h-full overflow-hidden">
        {videos.map((video, idx) => (
          <motion.a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute flex flex-col items-center cursor-pointer group"
            initial={false}
            animate={getStyle(idx)}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <img src={video.thumbnail} alt={video.title} className="w-full sm:max-w-[450px] md:max-w-[600px] h-64 sm:h-72 md:h-80 object-cover shadow-lg hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-center px-2">{video.title}</span>
            </div>
          </motion.a>
        ))}
        {videos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-1 top-1/2 -translate-y-1/2 text-black text-3xl z-40 hover:scale-125 transition-transform">‹</button>
            <button onClick={next} className="absolute right-1 top-1/2 -translate-y-1/2 text-black text-3xl z-40 hover:scale-125 transition-transform">›</button>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- DressedByMMCarousel ---------- */
function DressedByMMCarousel({ media = [] }) {
  const [curIdx, setCurIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const titles = media.map((path) =>
    path.split("/").pop().replace(/\.[^/.]+$/, "")
  )

  const getPosition = (index) => {
    const diff = (index - curIdx + media.length) % media.length
    if (diff === 0) return { scale: 1, opacity: 1, zIndex: 30, x: 0 }
    if (diff === 1) return { scale: 0.85, opacity: 0.7, zIndex: 20, x: "50%" }
    if (diff === 2) return { scale: 0.65, opacity: 0.2, zIndex: 10, x: "100%" }
    if (diff === media.length - 1)
      return { scale: 0.85, opacity: 0.7, zIndex: 20, x: "-50%" }
    if (diff === media.length - 2)
      return { scale: 0.65, opacity: 0.2, zIndex: 10, x: "-100%" }
    return { scale: 0.5, opacity: 0, zIndex: 5, x: 0 }
  }

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x > rect.width / 2) setCurIdx((curIdx + 1) % media.length)
    else setCurIdx((curIdx - 1 + media.length) % media.length)
  }

  return (
    <div
      className="relative w-full flex items-center justify-center 
                 h-[500px] sm:h-[600px] md:h-[650px] 
                 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {media.map((src, idx) => (
        <motion.div
          key={idx}
          className="absolute flex items-end justify-center max-w-full"
          initial={false}
          animate={getPosition(idx)}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <img
            src={src}
            alt={titles[idx]}
            className="block w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] 
                       h-[500px] sm:h-[600px] md:h-[650px] object-cover"
          />
          {hoveredIdx === idx && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <span className="text-white text-3xl md:text-4xl font-bold text-center px-4">
                {titles[idx]}
              </span>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Botones navegación */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setCurIdx((curIdx - 1 + media.length) % media.length)
        }}
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 
                   bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded z-40"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setCurIdx((curIdx + 1) % media.length)
        }}
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 
                   bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded z-40"
      >
        ›
      </button>
    </div>
  )
}

/* ---------- ProjectModal ---------- */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      // 🔒 Evita scroll del fondo y cualquier desplazamiento lateral
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [project])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 font-roboto"
      style={{
        padding: '1rem',
        overscrollBehavior: 'contain',
        overflowY: 'auto',
        overflowX: 'hidden', // 🚫 evita scroll horizontal del contenedor
        maxWidth: '100%', // 👈 asegura que nunca se expanda más que la pantalla
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="relative w-full max-w-md md:max-w-lg rounded-xl bg-white text-black p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
        style={{
          overflowX: 'hidden', // ⚡ protege el modal también
          maxWidth: 'calc(100vw - 2rem)',
          boxSizing: 'border-box',
        }}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm hover:bg-black/10"
        >
          ✕
        </button>

        {/* Título */}
        <h3 className="text-xl font-semibold mb-4 text-center">{project.title}</h3>

        {/* Descripción */}
        {project.description && (
          <div
            className="text-sm text-neutral-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        )}

        {/* Media */}
        {project.media && project.media.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.media.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${project.title}-${idx}`}
                className="w-full object-cover rounded"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}



/* ---------- AJHome ---------- */
export default function AJHome() {
  useLenis()
  const [activeProject, setActiveProject] = useState(null)

  const projects = useMemo(() => {
    const byTitle = (t) => aj.proyectos?.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos?.find((p) => re.test(p.titulo))
    return {
      weAreCattleFilm: byTitle('we are cattle — fashion film'),
      weAreCattleVogue: byTitle('we are cattle — vogue'),
      integracionFilm: byTitle('integración — fashion film'),
      integracionVogue: byTitle('integración — vogue'),
      shameOfSpain: like(/the shame of spain/i),
      playForArt: byTitle('Play For Art (Adidas x Juancho Marqués)'),
      drogasMeditacion: byTitle('drogas-meditacion'),
      winterSeries: byTitle('winter-series'),
      vanishment: byTitle("It's All About Vanishment"), 
      dressedByMM: byTitle('Dressed by MM')?.media || [],
    }

  }, [])


  const cell = (project) => {
    if (!project) return null

    const isVideo =
      project.media &&
      project.media.length > 0 &&
      (/\.(mp4|webm)$/i.test(project.media[0]) || /vimeo\.com/i.test(project.media[0]))

    return (
      <AutoAspectTile
        title={project.titulo}
        media={project.media}
        images={project.images}
        description={project.descripcion}
        onOpen={isVideo ? null : setActiveProject}
      />
    )
  }

  const colaboracionesVideos = [
    { id: 1, url: 'kqPHo2q-6nw', title: 'Control (Recycled J y Rels B)', thumbnail: 'https://img.youtube.com/vi/kqPHo2q-6nw/hqdefault.jpg' },
    { id: 2, url: 'P1dI_LAN0fo', title: 'Tu y yo (La Zowi)', thumbnail: 'https://img.youtube.com/vi/P1dI_LAN0fo/hqdefault.jpg' },
    { id: 3, url: 'aWAlCbOGUXA', title: 'A tu lado (Machete)', thumbnail: 'https://img.youtube.com/vi/aWAlCbOGUXA/hqdefault.jpg' },
    { id: 4, url: 'v0JArnT7BMw', title: 'Los ojos del nativo (Juancho Marqués)', thumbnail: 'https://img.youtube.com/vi/v0JArnT7BMw/hqdefault.jpg' },
    { id: 5, url: 'vCHFKYgsz8g', title: 'Nuevo mundo (Juancho Marqués y Fuel Fandango)', thumbnail: 'https://img.youtube.com/vi/vCHFKYgsz8g/hqdefault.jpg' },
    { id: 6, url: 'eNRoiM5NHYQ', title: 'Te acuerdas que (Juancho Marqués y Daniela Garsal)', thumbnail: 'https://img.youtube.com/vi/eNRoiM5NHYQ/hqdefault.jpg' },
    { id: 7, url: 'mPjKPszMImU', title: 'No pero sí (Juancho Marqués y Daniela Garsal)', thumbnail: 'https://img.youtube.com/vi/mPjKPszMImU/hqdefault.jpg' },
    { id: 8, url: 'rTpDXH849hc', title: 'Algo mejor (Juancho Marqués feat Maka)', thumbnail: 'https://img.youtube.com/vi/rTpDXH849hc/hqdefault.jpg' },
    { id: 9, url: 'rBuvvqY4Ibs', title: 'Vuelvo a la nena (Soto Asa)', thumbnail: 'https://img.youtube.com/vi/rBuvvqY4Ibs/hqdefault.jpg' },
  ]

  return (
    <SiteLayout brand="aj" className="font-roboto bg-white text-black">

      {/* Portfolio */}
      <motion.section
        id="portfolio"
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="px-4 md:px-8 py-10 bg-white text-black border-b border-gray-100"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-5 grid-rows-4 gap-1 h-[90vh]"
        >
          <motion.div variants={itemVariants}>
            {cell(projects.weAreCattleFilm)}
          </motion.div>
          <motion.div variants={itemVariants} className="row-span-3 col-start-1 row-start-2">
            {cell(projects.weAreCattleVogue)}
          </motion.div>
          <motion.div variants={itemVariants} className="row-span-4 col-start-2 row-start-1">
            {cell(projects.drogasMeditacion)}
          </motion.div>
          <motion.div variants={itemVariants} className="row-span-3 col-start-3 row-start-1">
            {cell(projects.integracionVogue)}
          </motion.div>
          <motion.div variants={itemVariants} className="col-start-3 row-start-4">
            {cell(projects.integracionFilm)}
          </motion.div>
          <motion.div variants={itemVariants} className="row-span-4 col-start-4 row-start-1">
            {cell(projects.playForArt)}
          </motion.div>
          <motion.div variants={itemVariants} className="col-start-5 row-start-1">
            {cell(projects.vanishment)}
          </motion.div>
          <motion.div variants={itemVariants} className="col-start-5 row-start-2">
            {cell(projects.winterSeries)}
          </motion.div>
          <motion.div variants={itemVariants} className="row-span-2 col-start-5 row-start-3">
            {cell(projects.shameOfSpain)}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Dressed by MM */}
      {projects.dressedByMM.length > 0 && (
        <motion.section
          id="dressed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 border-b border-gray-100 bg-white"
        >
          <DressedByMMCarousel media={projects.dressedByMM} />
        </motion.section>
      )}

      {/* Colaboraciones Destacadas */}
      <motion.section
        id="colaboraciones"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-6 md:px-16 py-28 bg-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 w-full">
            <h3 className="text-xl font-semibold text-black mb-4 text-center">
              Colaboraciones de MM en videoclips
            </h3>
            <VideoCarousel3D videos={colaboracionesVideos.slice(0, 3)} />
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-xl font-semibold text-black mb-4 text-center">
              Dirección artística
            </h3>
            <VideoCarousel3D videos={colaboracionesVideos.slice(8, 9)} />
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-xl font-semibold text-black mb-4 text-center">
              Estilismo y coordinación de vestuario
            </h3>
            <VideoCarousel3D videos={colaboracionesVideos.slice(3, 8)} />
          </div>
        </div>
      </motion.section>

      {/* Trayectoria Profesional */}
      <motion.section
        id="trayectoria"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-4 md:px-8 py-24 bg-white text-black border-b border-gray-100 overflow-visible flex flex-col items-center"
      >

        {/* Contenedor de tarjetas */}
        <div className="relative z-10 max-w-4xl w-full flex flex-col gap-16 items-center">
          {/* Barra central negra */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 md:w-2 z-0">
            <motion.div
              className="w-full h-full bg-black"
              animate={{ backgroundPosition: ["0 0", "0 100%", "0 0"] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{ backgroundSize: "100% 200%" }}
            />
          </div>

          {/* Bloques de trayectoria */}
          {[
            {
              title: "Lex Corazón – Fundadora y Mentora",
              period: "Feb. 2023 – Actualidad",
              content: [
                <>Creación de un proyecto de <strong>mentoría creativa y coaching astrológico</strong>.</>,
                <>Diseño del recorrido de 6 etapas: <em>Viaje a las tripas, Motín existencial, Caja de cerillas, Lex ID, Aesthetic Overdose, Carne y hueso</em>.</>,
                <>Aplicación de astrología psicológica evolutiva para acompañar procesos de desbloqueo creativo y desarrollo personal.</>,
                <>Desarrollo de metodología propia, acompañamiento individual y programas piloto.</>,
              ],
              achievements:
                "Creación de un enfoque único que combina astrología, creatividad y estrategia; resultados tangibles en clientes en etapas iniciales de su marca o proyecto.",
            },
            {
              title: "Juancho Marqués – Personal Stylist & Creative Consultant",
              period: "Abr. 2021 – Feb. 2023 · En remoto",
              content: [
                "Estilismo en conciertos, eventos y videoclips.",
                "Dirección de vestuario y concepto visual para videoclips.",
                "Investigación de identidad de marca: inspiraciones, recursos visuales y conceptuales.",
                "Diseño y dirección artística de merchandising (incl. colaboración <strong>Adidas x Juancho Marqués</strong>).",
                "Creación del concepto <strong>Play for Art</strong> para la camiseta de fútbol.",
              ],
              achievements:
                "Consolidación de la estética del artista; desarrollo de recursos visuales y merch innovador; colaboración internacional con Adidas.",
            },
            {
              title: "María Magdalena Studio – Fundadora y Diseñadora",
              period: "Jun. 2014 – Feb. 2019 · Sevilla",
              content: [
                "Diseño, patronaje y producción de colecciones.",
                "Dirección creativa de fashion films, campañas y lookbooks.",
                "Gestión de e-commerce y estrategia digital.",
                "Coordinación de <strong>desfiles en Madrid Fashion Week</strong> y otros eventos.",
                "Comunicación, redes y colaboraciones con artistas.",
              ],
              achievements:
                "Presencia en eventos nacionales; premios en festivales de fashion film en Madrid y México; consolidación de identidad conceptual y filosófica de marca.",
            },
            {
              title: "Roberto Diz Atelier – Prácticas en Diseño",
              period: "Sept. 2014 – Dic. 2014 · Sevilla",
              content: [
                <>Apoyo en el diseño de la colección <strong>1492</strong>, presentada en Pasarela del Sur (Antiquarium, Sevilla).</>,
                "Colaboración en bocetos, selección de tejidos y confección.",
                "Atención al cliente en tienda.",
              ],
              achievements:
                "Participación directa en el proceso creativo de una colección de alta costura y experiencia en desfile profesional.",
            },
            {
              title: "Formación",
              period: "",
              content: [
                "**Astrología Psicológica Evolutiva** – Astroterapéutica (*Abr. 2022 – Jun. 2024*)",
                "**Diseño y Gestión de la Moda** – Centro Universitario San Isidoro (*Sept. 2011 – Jun. 2014*)",
              ].map((line, i) => <span key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />),
            },
            {
              title: "Reconocimientos y Premios",
              period: "",
              content: [
                "*Best Fashion Film by New Talent* – Madrid Fashion Film Festival (2018)",
                "*Best Fashion Film by New Talent* – Mexico Fashion Film Festival (2018)",
                "*New Designers Awards Neo2 by Sancal – Categoría Moda* (2018)",
                "*Primer Premio del Certamen de Diseñadores Noveles* – Instituto Andaluz de la Juventud, Andalucía de Moda (2014)",
              ].map((line, i) => <span key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />),
            },
            {
              title: "Selecciones y nominaciones internacionales",
              period: "",
              content: [
                "BAFTA Aesthetica Film Festival – Official Selection",
                "ShowStudio Awards – Official Selection",
                "Copenhagen Fashion Film – Best New Talent Nominee",
                "Fashion Film Festival Milano – Official Selection",
                "La Jolla Fashion Film Festival – Best Director Nominee",
                "Mercedes-Benz Bokeh South Africa FFF – Official Selection",
                "Canadian International Fashion Film Festival – Official Selection",
                "Cinemoi Fashion Film Festival – Best Director Nominee",
                "Aurora Film Fest – Official Selection",
                "FKM Festival de Cine Fantástico – Official Selection",
                "Fantarifa International Film & TV Festival – Official Selection",
              ],
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`relative w-full md:w-2/3 px-5 py-6 rounded-lg shadow-sm bg-white hover:-translate-y-1 hover:shadow-lg z-10 ${i % 2 === 0 ? "ml-auto text-right" : "mr-auto text-left"}`}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-1">{item.title}</h3>
              {item.period && <p className="text-sm text-gray-500 italic mb-2">{item.period}</p>}
              <ul className="space-y-1 list-disc list-inside text-sm text-gray-700 mb-2">
                {item.content.map((line, j) => (
                  <li key={j}>
                    {typeof line === "string" ? (
                      <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ) : (
                      line
                    )}
                  </li>
                ))}
              </ul>
              {item.achievements && <p className="text-sm font-semibold mt-2">{item.achievements}</p>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Sobre mí */}
      <motion.section
        id="sobre-mi"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative px-6 md:px-16 py-28 bg-white text-black border-b border-gray-100 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto flex relative">
          <motion.div
            className="absolute left-0 top-0 w-1 md:w-2 bg-black rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
          <div className="ml-6 md:ml-12 space-y-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                color: ["#000000", "#000000", "#000000"],
                textShadow: [
                  "0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px rgba(0,0,0,0)",
                  "0px 0px 0px rgba(0,0,0,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Sobre mí
            </motion.h2>
            {[
              "Mi principal trabajo, inamovible e irremplazable, me acompaña desde siempre: observar lo que me atraviesa y traducirlo en palabras, formas, conceptos y símbolos. Me interesa dar cuerpo a lo no dicho, lo tabú, lo excepcional, lo doloroso y lo verdaderamente bello.",
              "Entre dos polos se mueven mis intereses: lo sutil y lo superficial. En ese vaivén voy descifrando, maravillándome y creando.",
              "A lo largo de los años he explorado distintos lenguajes para expandir esa mirada. La escritura ha sido siempre mi vehículo de cabecera, un preámbulo inevitable antes de transformarlo en imágenes, conceptos o proyectos. Desde ahí he tejido recorridos en la moda y el estilismo, en la dirección artística de proyectos y en la mentoría con artistas. Más recientemente he incorporado la astrología como herramienta simbólica que amplía mi manera de acompañar procesos creativos y vitales.",
              "Todo en mí nace de una necesidad inevitable de comunicar y expresar, de sacar hacia afuera lo que no puede quedarse quieto. El arte, en cualquiera de sus formas, ha sido siempre la vía para hacerlo: escribir, vestir, imaginar, interpretar símbolos. No lo concibo como adorno, sino como un lenguaje esencial para habitar el mundo y compartirlo con otros.",
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.3 }}
                className="text-lg leading-relaxed text-black"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Clipping */}
      <motion.section
        id="clipping"
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="pt-10 pb-10 bg-white border-b border-gray-100"
      >
        <Clipping items={aj.prensa || []} />
      </motion.section>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </SiteLayout>
  )
}
