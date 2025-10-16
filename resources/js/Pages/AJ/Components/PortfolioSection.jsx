import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { aj } from '@/data/aj'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/* ---------- AutoAspectTile ---------- */
function AutoAspectTile({ title, media = [], images = [], onOpen, description }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const [direction, setDirection] = useState(1)

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
        <motion.video key={src} {...commonProps} src={src} autoPlay muted loop playsInline preload="auto" />
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
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', zIndex: 50 }}
      className="relative w-full h-full overflow-visible"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderMedia(sources[curIdx])}

      {/* Overlay */}
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`${isVideo ? 'relative' : 'absolute inset-0'} 
                      bg-black/80 flex flex-col justify-center items-center 
                      text-white text-center p-6 z-50 
                      ${onOpen && !isVideo ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() =>
            onOpen && !isVideo && onOpen({ title, description, media: sources })
          }
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl font-bold mb-4"
          >
            {title}
          </motion.span>

          {isVideo && description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="overflow-hidden text-sm md:text-base opacity-90 leading-relaxed space-y-3 max-w-[90%] text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

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

      {/* Botones de navegación */}
      {hover && sources.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 
                       bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-50"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                       bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-50"
          >
            ›
          </button>
        </>
      )}
    </motion.article>
  )
}

/* ---------- ProjectModal ---------- */
function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (project) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 font-roboto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="relative w-full max-w-md md:max-w-lg rounded-xl bg-white text-black p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm hover:bg-black/10"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-center">{project.title}</h3>

        {project.description && (
          <div
            className="text-sm text-neutral-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        )}

        {project.media && project.media.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.media.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${project.title}-${idx}`}
                className="w-full object-cover rounded"
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

/* ---------- PortfolioSection ---------- */
export default function PortfolioSection() {
  const [activeProject, setActiveProject] = useState(null)

  // 🔹 Mapeamos automáticamente los proyectos desde `aj.proyectos`
  const projects = useMemo(() => {
    const byTitle = (t) =>
      aj.proyectos?.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos?.find((p) => re.test(p.titulo))

    const map = {
      weAreCattleFilm: 'we are cattle — fashion film',
      weAreCattleVogue: 'we are cattle — vogue',
      integracionFilm: 'integración — fashion film',
      integracionVogue: 'integración — vogue',
      shameOfSpain: /the shame of spain/i,
      playForArt: 'Play For Art (Adidas x Juancho Marqués)',
      drogasMeditacion: 'drogas-meditacion',
      winterSeries: 'winter-series',
      vanishment: "It's All About Vanishment",
    }

    return Object.fromEntries(
      Object.entries(map).map(([key, value]) => {
        if (value instanceof RegExp) return [key, like(value)]
        return [key, byTitle(value)]
      })
    )
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

  return (
    <>
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
          <motion.div variants={itemVariants}>{cell(projects.weAreCattleFilm)}</motion.div>
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

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
