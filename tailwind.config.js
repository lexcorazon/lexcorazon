import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Fraunces', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        ink: 'var(--color-fg)',
        paper: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        support: 'var(--color-support)',
        highlight: 'var(--color-highlight)',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(15,17,21,0.15)',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { '2xl': '72rem' },
      },
    },
  },
  plugins: [forms, typography],
}
