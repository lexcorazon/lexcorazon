import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from '@inertiajs/react'

// Importa tu PNG (ruta relativa desde /resources/js/Pages → /resources/images)
import LexLogo from '../../images/lex-corazon.png'

export default function Landing() {
  const [hovered, setHovered] = useState(null) // 'aj' | 'lex' | null
  const reduce = useReducedMotion()

  // ⏱️ Transiciones
  const expandTransition  = { duration: reduce ? 0 : 1.8, ease: [0.25, 1, 0.3, 1] } // expandir/colapsar panel
  const entryTransition   = { duration: reduce ? 0 : 3.2, ease: [0.25, 1, 0.3, 1] } // fondos + títulos
  const overlayTransition = { duration: reduce ? 0 : 1.1 }                           // bullets + CTA

  // Anchos con flex-basis explícito
  const ajBasis  = hovered === 'aj'  ? '100%' : hovered === 'lex' ? '0%'  : '50%'
  const lexBasis = hovered === 'lex' ? '100%' : hovered === 'aj'  ? '0%'  : '50%'

  return (
    <main className="relative min-h-dvh flex bg-paper text-ink overflow-hidden">
      {/* Divider absoluto (no ocupa ancho) */}
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
        style={{ flexBasis: '50%' }}
        animate={{ flexBasis: ajBasis }}
        transition={expandTransition}
      >
        {/* Fondo AJ: blanco */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entryTransition}
        />

        {/* Contenido AJ */}
        <section className="relative h-full min-h-[45dvh] md:min-h-dvh w-full flex items-center justify-center text-ink p-8 text-center">
          <div className="max-w-xl">
            {/* Título AJ */}
            <motion.h1
              className="text-4xl md:text-5xl font-display"
              initial={{ opacity: 0, y: 288 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 2.2, ease: [0.25, 1, 0.3, 1] },
                y: { type: 'spring', stiffness: 50, damping: 18, mass: 1.1 },
                delay: 0.3,
              }}
            >
              Alejandra <span className="opacity-90">Jaime</span>
            </motion.h1>

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

            {/* CTA AJ */}
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
                    className="inline-block rounded-xl bg-ink text-white px-5 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
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
        <section className="relative h-full min-h-[45dvh] md:min-h-dvh w-full flex items-center justify-center text-white p-8 text-center">
          <div className="max-w-3xl w-full px-4">
            {/* Logo Lex (PNG) */}
            <motion.img
              src={LexLogo}
              alt="Lex Corazón"
              className="mx-auto w-[72%] max-w-[540px] md:max-w-[680px] drop-shadow"
              initial={{ opacity: 0, y: -288 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { duration: 2.2, ease: [0.25, 1, 0.3, 1] },
                y: { type: 'spring', stiffness: 50, damping: 18, mass: 1.1 },
                delay: 0.3,
              }}
            />

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
