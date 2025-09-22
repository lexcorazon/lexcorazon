import React, { useEffect, useMemo, useState, useRef } from 'react'
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

const isImg = (s) => typeof s === 'string' && /\.(png|jpe?g|webp|gif|avif)$/i.test(s)
const isVid = (s) => typeof s === 'string' && /\.(mp4|webm)$/i.test(s)
const isVimeoUrl = (s) => typeof s === 'string' && /vimeo\.com\/(\d+)/i.test(s)
const vimeoIdFrom = (s) => (s.match(/vimeo\.com\/(\d+)/i) || [])[1]

/* ---------- Clipping (enlaces) ---------- */
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
        >
          {p.medio}
        </a>
      ))}
    </div>
  )
}

/* ---------- Clipping (carrusel) ---------- */
function AutoCarousel({ items, height = 92 }) {
  const [hover, setHover] = useState(false)
  const [x, setX] = useState(0)

  useEffect(() => {
    let raf
    const tick = () => {
      if (!hover) {
        setX((prev) => {
          const next = prev - 0.5
          const limit = items.length * 140
          return Math.abs(next) > limit ? 0 : next
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hover, items.length])

  const loop = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white/50 backdrop-blur-sm"
      style={{ height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute inset-0 flex items-center gap-4 px-4 will-change-transform"
        style={{ transform: `translateX(${x}px)` }}
      >
        {loop.map((it, i) => (
          <a
            key={i}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 grid place-items-center h-12 w-28 md:h-14 md:w-36 rounded-lg border border-ink/10 bg-paper text-xs md:text-sm text-ink/70 hover:shadow-soft"
            title={it.medio}
          >
            {it.medio}
          </a>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper" />
    </div>
  )
}

/* ---------- Tile de media con cross-fade + Ken Burns (sin recolocado) ---------- */
function AutoAspectTile({ title, href, media = [], images = [] }) {
  const sources = media.length ? media : images
  const [curIdx, setCurIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(null)
  const [nextReady, setNextReady] = useState(false)
  const [hover, setHover] = useState(false)

  const cur = sources[curIdx]
  const nxt = nextIdx != null ? sources[nextIdx] : null

  const AUTOPLAY_MS = 5600
  const FADE_DUR = 1.25
  const KB_START = 1.00   // suavizado opcional
  const KB_END = 1.06
  const isSingle = sources.length === 1

  // autoplay: programamos cuál será el siguiente índice
  useEffect(() => {
    if (sources.length < 2) return
    const t = setInterval(() => setNextIdx((curIdx + 1) % sources.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [sources.length, curIdx])

  // PRECARGA REAL sin fallback: marcamos ready solo cuando carga de verdad
  useEffect(() => {
    if (nextIdx == null) return
    const src = sources[nextIdx]
    setNextReady(false)

    if (isImg(src)) {
      const img = new Image()
      img.onload = () => setNextReady(true)
      img.onerror = () => setNextReady(true) // si falla, no bloqueamos
      img.src = src
    }
    // Para vídeos/Vimeo pre-cargamos con un preloader oculto en el JSX (abajo).
  }, [nextIdx, sources])

  const onFadeComplete = () => {
    if (nextIdx == null || !nextReady) return
    setCurIdx(nextIdx)
    setNextIdx(null)
    setNextReady(false)
  }

  // Render helpers (siempre absolute/inset-0 para no mover layout)
  const renderVideoCover = (src, key, { onLoaded }) => (
    <div key={key} className="absolute inset-0">
      <video
        src={src}
        className="absolute left-1/2 top-1/2 w-[178%] h-[178%] -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay muted loop playsInline controls={false}
        onLoadedMetadata={onLoaded}
        preload="auto"
      />
    </div>
  )

  const renderVimeoCover = (src, key, { onLoaded }) => {
    const id = vimeoIdFrom(src)
    return (
      <div key={key} className="absolute inset-0">
        <iframe
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%]"
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
          frameBorder="0"
          onLoad={onLoaded}
        />
      </div>
    )
  }

  const renderImageCover = (src, key, { onLoaded, kenBurns, loopKenBurns }) => {
    const Img = motion.img
    const kbProps = kenBurns
      ? loopKenBurns
        ? {
          initial: { scale: KB_START },
          animate: { scale: [KB_START, KB_END, KB_START] },
          transition: { duration: 12, repeat: Infinity, ease: 'linear' },
        }
        : {
          initial: { scale: KB_START },
          animate: { scale: KB_END },
          transition: { duration: AUTOPLAY_MS / 1000 + 0.5, ease: 'linear' },
        }
      : {}

    return (
      <div key={key} className="absolute inset-0">
        <Img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onLoad={onLoaded}
          {...kbProps}
        />
      </div>
    )
  }

  const renderMedia = (src, key, { onLoaded, kenBurns = false, loopKenBurns = false }) => {
    if (!src) return null
    if (isVid(src)) return renderVideoCover(src, key, { onLoaded })
    if (isVimeoUrl(src)) return renderVimeoCover(src, key, { onLoaded })
    if (isImg(src)) return renderImageCover(src, key, { onLoaded, kenBurns, loopKenBurns })
    return null
  }

  // PRELOADER oculto para marcar ready de vídeos / Vimeo ANTES del swap
  const Preloader = () => {
    if (nextIdx == null || nextReady) return null
    const src = sources[nextIdx]
    if (isVid(src)) {
      return (
        <video
          className="sr-only"
          src={src}
          muted
          preload="auto"
          onLoadedMetadata={() => setNextReady(true)}
        />
      )
    }
    if (isVimeoUrl(src)) {
      const id = vimeoIdFrom(src)
      return (
        <iframe
          className="sr-only"
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=0&muted=1&loop=0&byline=0&title=0&controls=0`}
          onLoad={() => setNextReady(true)}
          title="preload"
        />
      )
    }
    // imágenes ya se precargan en el useEffect
    return null
  }

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-full bg-black overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Contenedor FIJO para evitar recolocado */}
      <div className="absolute inset-0 w-full h-full">
        {/* capa actual */}
        {renderMedia(cur, `cur-${curIdx}`, {
          onLoaded: () => { },
          kenBurns: isImg(cur),
          loopKenBurns: isImg(cur) && isSingle,
        })}
      </div>

      {/* capa siguiente */}
      {nxt != null && nextReady && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DUR, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onFadeComplete}
        >
          {renderMedia(nxt, `next-${nextIdx}`, {
            onLoaded: () => { },
            kenBurns: isImg(nxt),
          })}
        </motion.div>
      )}

      {/* overlay */}
      <motion.div
        className="absolute inset-0 bg-black/25 text-white p-3 md:p-4 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <div className="text-[11px] md:text-xs uppercase tracking-wide text-white/80">Colección</div>
          <div className="text-base md:text-lg font-semibold">{title}</div>
          {href && (
            <Link
              href={href}
              className="mt-2 inline-block border border-white/30 px-3 py-1 text-xs md:text-sm"
            >
              Ver proyecto
            </Link>
          )}
        </div>
      </motion.div>
    </motion.article>
  )

}

export default function AJHome() {
  const projects = useMemo(() => {
    const byTitle = (t) => aj.proyectos.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos.find((p) => re.test(p.titulo))

    return [
      byTitle('we are cattle — fashion film'),
      byTitle('we are cattle — vogue'),
      byTitle('integración — fashion film'),
      byTitle('integración — vogue'),
      byTitle('dressed by mm'),
      like(/the shame of spain/i),
      like(/play for art/i),

    ].filter(Boolean)
  }, [])

  const cell = (i) =>
    projects[i] ? (
      <AutoAspectTile
        title={projects[i].titulo}
        href={`/aj/portfolio#${slug(projects[i].titulo)}`}
        media={projects[i].media}
        images={projects[i].images}
      />
    ) : null

  return (
    <SiteLayout brand="aj">
      {/* CLIPPING PRENSA */}
      <section className="w-full px-4 md:px-8 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-display text-ink/90 text-center">Clipping de prensa</h2>
        <div className="mt-4"><PressStrip items={aj.prensa} /></div>
        <div className="mt-6"><AutoCarousel items={aj.prensa} height={92} /></div>
      </section>

      {/* PORTFOLIO — grid 5x3 (7 celdas) con layout personalizado */}
      <section className="w-full px-2 md:px-4 py-10 md:py-14">
        <h2 className="px-2 md:px-4 text-xl md:text-2xl font-display text-ink/90">Portfolio</h2>

        <div className="relative mt-6  overflow-hidden bg-gradient-to-br from-black/90 via-ink/80 to-black/90 p-1 md:p-2">
          <div className="grid grid-cols-5 grid-rows-3 gap-1 h-[85vh]">
            <div className="div1">{cell(0)}</div>
            <div className="row-span-2 col-start-1 row-start-2">{cell(1)}</div>
            <div className="row-span-3 col-start-2 row-start-1">{cell(5)}</div>
            <div className="row-span-2 col-start-4 row-start-1">{cell(3)}</div>
            <div className="col-start-4 row-start-3">{cell(2)}</div>
            <div className="row-span-3 col-start-3 row-start-1">{cell(4)}</div>
            <div className="row-span-3 col-start-5 row-start-1">{cell(6)}</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/aj/portfolio" className="inline-block border border-ink/30 px-5 py-2 text-sm">
            Ver todo el portfolio
          </Link>
        </div>
      </section>

      {/* Futuras secciones */}
      <section className="w-full px-4 md:px-8 py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-xl text-ink/70">Experiencia destacada · próximamente</h2>
      </section>
      <section className="w-full px-4 md:px-8 py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-xl text-ink/70">Sobre mí · próximamente</h2>
      </section>
      <section className="w-full px-4 md:px-8 py-14 border-t border-ink/10 text-center">
        <h2 className="text-lg md:text-ink/70">Contacto / Redes / Política de privacidad · próximamente</h2>
      </section>
    </SiteLayout>
  )
}
