import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = 'AJ & LEX'

createInertiaApp({
  title: (title) => appName,

  // 👇 MUY IMPORTANTE: que el patrón incluya **.jsx**
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },

  progress: { color: '#4B5563' },
})
