import React from 'react'
import SiteLayout from '@/Layouts/SiteLayout'
import Hero from '@/Shared/home/Hero'
import Features from '@/Shared/home/Features'
import { aj } from '@/data/aj'

export default function AJHome() {
  return (
    <SiteLayout brand="aj">
      <Hero
        title="Alejandra Jaime"
        subtitle={aj.bioCorta}
        ctaHref="/aj/portfolio"
        ctaText="Ver portfolio"
      />
      <Features
        items={[
          { title: 'Mentoría creativa', desc: aj.servicios[0].subtitulo },
          { title: 'Coaching astrológico', desc: aj.servicios[1].subtitulo },
          { title: 'Prensa & trayectoria', desc: 'Selección de publicaciones y premios' },
        ]}
      />
    </SiteLayout>
  )
}
