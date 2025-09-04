import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import SiteLayout from '@/Layouts/SiteLayout'
import { aj } from '@/data/aj'

/* ---------- utils ---------- */
const slug = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const isImg = (s) => typeof s === 'string' && /\.(png|jpe?g|webp|gif)$/i.test(s)
const isVid = (s) => typeof s === 'string' && /\.(mp4|webm)$/i.test(s)
const isVimeoUrl = (s) => typeof s === 'string' && /vimeo\.com\/(\d+)/i.test(s)
const vimeoIdFrom = (s) => (s.match(/vimeo\.com\/(\d+)/i) || [])[1]

/* ---------- Clipping: enlaces + carrusel ---------- */
function PressStrip({ items }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
      {items.map((p, i) => (
        <a
          key={i}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm md:text-base underline underline-offset-4 hover:no-underline hover:opacity-80"
          title={p.medio}
        >
          {p.medio}
        </a>
      ))}
    </div>
  )
}

function AutoCarousel({ items, height = 82 }) {
  const trackRef = useRef(null)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    if (!trackRef.current) return
    let x = 0
    const el = trackRef.current
    let raf
    const step = () => {
      if (!isHover) {
        x -= 0.5
        el.style.transform = `translateX(${x}px)`
        if (Math.abs(x) > el.scrollWidth / 2) x = 0
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isHover])

  const loop = useMemo(() => [...items, ...items], [items])

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white/50 backdrop-blur-sm"
      style={{ height }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div ref={trackRef} className="absolute inset-0 flex items-center gap-4 px-4 will-change-transform">
        {loop.map((it, i) => (
          <a
            key={i}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 grid place-items-center h-12 w-24 md:h-14 md:w-32 rounded-lg border border-ink/10 bg-paper text-xs md:text-sm text-ink/70 hover:shadow-soft"
            title={it.medio}
          >
            {it.medio}
          </a>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper"></div>
    </div>
  )
}

/* ---------- Tile con cross-fade sin flashes (precarga del siguiente) ---------- */
function AutoSlideTile({ title, href, images = [], media = [], shape = 'auto', ratio }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(null)
  const [nextReady, setNextReady] = useState(false)
  const [hover, setHover] = useState(false)
  const loadTimer = useRef(null)

  const cur = sources[curIdx]
  const nxt = nextIdx != null ? sources[nextIdx] : null

  const isImg = (s) => typeof s === 'string' && /\.(png|jpe?g|webp|gif|avif)$/i.test(s)
  const isVid = (s) => typeof s === 'string' && /\.(mp4|webm)$/i.test(s)
  const isVimeoUrl = (s) => typeof s === 'string' && /vimeo\.com\/(\d+)/i.test(s)
  const vimeoIdFrom = (s) => (s.match(/vimeo\.com\/(\d+)/i) || [])[1]

  const curIsVideo = isVid(cur) || isVimeoUrl(cur)
  const nxtIsVideo = nxt && (isVid(nxt) || isVimeoUrl(nxt))

  // layout & ratio estables (evita jumps y parpadeos)
  const aspect = ratio ? ratio : (curIsVideo || nxtIsVideo) ? '16 / 9' : '2 / 3'
  const wideClass =
    shape === 'auto'
      ? (curIsVideo ? 'md:col-span-2' : '')
      : shape === 'wide'
        ? 'md:col-span-2'
        : ''

  // Programa el próximo pase (solo si hay más de 1 fuente)
  useEffect(() => {
    if (sources.length < 2) return
    const period = hover ? 999999 : 3800
    const t = setInterval(() => {
      const ni = (curIdx + 1) % sources.length
      setNextIdx(ni)
    }, period)
    return () => clearInterval(t)
  }, [sources.length, curIdx, hover])

  // Precarga imágenes y establece fallback en caso de no recibir onload
  useEffect(() => {
    if (nextIdx == null) return
    const src = sources[nextIdx]
    setNextReady(false)

    // Limpia timer previo
    if (loadTimer.current) {
      clearTimeout(loadTimer.current)
      loadTimer.current = null
    }

    // Fallback: aunque no llegue onload (CMYK pesados), forzamos ready tras X ms
    const FALLBACK_MS = 1200
    loadTimer.current = setTimeout(() => setNextReady(true), FALLBACK_MS)

    if (isImg(src)) {
      const img = new Image()
      img.onload = () => {
        clearTimeout(loadTimer.current)
        setNextReady(true)
      }
      img.onerror = () => {
        clearTimeout(loadTimer.current)
        setNextReady(true) // no bloqueamos por error
      }
      img.src = src
    }
    // Para vídeos/Vimeo el ready lo marca onLoadedMetadata/onLoad

    return () => {
      if (loadTimer.current) clearTimeout(loadTimer.current)
    }
  }, [nextIdx, sources])

  // Al terminar el fade con el siguiente listo, conmutamos
  const onCrossfadeDone = () => {
    if (nextIdx == null) return
    setCurIdx(nextIdx)
    setNextIdx(null)
    setNextReady(false)
  }

  const fade = { duration: 0.9, ease: [0.22, 1, 0.36, 1] }

const renderMedia = (src, key, { onLoaded }) => {
  if (isVid(src)) {
    return (
      <div key={key} className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          src={src}
          className="max-w-full max-h-full object-contain"
          autoPlay muted loop playsInline controls={false}
          onLoadedMetadata={onLoaded}
        />
      </div>
    )
  }
  if (isVimeoUrl(src)) {
    const id = vimeoIdFrom(src)
    return (
      <div key={key} className="absolute inset-0 flex items-center justify-center bg-black">
        <iframe
          className="w-full h-full"
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          frameBorder="0"
          onLoad={onLoaded}
        />
      </div>
    )
  }
  // Imagen
  return (
    <div key={key} className="absolute inset-0 flex items-center justify-center bg-black">
      <img
        src={src}
        alt={title}
        className="max-w-full max-h-full object-contain"
        loading="lazy"
        decoding="async"
        onLoad={onLoaded}
      />
    </div>
  )
}

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative rounded-2xl border border-ink/10 bg-black overflow-hidden ${wideClass}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Contenedor con ratio fijo */}
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {/* Capa actual SIEMPRE visible */}
        <div className="absolute inset-0">
          {renderMedia(cur, `cur-${curIdx}`, { onLoaded: () => {} })}
        </div>

        {/* Capa siguiente: aparece solo cuando esté lista o llegue el fallback */}
        {nextIdx != null && (
<motion.div
  className="absolute inset-0"
  initial={{ opacity: 0, scale: 1.02 }}
  animate={{ opacity: nextReady ? 1 : 0, scale: nextReady ? 1 : 1.02 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  onAnimationComplete={() => {
    if (nextReady) onCrossfadeDone()
  }}
>
  {renderMedia(nxt, `next-${nextIdx}`, { onLoaded: () => setNextReady(true) })}
</motion.div>
        )}
      </div>

      {/* overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 text-white p-4 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-full">
          <div className="text-sm uppercase tracking-wide text-white/80">Colección</div>
          <div className="text-lg font-semibold">{title}</div>
          <Link href={href} className="mt-2 inline-block rounded-lg bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
            Ver proyecto
          </Link>
        </div>
      </motion.div>

      {/* glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/0"
        animate={{ boxShadow: hover ? '0 20px 60px rgba(0,0,0,0.35)' : '0 6px 18px rgba(0,0,0,0.08)' }}
        transition={{ duration: 0.35 }}
      />
    </motion.article>
  )
}


export default function AJHome() {
  // Proyectos destacados (sin duplicar)
  const homeProjects = useMemo(() => {
    const byTitle = (t) => aj.proyectos.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos.find((p) => re.test(p.titulo))
    const used = new Set()
    const add = (item) => (item && !used.has(item.title) ? (used.add(item.title), item) : null)

    return [
      // WE ARE CATTLE
      add((() => {
        const p = byTitle('we are cattle — fashion film')
        return p && { title: p.titulo, href: '/aj/portfolio#we-are-cattle', media: p.media, shape: 'auto', ratio: '16 / 9' }
      })()),
      add((() => {
        const p = byTitle('we are cattle — vogue')
        return p && { title: p.titulo, href: '/aj/portfolio#we-are-cattle', media: p.media, shape: 'auto', ratio: '2 / 3' }
      })()),

      // INTEGRACIÓN
      add((() => {
        const p = byTitle('integración — fashion film')
        return p && { title: p.titulo, href: '/aj/portfolio#integracion', media: p.media, shape: 'auto', ratio: '16 / 9' }
      })()),
      add((() => {
        const p = byTitle('integración — vogue')
        return p && { title: p.titulo, href: '/aj/portfolio#integracion', media: p.media, shape: 'auto', ratio: '2 / 3' }
      })()),

      // Otros
      add((() => {
        const p = like(/the shame of spain/i)
        return p && { title: p.titulo, href: `/aj/portfolio#${slug(p.titulo)}`, media: p.media || p.images || [], shape: 'auto', ratio: '2 / 3' }
      })()),
      add((() => {
        const p = like(/play for art/i)
        return p && { title: p.titulo, href: `/aj/portfolio#${slug(p.titulo)}`, media: p.media || p.images || [], shape: 'auto', ratio: '2 / 3' }
      })()),
      add((() => {
        const p = like(/los ojos del nativo/i)
        return p && { title: p.titulo, href: `/aj/portfolio#${slug(p.titulo)}`, media: p.media || p.images || [], shape: 'auto', ratio: '2 / 3' }
      })()),
    ].filter(Boolean)
  }, [])

  return (
    <SiteLayout brand="aj">
      {/* CLIPPING PRENSA */}
      <section className="container py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-display text-ink/90 text-center">Clipping de prensa</h2>
        <div className="mt-4">
          <PressStrip items={aj.prensa} />
        </div>
        <div className="mt-6">
          <AutoCarousel items={aj.prensa} height={92} />
        </div>
      </section>

      {/* PORTFOLIO DESTACADO */}
      <section className="container py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-display text-ink/90 text-center">Portfolio</h2>

        {/* Grid adaptativo, sin recortes y sin parpadeos */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-4 md:gap-6">
          {homeProjects.map((p, i) => (
            <AutoSlideTile
              key={i}
              title={p.title}
              href={p.href}
              media={p.media}
              images={p.images}
              shape={p.shape}
              ratio={p.ratio}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/aj/portfolio" className="inline-block rounded-xl border border-ink/20 px-5 py-2 text-sm hover:bg-ink/5">
            Ver todo el portfolio
          </Link>
        </div>
      </section>

      {/* Placeholders */}
      <section className="container py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-xl text-ink/70">Experiencia destacada · próximamente</h2>
      </section>
      <section className="container py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-xl text-ink/70">Sobre mí · próximamente</h2>
      </section>
      <section className="container py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-ink/70">Contacto / Redes / Política de privacidad · próximamente</h2>
      </section>
    </SiteLayout>
  )
}
