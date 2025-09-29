import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer({ brand }) {
  return (
    <footer className="bg-black text-white border-t border-white/10 w-full">
      {/* Contenido principal */}
      <div className="w-full px-6 md:px-12 py-14 grid gap-10 sm:grid-cols-1 md:grid-cols-3 text-center">
        
        {/* Marca */}
        <div className="flex flex-col items-center">
          <h4 className="font-display text-xl font-semibold">
            {brand === 'lex' ? 'Lex Corazón' : 'Alejandra Jaime'}
          </h4>
          <p className="text-sm text-white/60 mt-2 max-w-xs">
            {brand === 'lex'
              ? 'Mentoría & Coaching'
              : 'Arte · Marca Personal · Portfolio'}
          </p>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center">
          <h5 className="font-semibold mb-3">Contacto</h5>
          <p className="text-sm text-white/70">info@alejandrajaime.es</p>
          <p className="text-sm text-white/70 mt-1">Sevilla · España</p>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center">
          <h5 className="font-semibold mb-3">Sígueme</h5>
          <div className="flex gap-5 mt-2">
            {[
              { icon: Instagram, url: 'https://instagram.com/' },
              { icon: Linkedin, url: 'https://linkedin.com/' },
              { icon: Mail, url: 'mailto:info@alejandrajaime.es' },
            ].map(({ icon: Icon, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-white/60 hover:text-white transition"
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-white/50 py-5 border-t border-white/10">
        © {new Date().getFullYear()} alejandrajaime.es · Todos los derechos reservados
      </div>
    </footer>
  )
}
