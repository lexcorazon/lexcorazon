import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({ top: y, behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        background: '#1f1f1f',
        color: '#fff',
        borderBottom: '1px solid #333',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 32px',
          width: '100%',
        }}
      >
        {/* 🌐 Redes sociales izquierda (imágenes) */}
        <div
          className="header-socials"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <a href="https://www.instagram.com/lex.corazon/?igsh=MTcwMm5leXM2bmY3MA%3D%3D#" target="_blank" rel="noreferrer" className="icon-link">
            <img src="/images/icons/insta.svg" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/alejandrajaime" target="_blank" rel="noreferrer" className="icon-link">
            <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="social-icon" />
          </a>
          <a href="mailto:lexcorazon@gmail.com" className="icon-link">
            <img src="/images/icons/mail.svg" alt="Email" className="social-icon" />
          </a>
        </div>

        {/* 💖 Logo Lex Corazón + Navegación centrada */}
        <div
          className="center-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            flex: 1,
          }}
        >
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#hero')
            }}
          >
            <img
              src="/images/lex-corazon.png"
              alt="Lex Corazón"
              style={{
                height: 48,
                objectFit: 'contain',
                cursor: 'pointer',
              }}
            />
          </a>

          <nav
            className="nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            <button onClick={() => scrollTo('#sessions')} style={linkStyle}>
              Servicios
            </button>
            <button onClick={() => scrollTo('#reviews')} style={linkStyle}>
              Reseñas
            </button>
            <button onClick={() => scrollTo('#contact')} style={linkStyle}>
              Contacto
            </button>
          </nav>
        </div>

        {/* 📸 AJ + menú móvil */}
        <div
          className="header-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* AJ visible solo en desktop */}
          <a href="/aj" className="aj-desktop" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/images/BAJ.png"
              alt="Volver a AJ"
              style={{
                height: 25,
                objectFit: 'contain',
                cursor: 'pointer',
              }}
            />
          </a>

          {/* 🍔 Botón menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-btn"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              cursor: 'pointer',
            }}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {/* 🌙 Menú desplegable móvil */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '50px 0',
            borderTop: '1px solid #333',
          }}
        >
          <button onClick={() => scrollTo('#sessions')} style={mobileLinkStyle}>
            Servicios
          </button>
          <button onClick={() => scrollTo('#reviews')} style={mobileLinkStyle}>
            Reseñas
          </button>
          <button onClick={() => scrollTo('#contact')} style={mobileLinkStyle}>
            Contacto
          </button>

          {/* Redes sociales (imágenes) dentro del menú móvil */}
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            <a href="https://www.instagram.com/lex.corazon/?igsh=MTcwMm5leXM2bmY3MA%3D%3D#" target="_blank" rel="noreferrer" className="icon-link">
              <img src="/images/icons/insta.svg" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/alejandra-jaime-mendoza-1b761b1a9/" target="_blank" rel="noreferrer" className="icon-link">
              <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="social-icon" />
            </a>
            <a href="mailto:lexcorazon@gmail.com" className="icon-link">
              <img src="/images/icons/mail.svg" alt="Email" className="social-icon" />
            </a>
          </div>

          {/* AJ dentro del menú móvil */}
          <div style={{ marginTop: 28 }}>
            <a href="/aj" onClick={() => setMenuOpen(false)}>
              <img
                src="/images/BAJ.png"
                alt="Volver a AJ"
                style={{
                  height: 40,
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </a>
          </div>
        </motion.div>
      )}

      {/* 🎨 Estilos + animaciones */}
      <style>{`
        .social-icon {
          width: 22px;
          height: 22px;
          opacity: 0.75;
          transition: transform 0.25s ease, opacity 0.25s ease, filter 0.25s ease;
        }

        .icon-link:hover .social-icon {
          opacity: 1;
          transform: scale(1.2);
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.4));
        }

        @media (max-width: 1024px) {
          .header-socials,
          .nav-links,
          .aj-desktop {
            display: none !important;
          }
          .menu-btn {
            display: block !important;
          }
          .center-nav {
            justify-content: center !important;
          }
          header img[alt="Lex Corazón"] {
            height: 60px !important;
          }
        }

        @media (max-width: 600px) {
          header img[alt="Lex Corazón"] {
            height: 68px !important;
          }
          header {
            padding: 10px 16px !important;
          }
        }
      `}</style>
    </header>
  )
}

const linkStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: 500,
}

const mobileLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 20,
  fontWeight: 600,
  textTransform: 'uppercase',
}
