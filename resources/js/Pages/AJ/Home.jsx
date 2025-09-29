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

    return () => {
      lenis.destroy()
    }
  }, [])
}

/* ---------- Slug helper ---------- */
const slug = (s) =>
  (s || '').toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/* ---------- Framer-motion variants ---------- */
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
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        Clipping de prensa
      </h2>
      <motion.div
        className="flex gap-4 px-4 md:px-8 overflow-x-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="flex-1 min-w-[250px]"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-40 rounded-lg overflow-hidden shadow-md cursor-pointer relative"
            >
              {item.image && (
                <img src={item.image} alt={item.medio} className="w-full h-full object-cover" />
              )}
              <div className="absolute bottom-0 left-0 w-full p-2 bg-black/50 text-white text-xs">
                <span className="font-semibold">{item.medio}</span>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ---------- AutoAspectTile ---------- */
function AutoAspectTile({ title, href, media = [], images = [], onOpen }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const [direction, setDirection] = useState(1)

  const nextImage = () => { setDirection(1); setCurIdx((prev) => (prev + 1) % sources.length) }
  const prevImage = () => { setDirection(-1); setCurIdx((prev) => (prev - 1 + sources.length) % sources.length) }

  const renderMedia = (src) => {
    if (!src) return null
    const scaleAnim = [1, 1.01, 1]
    const translateAnim = [direction * 10, 0, 0]
    const commonProps = {
      className: 'absolute inset-0 w-full h-full object-cover rounded-md',
      initial: { opacity: 0, x: translateAnim[0], scale: scaleAnim[0] },
      animate: { opacity: 1, x: translateAnim[1], scale: scaleAnim[1] },
      exit: { opacity: 0, x: translateAnim[2], scale: scaleAnim[2] },
      transition: { duration: 0.6, ease: 'easeInOut' },
    }

    if (/\.(mp4|webm)$/i.test(src)) {
      return <motion.video key={src} {...commonProps} src={src} autoPlay muted loop playsInline preload="auto" />
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
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
      className="relative w-full h-full bg-gray-50 overflow-hidden font-roboto rounded-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderMedia(sources[curIdx])}
      {hover && sources.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-10">‹</button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full px-2 py-1 z-10">›</button>
        </>
      )}
    </motion.article>
  )
}

/* ---------- DressedByMMCarousel ---------- */
function DressedByMMCarousel({ media = [] }) {
  const [curIdx, setCurIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const next = () => setCurIdx((prev) => (prev + 1) % media.length)
  const prev = () => setCurIdx((prev) => (prev - 1 + media.length) % media.length)

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurIdx((prev) => (prev + 1) % media.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isHovered, media.length])

  const getPosition = (index) => {
    const diff = (index - curIdx + media.length) % media.length
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === media.length - 1) return 'left'
    return 'hidden'
  }

  return (
    <div
      className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-[500px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {media.map((src, idx) => {
        const pos = getPosition(idx)
        let style = {}
        if (pos === 'center') style = { scale: 1, opacity: 1, zIndex: 30, x: 0 }
        else if (pos === 'left') style = { scale: 0.8, opacity: 0.6, zIndex: 20, x: '-60%' }
        else if (pos === 'right') style = { scale: 0.8, opacity: 0.6, zIndex: 20, x: '60%' }
        else style = { scale: 0.5, opacity: 0, zIndex: 10 }
        return (
          <motion.img
            key={idx}
            src={src}
            alt={`Look ${idx + 1}`}
            className="absolute rounded-lg shadow-lg object-contain max-h-[500px]"
            initial={false}
            animate={style}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )
      })}
      <button onClick={prev} className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded z-40">‹</button>
      <button onClick={next} className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded z-40">›</button>
    </div>
  )
}

/* ---------- AccordionItem ---------- */
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-4 border rounded-md bg-black border-white/30 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="font-semibold text-lg flex justify-between items-center">
        {title}
        <span className="ml-2">{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-sm">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- ProjectModal ---------- */
function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 font-roboto">
      <div className="relative w-full max-w-lg rounded-xl bg-white text-black p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm hover:bg-black/10">✕</button>
        <h3 className="text-xl font-semibold">{project.titulo}</h3>
        {project.descripcion && <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{project.descripcion}</p>}
      </div>
    </div>
  )
}

/* ---------- AJHome completo ---------- */
export default function AJHome() {
  useLenis() // scroll suave
  const [activeProject, setActiveProject] = useState(null)

  const projects = useMemo(() => {
    const byTitle = (t) => aj.proyectos?.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos?.find((p) => re.test(p.titulo))
    const vanishment = { titulo: "It's All About Vanishment", media: ['https://vimeo.com/437936022'], descripcion: `It’s All About Vanishment explora la idea de desaparecer...` }
    return {
      weAreCattleFilm: byTitle('we are cattle — fashion film'),
      weAreCattleVogue: byTitle('we are cattle — vogue'),
      integracionFilm: byTitle('integración — fashion film'),
      integracionVogue: byTitle('integración — vogue'),
      shameOfSpain: like(/the shame of spain/i),
      playForArt: byTitle('Play For Art (Adidas x Juancho Marqués)'),
      drogasMeditacion: byTitle('drogas-meditacion'),
      winterSeries: byTitle('winter-series'),
      vanishment,
      dressedByMM: byTitle('Dressed by MM')?.media || [],
    }
  }, [])

  const cell = (project) =>
    project && (
      <AutoAspectTile
        title={project.titulo}
        href={`/aj/portfolio#${slug(project.titulo)}`}
        media={project.media}
        images={project.images}
        onOpen={() => setActiveProject(project)}
      />
    )

  return (
    <SiteLayout brand="aj" className="font-roboto bg-black text-white">

      {/* Clipping */}
      <motion.section id="clipping" initial="hidden" animate="show" variants={containerVariants} className="pt-10 pb-20 bg-black scroll-mt-24 md:scroll-mt-20">
        <Clipping items={aj.prensa || []} />
      </motion.section>

      {/* Portfolio */}
      <motion.section id="portfolio" initial="hidden" animate="show" variants={containerVariants} className="px-4 md:px-8 py-20 bg-black text-white scroll-mt-24 md:scroll-mt-20">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-5 grid-rows-4 gap-1 h-[90vh]">
          <motion.div variants={itemVariants}>{cell(projects.weAreCattleFilm)}</motion.div>
          <motion.div variants={itemVariants} className="row-span-3 col-start-1 row-start-2">{cell(projects.weAreCattleVogue)}</motion.div>
          <motion.div variants={itemVariants} className="row-span-4 col-start-2 row-start-1">{cell(projects.drogasMeditacion)}</motion.div>
          <motion.div variants={itemVariants} className="row-span-3 col-start-3 row-start-1">{cell(projects.integracionVogue)}</motion.div>
          <motion.div variants={itemVariants} className="col-start-3 row-start-4">{cell(projects.integracionFilm)}</motion.div>
          <motion.div variants={itemVariants} className="row-span-4 col-start-4 row-start-1">{cell(projects.shameOfSpain)}</motion.div>
          <motion.div variants={itemVariants} className="col-start-5 row-start-1">{cell(projects.vanishment)}</motion.div>
          <motion.div variants={itemVariants} className="col-start-5 row-start-2">{cell(projects.winterSeries)}</motion.div>
          <motion.div variants={itemVariants} className="row-span-2 col-start-5 row-start-3">{cell(projects.playForArt)}</motion.div>
        </motion.div>
      </motion.section>

      {/* Dressed by MM */}
      {projects.dressedByMM.length > 0 && (
        <motion.section id="dressed" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-20 bg-black scroll-mt-24 md:scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Dressed by MM</h2>
          <DressedByMMCarousel media={projects.dressedByMM} />
        </motion.section>
      )}

      {/* Trayectoria */}
      <motion.section id="trayectoria" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="px-4 md:px-8 py-28 bg-black scroll-mt-24 md:scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Trayectoria</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-start text-white">
          <div className="flex-1">
            <AccordionItem title="Colaboraciones y proyectos">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Juancho Marqués</strong> (2020–23) · Estilismo, diseño e imagen para giras y proyectos visuales.</li>
                <li><strong>Adidas</strong> (2021) · Diseño de producto en colaboración especial.</li>
                <li><strong>María Magdalena</strong> (2015–19) · Fundadora de la marca, colecciones conceptuales y universos visuales.</li>
                <li><strong>Roberto Diz</strong> (2013) · Diseño en prácticas en atelier de alta costura.</li>
              </ul>
            </AccordionItem>
          </div>
          <div className="flex-1">
            <AccordionItem title="Formación">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Astroterapéutica</strong> (2022-2024) · Astrología psicológica y evolutiva.</li>
                <li><strong>Ceade Leonardo</strong> (2011–14) · Grado en Diseño y Gestión de la Moda.</li>
              </ul>
            </AccordionItem>
          </div>
          <div className="flex-1">
            <AccordionItem title="Reconocimientos">
              <ul className="list-disc list-inside space-y-1">
                <li>Primer premio · Desencaja “Jóvenes diseñadores”, Andalucía de Moda.</li>
                <li>Premio New Designers Awards · Neo2 by Sancal.</li>
                <li>Mejor cortometraje internacional · <em>We Are Cattle</em>, México Fashion Film Festival.</li>
                <li>Primer premio Fashion Film “Integración” · Madrid Fashion Film Festival.</li>
              </ul>
            </AccordionItem>
          </div>
          <div className="flex-1">
            <AccordionItem title="Selecciones y nominaciones internacionales">
              <ul className="list-disc list-inside space-y-1">
                <li>BAFTA Aesthetica Film Festival – Official Selection</li>
                <li>ShowStudio Awards – Official Selection</li>
                <li>Copenhagen Fashion Film – Best New Talent Nominee</li>
                <li>Fashion Film Festival Milano – Official Selection</li>
                <li>La Jolla Fashion Film Festival – Best Director Nominee</li>
                <li>Mercedes-Benz Bokeh South Africa FFF – Official Selection</li>
                <li>Canadian International Fashion Film Festival – Official Selection</li>
                <li>Cinemoi Fashion Film Festival – Best Director Nominee</li>
                <li>Aurora Film Fest – Official Selection</li>
                <li>FKM Festival de Cine Fantástico – Official Selection</li>
                <li>Fantarifa International Film & TV Festival – Official Selection</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </motion.section>

      {/* Sobre mí */}
      <motion.section id="sobre-mi" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="px-6 md:px-16 py-28 bg-black scroll-mt-24 md:scroll-mt-20">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-center text-white mb-12 relative inline-block">
          Sobre mí
          <span className="block w-20 h-1 bg-white mx-auto mt-3 rounded"></span>
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="prose prose-invert max-w-5xl mx-auto text-lg leading-relaxed text-white/90 columns-1 md:columns-2 gap-12 space-y-6">
          <p>Mi principal trabajo, inamovible e irremplazable, me acompaña desde siempre: observar lo que me atraviesa y traducirlo en palabras, formas, conceptos y símbolos. Me interesa dar cuerpo a lo no dicho, lo tabú, lo excepcional, lo doloroso y lo verdaderamente bello.</p>
          <p>Entre dos polos se mueven mis intereses: lo sutil y lo superficial. En ese vaivén voy descifrando, maravillándome y creando.</p>
          <p>A lo largo de los años he explorado distintos lenguajes para expandir esa mirada. La escritura ha sido siempre mi vehículo de cabecera, un preámbulo inevitable antes de transformarlo en imágenes, conceptos o proyectos. Desde ahí he tejido recorridos en la moda y el estilismo, en la dirección artística de proyectos y en la mentoría con artistas. Más recientemente he incorporado la astrología como herramienta simbólica que amplía mi manera de acompañar procesos creativos y vitales.</p>
          <p>Todo en mí nace de una necesidad inevitable de comunicar y expresar, de sacar hacia afuera lo que no puede quedarse quieto. El arte, en cualquiera de sus formas, ha sido siempre la vía para hacerlo: escribir, vestir, imaginar, interpretar símbolos. No lo concibo como adorno, sino como un lenguaje esencial para habitar el mundo y compartirlo con otros.</p>
        </motion.div>
        <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="mt-12 text-center italic text-xl text-white/80 max-w-3xl mx-auto border-l-4 border-white/30 pl-6">
          “El arte, en cualquiera de sus formas, ha sido siempre la vía para hacerlo: escribir, vestir, imaginar, interpretar símbolos.”
        </motion.blockquote>
      </motion.section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </SiteLayout>
  )
}
