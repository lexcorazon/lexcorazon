import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/Shared/ui/Container';
import Button from '@/Shared/ui/Button';

export default function Hero({ title, subtitle, ctaHref, ctaText }) {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full blur-3xl opacity-30"
             style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}/>
        <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full blur-3xl opacity-25"
             style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-support))' }}/>
      </div>
      <Container>
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-display leading-tight">{title}</h1>
          <p className="mt-5 text-lg text-ink/75">{subtitle}</p>
          <div className="mt-8">
            <Button href={ctaHref}>{ctaText}</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
