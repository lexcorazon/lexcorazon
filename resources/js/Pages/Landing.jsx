import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Landing() {
  return (
    <div className="min-h-dvh grid md:grid-cols-2">
      <Link href="/aj" className="relative group overflow-hidden">
        <motion.div initial={{scale:1.05, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.6}}
          className="absolute inset-0" style={{background:'linear-gradient(135deg,#F06543,#FF69EB)'}}/>
        <div className="relative h-full w-full flex items-center justify-center text-white bg-black/20">
          <h2 className="text-4xl font-display drop-shadow">Alejandra Jaime</h2>
        </div>
      </Link>
      <Link href="/lex" className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-700"/>
        <div className="relative h-full w-full flex items-center justify-center text-white">
          <h2 className="text-4xl font-display">Lex Corazón</h2>
        </div>
      </Link>
    </div>
  );
}
