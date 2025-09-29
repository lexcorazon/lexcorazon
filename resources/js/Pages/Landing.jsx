import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from '@inertiajs/react'

// Importa tus PNG
import LexLogo from '../../images/lex-corazon.png'
import AJLogo from '../../images/alejandra-jaime2.png'

export default function Landing() {
  const [hovered, setHovered] = useState(null) // 'aj' | 'lex' | null
  const reduce = useReducedMotion()

  const expandTransition  = { duration: reduce ? 0 : 1.8, ease: [0.25, 1, 0.3, 1] }
  const entryTransition   = { duration: reduce ? 0 : 3.2, ease: [0.25, 1, 0.3, 1] }
  const overlayTransition = { duration: reduce ? 0 : 1.1 }

  const ajBasis  = hovered === 'aj'  ? '100%' : hovered === 'lex' ? '0%'  : '50%'
  const lexBasis = hovered === 'lex' ? '100%' : hovered === 'aj'  ? '0%'  : '50%'

  // Tamaños iguales para AJ y Lex
  const logoWidth = "w-[100%]"
  const logoMaxWidthMobile = "max-w-[400px]"
  const logoMaxWidthDesktop = "md:max-w-[480px]"
  const logoHeight = "h-[180px]"

  // Toggle para touch/móviles
  const handleTouch = (panel) => {
    if (hovered === panel) {
      setHovered(null)
    } else {
      setHovered(panel)
    }
  }

  return (
    <main className="relative min-h-dvh flex bg-paper text-ink overflow-hidden">
      {!hovered && (
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-black/10 -translate-x-1/2"
        />
      )}

      {/* PANEL AJ */}
      <motion.div
        className="relative group overflow-hidden focus-within:ring-4 focus-within:ring-primary/40"
        onMouseEnter={() => setHovered('aj')}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered('aj')}
        onBlur={() => setHovered(null)}
        onClick={() => handleTouch('aj')}
        style={{ flexBasis: '50%' }}
        animate={{ flexBasis: ajBasis }}
        transition={expandTransition}
      >
        {/* Fondo AJ – gris claro */}
        <motion.div
          className="absolute inset-0 bg-gray-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entryTransition}
        />

        {/* Contenido AJ */}
        <section className="relative h-full min-h-[45dvh] md:min-h-dvh w-full flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-xl w-full">
            {/* Logo AJ */}
            <motion.img
              src={AJLogo}
              alt="Alejandra Jaime"
              className={`mx-auto ${logoWidth} ${logoMaxWidthMobile} ${logoMaxWidthDesktop} ${logoHeight} drop-shadow`}
              initial={{ opacity: 0, y: 288 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 2.2, ease: [0.25, 1, 0.3, 1] },
                y: { type: 'spring', stiffness: 50, damping: 18, mass: 1.1 },
                delay: 0.3,
              }}
            />

            {/* Punto animado móvil */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
              <span className="block w-3 h-3 bg-black/40 dark:bg-white/40 rounded-full animate-pulse"></span>
            </div>

            {/* Bullet AJ */}
            <AnimatePresence>
              {hovered === 'aj' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={overlayTransition}
                  className="mx-auto mt-6 max-w-md rounded-2xl bg-ink/5 px-5 py-4 text-sm text-ink/90 text-left shadow-soft"
                >
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Arte y marca personal con dirección creativa.</li>
                    <li>Mentoría creativa: introspección e identidad.</li>
                    <li>Portfolio y blog de procesos e ideas.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA AJ – botón negro con sombra */}
            <AnimatePresence>
              {hovered === 'aj' && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={overlayTransition}
                  className="mt-6"
                >
                  <Link
                    href="/aj"
                    className="inline-block rounded-xl bg-black text-white px-5 py-2 text-sm shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                  >
                    Entrar
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>

      {/* PANEL LEX */}
      <motion.div
        className="relative group overflow-hidden focus-within:ring-4 focus-within:ring-primary/40"
        onMouseEnter={() => setHovered('lex')}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered('lex')}
        onBlur={() => setHovered(null)}
        onClick={() => handleTouch('lex')}
        style={{ flexBasis: '50%' }}
        animate={{ flexBasis: lexBasis }}
        transition={expandTransition}
      >
        {/* Fondo Lex */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black to-zinc-700"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entryTransition}
        />

        {/* Contenido Lex */}
        <section className="relative h-full min-h-[45dvh] md:min-h-dvh w-full flex flex-col items-center justify-center text-white p-8 text-center">
          <div className="max-w-3xl w-full px-4">
            {/* Logo Lex */}
            <motion.img
              src={LexLogo}
              alt="Lex Corazón"
              className={`mx-auto ${logoWidth} ${logoMaxWidthMobile} ${logoMaxWidthDesktop} ${logoHeight} drop-shadow`}
              initial={{ opacity: 0, y: -288 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 2.2, ease: [0.25, 1, 0.3, 1] },
                y: { type: 'spring', stiffness: 50, damping: 18, mass: 1.1 },
                delay: 0.3,
              }}
            />

            {/* Punto animado móvil */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
              <span className="block w-3 h-3 bg-white/40 rounded-full animate-pulse"></span>
            </div>

            {/* Bullet Lex */}
            <AnimatePresence>
              {hovered === 'lex' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={overlayTransition}
                  className="mx-auto mt-6 max-w-md rounded-2xl bg-white/10 backdrop-blur-sm px-5 py-4 text-sm text-white/95 text-left shadow-soft"
                >
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mentoría creativa: identidad conceptual y visual.</li>
                    <li>Coaching astrológico: lectura y consultas.</li>
                    <li>Enfoque minimalista, claro y práctico.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Lex */}
            <AnimatePresence>
              {hovered === 'lex' && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={overlayTransition}
                  className="mt-6"
                >
                  <Link
                    href="/lex"
                    className="inline-block rounded-xl bg-white/10 px-5 py-2 text-sm backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    Entrar
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </main>
  )
}
