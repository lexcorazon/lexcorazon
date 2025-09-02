import Container from './Container';
export default function Section({ title, kicker, children, className='' }) {
  return (
    <section className={`py-16 ${className}`}>
      <Container>
        {kicker && <p className="text-sm tracking-widest text-ink/60 uppercase">{kicker}</p>}
        {title && <h2 className="mt-2 text-3xl md:text-4xl font-display">{title}</h2>}
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
