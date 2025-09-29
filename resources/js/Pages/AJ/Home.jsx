import React, { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import SiteLayout from '@/Layouts/SiteLayout'
import { aj } from '@/data/aj'

const slug = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function isImg(s) { return typeof s === 'string' && /\.(png|jpe?g|webp|gif|avif)$/i.test(s) }
function isVid(s) { return typeof s === 'string' && /\.(mp4|webm)$/i.test(s) }
function isVimeoUrl(s) { return typeof s === 'string' && /vimeo\.com\/(\d+)/i.test(s) }
function vimeoIdFrom(s) { return (s.match(/vimeo\.com\/(\d+)/i) || [])[1] }

/* ---------- AutoCarousel ---------- */
function AutoCarousel({ items, height = 64, speed = 3 }) {
  const scrollerRef = useRef(null)
  const contentRef = useRef(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const el = scrollerRef.current
    const track = contentRef.current
    if (!el || !track) return
    el.scrollLeft = 0
    let raf
    const tick = () => {
      const third = track.scrollWidth / 3
      if (el.scrollLeft >= third) el.scrollLeft -= third
      if (el.scrollLeft < 0) el.scrollLeft += third
      if (!hover) el.scrollLeft += speed
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, hover])

  const loop = useMemo(() => [...items, ...items, ...items], [items])

  return (
    <div
      ref={scrollerRef}
      className="relative w-full overflow-hidden bg-black font-roboto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
      style={{ height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div ref={contentRef} className="flex items-center gap-5 px-0 select-none min-w-[200%]">
        {loop.map((it, i) => (
          <a
            key={`${it.medio}-${i}`}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 md:px-8 py-1.5 md:py-2 bg-transparent text-white font-roboto uppercase text-2xl md:text-4xl tracking-tight hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto select-none"
            title={it.medio}
          >
            {it.medio}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------- AutoAspectTile carrusel horizontal ---------- */
function AutoAspectTile({ title, href, media = [], images = [], onOpen }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [direction, setDirection] = useState(0) // -1 = prev, 1 = next

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const prevImage = () => {
    setDirection(-1)
    setCurIdx((prev) => (prev - 1 + sources.length) % sources.length)
  }
  const nextImage = () => {
    setDirection(1)
    setCurIdx((prev) => (prev + 1) % sources.length)
  }

  const renderMedia = (src, key) => {
    if (!src) return null
    const scaleAnim = { scale: [1, 1.005, 1] }
    const transitionAnim = { type: 'spring', stiffness: 20, damping: 15 }

    const commonProps = {
      initial: { opacity: 0, x: direction * 100, filter: 'blur(2px)' },
      animate: { opacity: 1, x: 0, filter: 'blur(0px)', scale: scaleAnim.scale[1] },
      exit: { opacity: 0, x: -direction * 100, filter: 'blur(2px)' },
      transition: { ...transitionAnim, opacity: { duration: 0.6, ease: 'easeInOut' }, x: { duration: 0.6 } },
      className: 'absolute inset-0 w-full h-full object-cover transform-gpu bg-transparent',
    }

    if (isVid(src)) return <motion.video key={key} src={src} autoPlay={isVisible} muted loop playsInline preload="auto" {...commonProps} />
    if (isVimeoUrl(src)) {
      const id = vimeoIdFrom(src)
      return <motion.iframe key={key} src={`https://player.vimeo.com/video/${id}?background=1&autoplay=${isVisible ? 1 : 0}&muted=1&loop=1&byline=0&title=0&controls=0`} allow="autoplay; fullscreen; picture-in-picture" frameBorder="0" loading="lazy" {...commonProps} />
    }
    if (isImg(src)) return <motion.img key={key} src={src} alt={title} loading="lazy" {...commonProps} />
    return null
  }

  return (
    <article
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden font-roboto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence custom={direction}>
        {curIdx !== null && renderMedia(sources[curIdx], `cur-${curIdx}`)}
      </AnimatePresence>

      {/* Flechas manuales */}
      {hover && sources.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"
          >
            ›
          </button>
        </>
      )}

      {/* Overlay hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-black/25 text-white p-3 flex flex-col justify-end font-roboto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full">
            <div className="text-[11px] md:text-xs uppercase tracking-wide text-white/80">Colección</div>
            <div className="text-base md:text-lg font-semibold">{title}</div>
            {onOpen ? (
              <button className="mt-2 inline-block border border-white/30 px-3 py-1 text-xs md:text-sm hover:bg-white hover:text-black transition" onClick={onOpen}>
                Ver proyecto
              </button>
            ) : href ? (
              <Link className="mt-2 inline-block border border-white/30 px-3 py-1 text-xs md:text-sm" href={href}>
                Ver proyecto
              </Link>
            ) : null}
          </div>
        </motion.div>
      )}
    </article>
  )
}

/* ---------- ProjectModal ---------- */
function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 font-roboto">
      <div className="relative w-full max-w-lg rounded-xl bg-white text-black p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm hover:bg-black/10" aria-label="Cerrar">✕</button>
        <h3 className="text-xl font-semibold">{project.titulo}</h3>
        {project.descripcion && <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{project.descripcion}</p>}
        <div className="mt-5">
          <Link className="inline-block border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition" href={`/aj/portfolio#${slug(project.titulo)}`}>
            Ir al portfolio completo
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------- AJHome completo ---------- */
export default function AJHome() {
  const [activeProject, setActiveProject] = useState(null)

  const projects = useMemo(() => {
    const byTitle = (t) => aj.proyectos.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos.find((p) => re.test(p.titulo))
    const vanishment = { titulo: "It's All About Vanishment (Teresa Rofer)", media: ['https://vimeo.com/437936022'], descripcion: `It’s All About Vanishment explora la idea de desaparecer...` }
    return {
      weAreCattleFilm: byTitle('we are cattle — fashion film'),
      weAreCattleVogue: byTitle('we are cattle — vogue'),
      integracionFilm: byTitle('integración — fashion film'),
      integracionVogue: byTitle('integración — vogue'),
      shameOfSpain: like(/the shame of spain/i),
      playForArt: byTitle('Play for Art (Adidas x Juancho Marqués)'),
      drogasMeditacion: byTitle('drogas-meditacion'),
      winterSeries: byTitle('winter-series'),
      vanishment
    }
  }, [])

  const cell = (project) =>
    project ? <AutoAspectTile title={project.titulo} href={`/aj/portfolio#${slug(project.titulo)}`} media={project.media} images={project.images} onOpen={() => setActiveProject(project)} /> : null

  return (
    <SiteLayout brand="aj" className="font-roboto">
      <section className="w-full bg-black">
        <AutoCarousel items={aj.prensa} height={64} />
      </section>

      <section className="w-full px-2 md:px-4 py-10 md:py-14">
        <h2 className="px-2 md:px-4 text-xl md:text-2xl text-white font-roboto">Portfolio</h2>

        <div className="relative mt-6 overflow-hidden bg-black p-1 md:p-2">
          <div className="grid grid-cols-5 grid-rows-4 gap-1 h-[90vh]">
            <div className="div1">{cell(projects.weAreCattleFilm)}</div>
            <div className="row-span-3 col-start-1 row-start-2">{cell(projects.weAreCattleVogue)}</div>
            <div className="row-span-4 col-start-2 row-start-1">{cell(projects.drogasMeditacion)}</div>
            <div className="row-span-3 col-start-3 row-start-1">{cell(projects.integracionVogue)}</div>
            <div className="col-start-3 row-start-4">{cell(projects.integracionFilm)}</div>
            <div className="row-span-4 col-start-4 row-start-1">{cell(projects.shameOfSpain)}</div>
            <div className="col-start-5 row-start-1">{cell(projects.vanishment)}</div>
            <div className="col-start-5 row-start-2">{cell(projects.winterSeries)}</div>
            <div className="row-span-2 col-start-5 row-start-3">{cell(projects.playForArt)}</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/aj/portfolio" className="inline-block border border-white/30 px-5 py-2 text-sm text-white">Ver todo el portfolio</Link>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </SiteLayout>
  )
}
