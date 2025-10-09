import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function BookingForm() {
  const [form, setForm] = useState({
    fecha: '',
    lugar: '',
    hora: '',
    expectativas: '',
    astrologia: '',
    puntoVital: '',
    creatividad: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 md:px-12 py-16"
    >
      <motion.h1
        variants={fadeUp}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Reserva tu Sesión ✨
      </motion.h1>

      <motion.form
        variants={fadeUp}
        className="w-full max-w-2xl flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label className="text-sm mb-2">Fecha de nacimiento *</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">Lugar de nacimiento (Ciudad, País) *</label>
          <input
            type="text"
            name="lugar"
            value={form.lugar}
            onChange={handleChange}
            placeholder="Ej: Sevilla, España"
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">Hora de nacimiento *</label>
          <input
            type="text"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            placeholder="Ej: 14:35 (exacta o aproximada)"
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">¿Qué esperas de la sesión?</label>
          <input
            type="text"
            name="expectativas"
            value={form.expectativas}
            onChange={handleChange}
            placeholder="Una frase o breve descripción"
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">¿Tienes conocimientos de astrología?</label>
          <select
            name="astrologia"
            value={form.astrologia}
            onChange={handleChange}
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white"
          >
            <option value="">Selecciona</option>
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">¿En qué punto vital te encuentras?</label>
          <textarea
            name="puntoVital"
            value={form.puntoVital}
            onChange={handleChange}
            placeholder="Describe brevemente tu momento actual..."
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400 min-h-[100px]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2">¿Qué relación crees que tienes con la creatividad?</label>
          <textarea
            name="creatividad"
            value={form.creatividad}
            onChange={handleChange}
            placeholder="Por ejemplo: conexión, bloqueo, curiosidad..."
            className="bg-transparent border border-gray-700 rounded-md p-3 text-white placeholder-gray-400 min-h-[100px]"
          />
        </div>

        {/* 🟢 Botón WhatsApp */}
        <motion.a
          href="https://wa.me/346XXXXXXXX"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full py-3 text-center flex justify-center items-center gap-2 transition-all"
        >
          💬 Contactar por WhatsApp
        </motion.a>

        {/* 💳 Botón Stripe */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.location.href = '/stripe/checkout'}
          className="mt-4 bg-white text-black font-semibold rounded-full py-3 transition-all hover:bg-gray-200"
        >
          Proceder al Pago
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
