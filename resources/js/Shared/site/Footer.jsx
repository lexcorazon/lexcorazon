import React from 'react'

export default function Footer({ brand }) {
  return (
    <footer
      style={{
        width: '100vw',
        background: '#000',
        color: '#fff',
        padding: '40px 16px',
        textAlign: 'center',
        borderTop: '1px solid #111',
      }}
    >
      <p>
        © {new Date().getFullYear()} {brand === 'lex' ? 'Lex Corazon' : 'Alejandra Jaime'} — Todos los derechos reservados
      </p>
    </footer>
  )
}
