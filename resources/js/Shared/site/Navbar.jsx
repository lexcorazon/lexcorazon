import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ brand }) {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Clipping de prensa', href: '#clipping' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Dressed by MM', href: '#dressed' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Sobre mí', href: '#sobre-mi' },
  ]

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <button onClick={scrollToTop} className="flex items-center">
          <img
            src="/images/alejandra-jaime.png"
            alt="Alejandra Jaime"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </button>

        {/* Links desktop */}
        <nav className="hidden md:flex gap-6">
          {links.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-white/80 hover:text-white transition text-xs uppercase tracking-wide"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col p-4 gap-4">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-white/80 hover:text-white transition text-base text-left"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
