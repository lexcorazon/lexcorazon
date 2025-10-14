import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Dressed by MM', href: '#dressed' },
    { label: 'Colaboraciones', href: '#colaboraciones' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Clipping de prensa', href: '#clipping' },
  ];

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-2 w-full">
        {/* Redes sociales desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="https://www.instagram.com/lex.corazon/" target="_blank" rel="noreferrer">
            <img src="/images/icons/insta.svg" alt="Instagram" className="w-5 h-5 opacity-75 hover:opacity-100 transition transform hover:scale-110" />
          </a>
          <a href="https://www.linkedin.com/in/alejandrajaime" target="_blank" rel="noreferrer">
            <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 opacity-75 hover:opacity-100 transition transform hover:scale-110" />
          </a>
          <a href="mailto:lexcorazon@gmail.com">
            <img src="/images/icons/mail.svg" alt="Email" className="w-5 h-5 opacity-75 hover:opacity-100 transition transform hover:scale-110" />
          </a>
        </div>

        {/* Centro: Logo + Links desktop */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <button onClick={scrollToTop} className="flex items-center">
            <img src="/images/BAJ.png" alt="Alejandra Jaime" className="h-8 w-auto object-contain" />
          </button>

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
          {open ? '×' : '☰'}
        </button>

        {/* Logo desktop */}
        <div className="hidden lg:block mr-4">
          <Link href="/lex">
            <img src="/images/lex-corazon.png" alt="Lex Corazón" className="h-20 w-20 object-contain cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Menú desplegable mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 border-t border-white/10 w-full"
          >
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

              {/* Redes sociales mobile */}
              <div className="flex gap-6 mt-6">
                <a href="https://www.instagram.com/lex.corazon/" target="_blank" rel="noreferrer">
                  <img src="/images/icons/insta.svg" alt="Instagram" className="w-6 h-6 opacity-80 hover:opacity-100 transition transform hover:scale-110" />
                </a>
                <a href="https://www.linkedin.com/in/alejandrajaime" target="_blank" rel="noreferrer">
                  <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 opacity-80 hover:opacity-100 transition transform hover:scale-110" />
                </a>
                <a href="mailto:lexcorazon@gmail.com">
                  <img src="/images/icons/mail.svg" alt="Email" className="w-6 h-6 opacity-80 hover:opacity-100 transition transform hover:scale-110" />
                </a>
              </div>

              {/* Logo mobile centrado */}
              <div className="mt-6">
                <Link href="/lex">
                  <img src="/images/lex-corazon.png" alt="Lex Corazón" className="h-20 w-20 object-contain cursor-pointer" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        header {
          position: fixed !important; /* fuerza que se quede anclado */
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
        }

        @media (max-width: 1024px) {
          .header-socials,
          .nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
