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

const isImg = (s) =>
  typeof s === 'string' && /\.(png|jpe?g|webp|gif|avif)$/i.test(s)
const isVid = (s) => typeof s === 'string' && /\.(mp4|webm)$/i.test(s)
const isVimeoUrl = (s) => typeof s === 'string' && /vimeo\.com\/(\d+)/i.test(s)
const vimeoIdFrom = (s) => (s.match(/vimeo\.com\/(\d+)/i) || [])[1]

/* ---------- Clipping (carrusel) ---------- */
function AutoCarousel({ items, height = 64, speed = 3 }) {
  const scrollerRef = useRef(null)
  const contentRef = useRef(null)
  const [hover, setHover] = useState(false)

  const drag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
    clickCandidate: null,
  })

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

      if (!hover && !drag.current.active) el.scrollLeft += speed
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [speed, hover])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const MIN_CLICK_MOVE = 6

    const onPointerDown = (e) => {
      el.setPointerCapture?.(e.pointerId)
      e.preventDefault()
      drag.current.active = true
      drag.current.startX = e.clientX
      drag.current.startLeft = el.scrollLeft
      drag.current.moved = 0
      drag.current.clickCandidate = e.target?.closest('a') || null
      el.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!drag.current.active) return
      const delta = e.clientX - drag.current.startX
      drag.current.moved = Math.max(drag.current.moved, Math.abs(delta))
      el.scrollLeft = drag.current.startLeft - delta
    }

    const finish = () => {
      if (!drag.current.active) return
      const moved = drag.current.moved
      const candidate = drag.current.clickCandidate
      drag.current.active = false
      drag.current.clickCandidate = null
      el.style.cursor = 'grab'
      if (moved < MIN_CLICK_MOVE && candidate) candidate.click()
    }

    const cancel = () => {
      drag.current.active = false
      drag.current.clickCandidate = null
      el.style.cursor = 'grab'
    }

    el.addEventListener('pointerdown', onPointerDown, { passive: false })
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', finish)
    el.addEventListener('pointercancel', cancel)
    el.addEventListener('pointerleave', cancel)

    el.style.cursor = 'grab'
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', finish)
      el.removeEventListener('pointercancel', cancel)
      el.removeEventListener('pointerleave', cancel)
    }
  }, [])

  const loop = useMemo(() => [...items, ...items, ...items], [items])

  return (
    <div
      ref={scrollerRef}
      className="relative w-full overflow-hidden bg-black
                 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
      style={{ height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={contentRef}
        className="flex items-center gap-5 px-0 select-none min-w-[200%]"
      >
        {loop.map((it, i) => (
          <a
            key={`${it.medio}-${i}`}
            href={it.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 md:px-8 py-1.5 md:py-2
                       bg-black text-white font-display uppercase
                       text-2xl md:text-4xl tracking-tight
                       hover:bg-white hover:text-black
                       transition-colors duration-300
                       pointer-events-auto select-none"
            title={it.medio}
          >
            {it.medio}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------- Tile media ---------- */
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
  const KB_START = 1.0
  const KB_END = 1.06
  const isSingle = sources.length === 1

  useEffect(() => {
    if (sources.length < 2) return
    const t = setInterval(
      () => setNextIdx((curIdx + 1) % sources.length),
      AUTOPLAY_MS
    )
    return () => clearInterval(t)
  }, [sources.length, curIdx])

  useEffect(() => {
    if (nextIdx == null) return
    const src = sources[nextIdx]
    setNextReady(false)

    if (isImg(src)) {
      const img = new Image()
      img.onload = () => setNextReady(true)
      img.onerror = () => setNextReady(true)
      img.src = src
    } else {
      setNextReady(true)
    }
  }, [nextIdx, sources])

  const onFadeComplete = () => {
    if (nextIdx == null || !nextReady) return
    setCurIdx(nextIdx)
    setNextIdx(null)
    setNextReady(false)
  }

  const renderVideoCover = (src, key) => (
    <video
      key={key}
      src={src}
      className="absolute left-1/2 top-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-cover"
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      preload="auto"
    />
  )
  const renderVimeoCover = (src, key) => {
    const id = vimeoIdFrom(src)
    return (
      <iframe
        key={key}
        className="absolute left-1/2 top-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-cover"
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&controls=0`}
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
        frameBorder="0"
      />
    )
  }
  const renderImageCover = (src, key, { kenBurns, loopKenBurns }) => {
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
            transition: {
              duration: AUTOPLAY_MS / 1000 + 0.5,
              ease: 'linear',
            },
          }
      : {}
    return (
      <Img
        key={key}
        src={src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        {...kbProps}
      />
    )
  }

  const renderMedia = (src, key, { kenBurns = false, loopKenBurns = false } = {}) => {
    if (!src) return null
    if (isVid(src)) return renderVideoCover(src, key)
    if (isVimeoUrl(src)) return renderVimeoCover(src, key)
    if (isImg(src)) return renderImageCover(src, key, { kenBurns, loopKenBurns })
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
      <div className="absolute inset-0 w-full h-full">
        {renderMedia(cur, `cur-${curIdx}`, {
          kenBurns: isImg(cur),
          loopKenBurns: isImg(cur) && isSingle,
        })}
      </div>

      {nxt != null && nextReady && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DUR, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onFadeComplete}
        >
          {renderMedia(nxt, `next-${nextIdx}`, { kenBurns: isImg(nxt) })}
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 bg-black/25 text-white p-3 md:p-4 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <div className="text-[11px] md:text-xs uppercase tracking-wide text-white/80">
            Colección
          </div>
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

/* ---------- Home ---------- */
export default function AJHome() {
  const projects = useMemo(() => {
    const byTitle = (t) =>
      aj.proyectos.find((p) => p.titulo.toLowerCase() === t.toLowerCase())
    const like = (re) => aj.proyectos.find((p) => re.test(p.titulo))

    return {
      weAreCattleFilm: byTitle('we are cattle — fashion film'),
      weAreCattleVogue: byTitle('we are cattle — vogue'),
      integracionFilm: byTitle('integración — fashion film'),
      integracionVogue: byTitle('integración — vogue'),
      shameOfSpain: like(/the shame of spain/i),
      playForArt: like(/play for art/i),
      drogasMeditacion: byTitle('drogas-meditacion'),
      vanishment: byTitle('its all about vanishment (teresa rofer)'),
      winterSeries: byTitle('winter-series'),
    }
  }, [])

  const cell = (project) =>
    project ? (
      <AutoAspectTile
        title={project.titulo}
        href={`/aj/portfolio#${slug(project.titulo)}`}
        media={project.media}
        images={project.images}
      />
    ) : null

  return (
    <SiteLayout brand="aj">
      {/* CLIPPING PRENSA */}
      <section className="w-full">
        <AutoCarousel items={aj.prensa} height={64} />
      </section>

      {/* PORTFOLIO — grid 5x4 con 9 celdas */}
      <section className="w-full px-2 md:px-4 py-10 md:py-14">
        <h2 className="px-2 md:px-4 text-xl md:text-2xl font-display text-ink/90">
          Portfolio
        </h2>

        <div className="relative mt-6 overflow-hidden bg-gradient-to-br from-black/90 via-ink/80 to-black/90 p-1 md:p-2">
          <div className="grid grid-cols-5 grid-rows-4 gap-1 h-[90vh]">
            <div className="div1">{cell(projects.weAreCattleFilm)}</div>
            <div className="row-span-3 col-start-1 row-start-2">
              {cell(projects.weAreCattleVogue)}
            </div>
            <div className="row-span-4 col-start-2 row-start-1">
              {cell(projects.drogasMeditacion)}
            </div>
            <div className="row-span-3 col-start-3 row-start-1">
              {cell(projects.integracionVogue)}
            </div>
            <div className="col-start-3 row-start-4">
              {cell(projects.integracionFilm)}
            </div>
            <div className="row-span-4 col-start-4 row-start-1">
              {cell(projects.shameOfSpain)}
            </div>
            <div className="col-start-5 row-start-1">{cell(projects.vanishment)}</div>
            <div className="col-start-5 row-start-2">{cell(projects.playForArt)}</div>
            <div className="row-span-2 col-start-5 row-start-3">
              {cell(projects.winterSeries)}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/aj/portfolio"
            className="inline-block border border-ink/30 px-5 py-2 text-sm"
          >
            Ver todo el portfolio
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
