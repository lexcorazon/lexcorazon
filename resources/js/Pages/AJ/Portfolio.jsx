import React, { useMemo, useState } from 'react'
import SiteLayout from '@/Layouts/SiteLayout'
import Section from '@/Shared/ui/Section'
import { aj } from '@/data/aj'

function ProjectCard({ p }) {
  return (
    <article className="rounded-2xl border border-ink/10 p-5 hover:shadow-soft transition">
      <h3 className="font-semibold">{p.titulo}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{p.categoria}</p>
      {p.descripcion && <p className="mt-2 text-sm text-ink/70">{p.descripcion}</p>}
      {p.copy && (
        <details className="mt-3">
          <summary className="text-sm cursor-pointer text-ink/80">Leer más</summary>
          <p className="mt-2 text-sm text-ink/70">{p.copy}</p>
        </details>
      )}
    </article>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const categories = useMemo(() => ['all', ...aj.portfolioCategorias.map(c => c.key)], [])
  const items = aj.proyectos.filter(p => filter === 'all' ? true : p.categoria === filter)

  return (
    <SiteLayout brand="aj">
      <Section title="Portfolio">
        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl border ${
                filter === c ? 'bg-primary text-white border-primary' : 'border-ink/15 text-ink/80 hover:bg-ink/5'
              }`}
            >
              {c === 'all' ? 'Todo' : aj.portfolioCategorias.find(x => x.key === c)?.label || c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </Section>
    </SiteLayout>
  )
}
