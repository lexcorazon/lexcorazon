import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * Hook personalizado para aplicar scroll suave con Lenis.
 * Se destruye automáticamente al desmontar el componente.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Limpieza al desmontar
    return () => lenis.destroy()
  }, [])
}
