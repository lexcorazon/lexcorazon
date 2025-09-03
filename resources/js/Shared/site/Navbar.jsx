import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar({ brand }) {
  const { url } = usePage();
  const NavLink = ({ to, children }) => {
    const active = url === to || url === to.replace(/\/$/, '');
    return (
      <Link href={to} className={`px-3 py-2 rounded-xl ${active ? 'bg-primary text-white' : 'text-ink/80 hover:bg-ink/5'}`}>
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 backdrop-blur bg-paper/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href={`/${brand}`} className="font-display text-xl">
          {brand === 'lex' ? <>Lex <span className="text-primary">Corazón</span></> : <>Alejandra <span className="text-primary">Jaime</span></>}
        </Link>
        <nav className="hidden md:flex gap-2">
          <NavLink to={`/${brand}/sobre-mi`}>Sobre mí</NavLink>
          <NavLink to={`/${brand}/portfolio`}>Portfolio</NavLink>
        </nav>
      </div>
    </header>
  );
}
