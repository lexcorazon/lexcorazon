import React from 'react'

export default function Footer({ brand }) {
  return (
    <footer className="bg-black text-white border-t border-white/10 w-full">
      {/* Contenido principal */}
      <div className="w-full px-6 md:px-12 py-14 grid gap-10 md:grid-cols-2 text-center">
        
        {/* 🪶 Marca */}
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-display text-xl font-semibold tracking-wide">
            {brand === 'lex' ? 'Lex Corazón' : 'Alejandra Jaime'}
          </h4>
          <p className="text-sm text-white/60 mt-2 max-w-xs">
            {brand === 'lex'
              ? 'Mentoría & Coaching Creativo'
              : 'Arte · Marca Personal · Portfolio'}
          </p>
        </div>

        {/* ✉️ Contacto */}
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-semibold mb-3">Contacto</h5>
          <p className="text-sm text-white/70">info@alejandrajaime.es</p>
          <p className="text-sm text-white/70 mt-1">Sevilla · España</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="text-center text-xs text-white/50 py-5 border-t border-white/10">
        © {new Date().getFullYear()} alejandrajaime.es · Todos los derechos reservados
      </div>
    </footer>
  )
}
