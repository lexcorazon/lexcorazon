import React from 'react'
import SiteLayout from '@/Layouts/SiteLayout'
import Section from '@/Shared/ui/Section'
import { aj } from '@/data/aj'

export default function SobreMi() {
  return (
    <SiteLayout brand="aj">
      <Section title="Quién soy" kicker="Alejandra Jaime">
        <article className="prose prose-neutral max-w-none">
          {aj.bioLarga.map((p, i) => <p key={i}>{p}</p>)}
        </article>
      </Section>

      <Section title="Trayectoria" kicker="Currículum">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold">Experiencia</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {aj.cv.experiencia.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Estudios</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {aj.cv.estudios.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Premios</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {aj.cv.premios.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Clipping de prensa" kicker="Publicaciones">
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {aj.prensa.map((p, i) => (
            <li key={i}>
              <a className="block rounded-xl border border-ink/10 p-4 hover:shadow-soft hover:bg-ink/5 transition"
                 href={p.url} target="_blank" rel="noreferrer">
                {p.medio}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </SiteLayout>
  )
}
