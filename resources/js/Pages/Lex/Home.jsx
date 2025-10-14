import React, { useState, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Sessions from './Components/Sessions'
import Reviews from './Components/Reviews'
import Footer from './Components/Footer'
import BookingModal from './Components/BookingModal'
import { cardVariant } from './Components/Sessions'
import { reviewsData } from './data/reviewsData'

export default function LexHome() {
  const [activeImage, setActiveImage] = useState(0)
  const [activeText, setActiveText] = useState(0)
  const heroImages = Array.from({ length: 18 }, (_, i) => `/images/lex/lex${i + 1}.jpg`)
  const [bookingOpen, setBookingOpen] = useState(false)

  // Scroll cinematográfico
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.lenis = lenis
    return () => lenis.destroy()
  }, [])

  // Abrir modal desde sesiones
  const openBookingFor = (title) => {
    setBookingOpen(true)
    window.sessionTitle = title // pasamos el título al modal
  }

  return (
    <div style={{ overflow: 'hidden', width: '100%', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: 0 }}>
        <Hero
          heroImages={heroImages}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          activeText={activeText}
          setActiveText={setActiveText}
        />

        <Sessions cardVariant={cardVariant} openBookingFor={openBookingFor} />

        <BookingModal bookingOpen={bookingOpen} setBookingOpen={setBookingOpen} />

        <Reviews reviewsData={reviewsData} />

        <Footer />
      </main>
    </div>
  )
}
