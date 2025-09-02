import React from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Hero from '@/Shared/home/Hero';
import Features from '@/Shared/home/Features';

export default function AJHome() {
  return (
    <SiteLayout brand="aj">
      <Hero
        title="Alejandra Jaime"
        subtitle="Arte, marca personal y dirección creativa. Construyamos una estética con significado."
        ctaHref="/aj/portfolio"
        ctaText="Ver portfolio"
      />
      <Features items={[
        { title: 'Mentoría creativa', desc: 'Introspección, ADN de marca, diseño conceptual y visual.' },
        { title: 'Coaching astrológico', desc: 'Cartas, tránsitos y claridad aplicada a tu proceso.' },
        { title: 'Blog', desc: 'Proceso, ideas y mirada estética en construcción.' },
      ]}/>
    </SiteLayout>
  );
}
