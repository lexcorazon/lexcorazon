import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function CollaborationsSection() {
  const colaboracionesVideos = [
    { id: 1, url: 'kqPHo2q-6nw', title: 'Control (Recycled J y Rels B)', thumbnail: 'https://img.youtube.com/vi/kqPHo2q-6nw/hqdefault.jpg' },
    { id: 2, url: 'P1dI_LAN0fo', title: 'Tú y yo (La Zowi)', thumbnail: 'https://img.youtube.com/vi/P1dI_LAN0fo/hqdefault.jpg' },
    { id: 3, url: 'aWAlCbOGUXA', title: 'A tu lado (Machete)', thumbnail: 'https://img.youtube.com/vi/aWAlCbOGUXA/hqdefault.jpg' },
    { id: 4, url: 'v0JArnT7BMw', title: 'Los ojos del nativo (Juancho Marqués)', thumbnail: 'https://img.youtube.com/vi/v0JArnT7BMw/hqdefault.jpg' },
    { id: 5, url: 'vCHFKYgsz8g', title: 'Nuevo mundo (Juancho Marqués y Fuel Fandango)', thumbnail: 'https://img.youtube.com/vi/vCHFKYgsz8g/hqdefault.jpg' },
    { id: 6, url: 'eNRoiM5NHYQ', title: 'Te acuerdas que (Juancho Marqués y Daniela Garsal)', thumbnail: 'https://img.youtube.com/vi/eNRoiM5NHYQ/hqdefault.jpg' },
    { id: 7, url: 'mPjKPszMImU', title: 'No pero sí (Juancho Marqués y Daniela Garsal)', thumbnail: 'https://img.youtube.com/vi/mPjKPszMImU/hqdefault.jpg' },
    { id: 8, url: 'rTpDXH849hc', title: 'Algo mejor (Juancho Marqués feat Maka)', thumbnail: 'https://img.youtube.com/vi/rTpDXH849hc/hqdefault.jpg' },
    { id: 9, url: 'rBuvvqY4Ibs', title: 'Vuelvo a la nena (Soto Asa)', thumbnail: 'https://img.youtube.com/vi/rBuvvqY4Ibs/hqdefault.jpg' },
  ]

  function VideoCarousel3D({ videos = [] }) {
    const [curIdx, setCurIdx] = useState(0)
    const prev = () => setCurIdx((curIdx - 1 + videos.length) % videos.length)
    const next = () => setCurIdx((curIdx + 1) % videos.length)

    const getStyle = (index) => {
      const diff = (index - curIdx + videos.length) % videos.length
      if (diff === 0) return { scale: 1, opacity: 1, zIndex: 30, x: 0 }
      if (diff === 1) return { scale: 0.8, opacity: 0.6, zIndex: 20, x: '60%' }
      if (diff === videos.length - 1) return { scale: 0.8, opacity: 0.6, zIndex: 20, x: '-60%' }
      return { scale: 0.5, opacity: 0, zIndex: 10 }
    }

    return (
      <div className="relative w-full flex flex-col items-center justify-center h-[380px] sm:h-[460px] md:h-[540px]">
        <div className="relative w-full flex justify-center items-center h-full overflow-hidden">
          {videos.map((video, idx) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute flex flex-col items-center cursor-pointer group"
              initial={false}
              animate={getStyle(idx)}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full sm:max-w-[450px] md:max-w-[600px] h-64 sm:h-72 md:h-80 object-cover shadow-lg hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-center px-2">{video.title}</span>
              </div>
            </motion.a>
          ))}

          {videos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-1 top-1/2 -translate-y-1/2 text-black text-3xl z-40 hover:scale-125 transition-transform"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-black text-3xl z-40 hover:scale-125 transition-transform"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.section
      id="colaboraciones"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-6 md:px-16 py-28 bg-white border-b border-gray-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6">
        <div className="flex-1 w-full flex flex-col items-center">
          <VideoCarousel3D videos={colaboracionesVideos.slice(0, 3)} />
          <h3 className="mt-1 text-lg font-bold text-black bg-white border-2 border-black px-6 py-3 text-center rounded-full shadow-md">
            Colaboraciones de MM en videoclips
          </h3>
        </div>

        <div className="flex-1 w-full flex flex-col items-center">
          <VideoCarousel3D videos={colaboracionesVideos.slice(8, 9)} />
          <h3 className="mt-1 text-lg font-bold text-black bg-white border-2 border-black px-6 py-3 text-center rounded-full shadow-md">
            Dirección artística
          </h3>
        </div>

        <div className="flex-1 w-full flex flex-col items-center">
          <VideoCarousel3D videos={colaboracionesVideos.slice(3, 8)} />
          <h3 className="mt-1 text-lg font-bold text-black bg-white border-2 border-black px-6 py-3 text-center rounded-full shadow-md">
            Estilismo y coordinación de vestuario
          </h3>
        </div>
      </div>
    </motion.section>
  )
}
