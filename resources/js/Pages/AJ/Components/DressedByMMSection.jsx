import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function DressedByMMSection({ media = [] }) {
  const [curIdx, setCurIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const titles = media.map((path) =>
    path.split('/').pop().replace(/\.[^/.]+$/, '')
  )

  const getPosition = (index) => {
    const diff = (index - curIdx + media.length) % media.length
    if (diff === 0) return { scale: 1, opacity: 1, zIndex: 30, x: 0 }
    if (diff === 1) return { scale: 0.85, opacity: 0.7, zIndex: 20, x: '50%' }
    if (diff === 2) return { scale: 0.65, opacity: 0.2, zIndex: 10, x: '100%' }
    if (diff === media.length - 1)
      return { scale: 0.85, opacity: 0.7, zIndex: 20, x: '-50%' }
    if (diff === media.length - 2)
      return { scale: 0.65, opacity: 0.2, zIndex: 10, x: '-100%' }
    return { scale: 0.5, opacity: 0, zIndex: 5, x: 0 }
  }

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x > rect.width / 2) setCurIdx((curIdx + 1) % media.length)
    else setCurIdx((curIdx - 1 + media.length) % media.length)
  }

  if (!media.length) return null

  return (
    <motion.section
      id="dressed"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 border-b border-gray-100 bg-white"
    >
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
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <img
              src={src}
              alt={titles[idx]}
              className="block w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] 
                         h-[500px] sm:h-[600px] md:h-[650px] object-cover"
            />
            
            {/* Título visible en móvil siempre, en desktop solo con hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 md:hidden py-3 px-4">
              <span className="text-white text-xl font-bold text-center block">
                {titles[idx]}
              </span>
            </div>
            
            {hoveredIdx === idx && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex absolute inset-0 items-center justify-center bg-black/40"
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
    </motion.section>
  )
}
