<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @php($stripeKey = config('services.stripe.key'))
        @if($stripeKey)
            <meta name="stripe-key" content="{{ $stripeKey }}">
        @endif
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Favicon personalizado --}}
    <link rel="icon" type="image/png" href="{{ asset('images/lex-corazon.png') }}">

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
