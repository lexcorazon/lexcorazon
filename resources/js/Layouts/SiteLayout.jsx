import React from 'react';
import { ThemeProvider } from '@/theme/ThemeProvider';
import Navbar from '@/Shared/site/Navbar';
import Footer from '@/Shared/site/Footer';

export default function SiteLayout({ brand = 'aj', children }) {
  return (
    <ThemeProvider brand={brand}>
      <div className="min-h-dvh bg-paper text-ink flex flex-col">
        <Navbar brand={brand} />
        <main className="flex-1">{children}</main>
        <Footer brand={brand} />
      </div>
    </ThemeProvider>
  );
}
