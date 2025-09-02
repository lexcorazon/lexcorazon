<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- Rutas de Ziggy --}}
    @routes

    {{-- Vite + React + Inertia --}}
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])

    {{-- Head dinámico de Inertia (títulos/meta) --}}
    @inertiaHead
  </head>
  <body class="font-sans antialiased bg-paper text-ink">
    @inertia
  </body>
</html>
