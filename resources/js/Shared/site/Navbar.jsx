import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function Navbar({ brand }) {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Clipping de prensa', href: '#clipping' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Dressed by MM', href: '#dressed' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Colaboraciones', href: '#colaboraciones' },
    { label: 'Sobre mí', href: '#sobre-mi' },
  ]

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10
      window.scrollTo({ top: y, behavior: 'smooth' })
      setOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 w-full">
      <div className="flex items-center justify-between px-6 py-2 w-full">
        {/* Centro: Logo + Links */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <button onClick={scrollToTop} className="flex items-center">
            <img
              src="/images/BAJ.png"
              alt="Alejandra Jaime"
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Links visibles en desktop */}
          <nav className="hidden lg:flex gap-8 items-center">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-white/80 hover:text-white transition text-sm uppercase tracking-wide"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Botón menú mobile */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white z-50">
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Imagen Lex Corazón Desktop con margen derecho */}
        <div className="hidden lg:block mr-4">
          <Link href="/lex">
            <img
              src="/images/lex-corazon.png"
              alt="Lex Corazón"
              className="h-20 w-20 object-contain cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* Menú desplegable mobile */}
      {open && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col p-6 gap-5 items-center">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-white/80 hover:text-white transition text-lg text-left w-full"
              >
                {label}
              </button>
            ))}

            {/* Imagen Lex Corazón Mobile centrada */}
            <div className="mt-4">
              <Link href="/lex">
                <img
                  src="/images/lex-corazon.png"
                  alt="Lex Corazón"
                  className="h-20 w-20 object-contain cursor-pointer"
                />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
