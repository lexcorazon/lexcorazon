import React, { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import Lenis from '@studio-freight/lenis'
import Header from './Components/Header'
import Hero from './Components/Hero'
import SessionsOverview from './Components/SessionsOverview'
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
  const [currentSessionTitle, setCurrentSessionTitle] = useState('')
  const [paymentStatus, setPaymentStatus] = useState(null) // 'success', 'cancelled', null

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

  // Detectar estado de pago desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const payment = params.get('payment')
    
    if (payment === 'success') {
      setPaymentStatus('success')
      // Limpiar URL después de 3 segundos
      setTimeout(() => {
        window.history.replaceState({}, '', '/lex')
        setPaymentStatus(null)
      }, 5000)
    } else if (payment === 'cancelled') {
      setPaymentStatus('cancelled')
      setTimeout(() => {
        window.history.replaceState({}, '', '/lex')
        setPaymentStatus(null)
      }, 5000)
    }
  }, [])

  // Abrir modal desde sesiones
  const openBookingFor = (title) => {
    setCurrentSessionTitle(title)
    setBookingOpen(true)
  }

  return (
    <>
      <Head title="AJ & LEX" />
      <div style={{ overflow: 'hidden', width: '100%', minHeight: '100vh' }}>
        <Header />

      {/* Notificación de estado de pago */}
      {paymentStatus && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 10000,
          background: paymentStatus === 'success' ? 'linear-gradient(135deg, #7CFFB2 0%, #4ADE80 100%)' : 'linear-gradient(135deg, #FFD500 0%, #FFA500 100%)',
          color: '#000',
          padding: '20px 30px',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontWeight: 700,
          fontSize: 18,
          animation: 'slideIn 0.5s ease-out',
        }}>
          <span style={{ fontSize: 28 }}>
            {paymentStatus === 'success' ? '✅' : '⚠️'}
          </span>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 4 }}>
              {paymentStatus === 'success' ? '¡Pago Exitoso!' : 'Pago Cancelado'}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>
              {paymentStatus === 'success' 
                ? 'Recibirás un correo de confirmación pronto' 
                : 'No se realizó ningún cargo a tu tarjeta'}
            </div>
          </div>
          <button 
            onClick={() => setPaymentStatus(null)}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              color: '#000',
              fontSize: 24,
              cursor: 'pointer',
              borderRadius: 8,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10
            }}
          >×</button>
        </div>
      )}

      <main style={{ paddingTop: 0 }}>
        <Hero
          heroImages={heroImages}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          activeText={activeText}
          setActiveText={setActiveText}
        />

        <SessionsOverview />

        <Sessions cardVariant={cardVariant} openBookingFor={openBookingFor} />

        <BookingModal 
          bookingOpen={bookingOpen} 
          setBookingOpen={setBookingOpen} 
          sessionTitle={currentSessionTitle}
        />

        <Reviews reviewsData={reviewsData} />

        <Footer />
      </main>

      {/* Animación para la notificación */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      </div>
    </>
  )
}
