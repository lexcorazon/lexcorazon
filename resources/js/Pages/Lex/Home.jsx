import React from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Hero from '@/Shared/home/Hero';
import Features from '@/Shared/home/Features';

export default function LexHome() {
  return (
    <SiteLayout brand="lex">
      <Hero
        title="Lex Corazón"
        subtitle="Mentoría creativa y coaching astrológico con enfoque mínimo y claro."
        ctaHref="/lex/servicios"
        ctaText="Ver servicios"
      />
      <Features items={[
        { title: 'Mentoría', desc: 'Identidad conceptual y visual, producto, acompañamiento integral.' },
        { title: 'Coaching', desc: 'Lectura general, consulta astrológica.' },
        { title: 'Contacto', desc: 'Reserva una sesión y empecemos.' },
      ]}/>
    </SiteLayout>
  );
}
