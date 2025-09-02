import React from 'react';
import Container from '@/Shared/ui/Container';

export default function Footer({ brand }) {
  return (
    <footer className="border-t border-ink/5">
      <Container className="py-10 grid gap-6 sm:grid-cols-3">
        <div>
          <h4 className="font-display text-lg">{brand==='lex' ? 'Lex Corazón' : 'Alejandra Jaime'}</h4>
          <p className="text-sm text-ink/70 mt-2">
            {brand==='lex' ? 'Mentoría & Coaching' : 'Arte · Marca Personal · Portfolio'}
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Enlaces</h5>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href={`/${brand}/sobre-mi`} className="hover:underline">Sobre mí</a></li>
            <li><a href={`/${brand}/servicios`} className="hover:underline">Servicios</a></li>
            <li><a href={`/${brand}/portfolio`} className="hover:underline">Portfolio</a></li>
            <li><a href={`/${brand}/contacto`} className="hover:underline">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Contacto</h5>
          <p className="text-sm mt-2">info@alejandrajaime.es</p>
        </div>
      </Container>
      <div className="text-center text-xs text-ink/60 py-4">
        © {new Date().getFullYear()} alejandrajaime.es
      </div>
    </footer>
  );
}
