import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={scrollToTop} className="flex items-center">
          <img src="/images/alejandra-jaime.png" alt="Alejandra Jaime" className="h-20 md:h-28 w-auto object-contain" />
        </button>
        <nav className="hidden md:flex gap-8">
          {links.map(({ label, href }) => (
            <button key={href} onClick={() => scrollTo(href)} className="text-white/80 hover:text-white transition text-sm uppercase tracking-wide">
              {label}
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col p-6 gap-5">
            {links.map(({ label, href }) => (
              <button key={href} onClick={() => scrollTo(href)} className="text-white/80 hover:text-white transition text-lg text-left">
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
