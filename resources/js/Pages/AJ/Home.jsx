import React, { useState, useMemo } from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import SiteLayout from '@/Layouts/SiteLayout'
import { aj } from '@/data/aj'

const slug = (s) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/* ---------- Clipping de prensa horizontal ---------- */
function Clipping({ items }) {
  return (
    <section className="w-full bg-white py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
        Clipping de prensa
      </h2>
      <div className="flex gap-4 px-4 md:px-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="flex-1 min-w-0" 
          >
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-40 rounded-lg overflow-hidden shadow-md cursor-pointer relative"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.medio}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 w-full p-2 bg-black/40 text-white text-xs">
                <span className="font-semibold">{item.medio}</span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


/* ---------- AutoAspectTile para portfolio ---------- */
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
    <article
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

      {hover && (
        <motion.div className="absolute inset-0 bg-black/25 text-white p-3 flex flex-col justify-end font-roboto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        >
          <div className="w-full">
            <div className="text-[11px] md:text-xs uppercase tracking-wide text-white/80">Colección</div>
            <div className="text-base md:text-lg font-semibold">{title}</div>
            {onOpen ? (
              <button className="mt-2 inline-block border border-white/30 px-3 py-1 text-xs md:text-sm hover:bg-white hover:text-black transition" onClick={onOpen}>Ver proyecto</button>
            ) : href ? (
              <Link className="mt-2 inline-block border border-white/30 px-3 py-1 text-xs md:text-sm" href={href}>Ver proyecto</Link>
            ) : null}
          </div>
        </motion.div>
      )}
    </article>
  )
}

/* ---------- Carrusel Dressed by MM ---------- */
function DressedByMMCarousel({ media = [] }) {
  const [curIdx, setCurIdx] = useState(0)

  const next = () => setCurIdx((prev) => (prev + 1) % media.length)
  const prev = () => setCurIdx((prev) => (prev - 1 + media.length) % media.length)

  return (
    <section className="w-full px-4 md:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Dressed by MM</h2>
      <div className="relative w-full max-w-4xl mx-auto h-[500px]">
        {media[curIdx] && (
          <motion.img
            key={media[curIdx]}
            src={media[curIdx]}
            alt={`Look ${curIdx + 1}`}
            className="w-full h-full object-contain rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          />
        )}
        <button onClick={prev} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white px-3 py-1 rounded">‹</button>
        <button onClick={next} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white px-3 py-1 rounded">›</button>
      </div>
    </section>
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
      playForArt: byTitle('Play for Art (Adidas x Juancho Marqués)'),
      drogasMeditacion: byTitle('drogas-meditacion'),
      winterSeries: byTitle('winter-series'),
      vanishment,
      dressedByMM: byTitle('Dressed by MM')?.media || []
    }
  }, [])

  const cell = (project) => project ? <AutoAspectTile title={project.titulo} href={`/aj/portfolio#${slug(project.titulo)}`} media={project.media} images={project.images} onOpen={() => setActiveProject(project)} /> : null

  return (
     <SiteLayout brand="aj" className="font-roboto bg-black text-white">
      <Clipping items={aj.prensa || []} />

      <section className="w-full px-4 md:px-8 py-10">
        <div className="grid grid-cols-5 grid-rows-4 gap-1 h-[90vh]">
          <div>{cell(projects.weAreCattleFilm)}</div>
          <div className="row-span-3 col-start-1 row-start-2">{cell(projects.weAreCattleVogue)}</div>
          <div className="row-span-4 col-start-2 row-start-1">{cell(projects.drogasMeditacion)}</div>
          <div className="row-span-3 col-start-3 row-start-1">{cell(projects.integracionVogue)}</div>
          <div className="col-start-3 row-start-4">{cell(projects.integracionFilm)}</div>
          <div className="row-span-4 col-start-4 row-start-1">{cell(projects.shameOfSpain)}</div>
          <div className="col-start-5 row-start-1">{cell(projects.vanishment)}</div>
          <div className="col-start-5 row-start-2">{cell(projects.winterSeries)}</div>
          <div className="row-span-2 col-start-5 row-start-3">{cell(projects.playForArt)}</div>
        </div>
      </section>

      {/* Dressed by MM */}
      {projects.dressedByMM.length > 0 && <DressedByMMCarousel media={projects.dressedByMM} />}

      {/* Trayectoria */}
      <section className="w-full px-4 md:px-8 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Trayectoria</h2>
        <div className="space-y-4 text-black">
          <details className="p-4 border rounded-md bg-gray-50 cursor-pointer">
            <summary className="font-semibold text-lg">Colaboraciones y proyectos</summary>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong>Juancho Marqués</strong> (2020–23) · Estilismo, diseño e imagen para giras y proyectos visuales.</li>
              <li><strong>Adidas</strong> (2021) · Diseño de producto en colaboración especial.</li>
              <li><strong>María Magdalena</strong> (2015–19) · Fundadora de la marca, colecciones conceptuales y universos visuales.</li>
              <li><strong>Roberto Diz</strong> (2013) · Diseño en prácticas en atelier de alta costura.</li>
            </ul>
          </details>
          <details className="p-4 border rounded-md bg-gray-50 cursor-pointer">
            <summary className="font-semibold text-lg">Formación</summary>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong>Astroterapéutica</strong> (2022-2024) · Astrología psicológica y evolutiva.</li>
              <li><strong>Ceade Leonardo</strong> (2011–14) · Grado en Diseño y Gestión de la Moda.</li>
            </ul>
          </details>
          <details className="p-4 border rounded-md bg-gray-50 cursor-pointer">
            <summary className="font-semibold text-lg">Reconocimientos</summary>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Primer premio · Desencaja “Jóvenes diseñadores”, Andalucía de Moda.</li>
              <li>Premio New Designers Awards · Neo2 by Sancal.</li>
              <li>Mejor cortometraje internacional · <em>We Are Cattle</em>, México Fashion Film Festival.</li>
              <li>Primer premio Fashion Film “Integración” · Madrid Fashion Film Festival.</li>
            </ul>
          </details>
          <details className="p-4 border rounded-md bg-gray-50 cursor-pointer">
            <summary className="font-semibold text-lg">Selecciones y nominaciones internacionales</summary>
            <ul className="mt-2 list-disc list-inside space-y-1">
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
          </details>
        </div>
      </section>

      {/* Sobre mí */}
      <section className="w-full px-4 md:px-8 py-14 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Sobre mí</h2>
        <p className="text-black mb-4">
          Mi principal trabajo, inamovible e irremplazable, me acompaña desde siempre: observar lo que me atraviesa y traducirlo en palabras, formas, conceptos y símbolos. Me interesa dar cuerpo a lo no dicho, lo tabú, lo excepcional, lo doloroso y lo verdaderamente bello.
        </p>
        <p className="text-black mb-4">
          Entre dos polos se mueven mis intereses: lo sutil y lo superficial. En ese vaivén voy descifrando, maravillándome y creando.
        </p>
        <p className="text-black mb-4">
          A lo largo de los años he explorado distintos lenguajes para expandir esa mirada. La escritura ha sido siempre mi vehículo de cabecera, un preámbulo inevitable antes de transformarlo en imágenes, conceptos o proyectos. Desde ahí he tejido recorridos en la moda y el estilismo, en la dirección artística de proyectos y en la mentoría con artistas. Más recientemente he incorporado la astrología como herramienta simbólica que amplía mi manera de acompañar procesos creativos y vitales.
        </p>
        <p className="text-black">
          Todo en mí nace de una necesidad inevitable de comunicar y expresar, de sacar hacia afuera lo que no puede quedarse quieto. El arte, en cualquiera de sus formas, ha sido siempre la vía para hacerlo: escribir, vestir, imaginar, interpretar símbolos. No lo concibo como adorno, sino como un lenguaje esencial para habitar el mundo y compartirlo con otros.
        </p>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </SiteLayout>
  )
}
