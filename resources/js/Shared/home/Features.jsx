import React from 'react';
import Container from '@/Shared/ui/Container';

export default function Features({ items=[] }) {
  return (
    <section className="py-16">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-ink/10 p-6 hover:shadow-soft transition">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{it.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
