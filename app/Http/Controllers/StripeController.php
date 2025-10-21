<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Stripe\Checkout\Session as StripeCheckoutSession;
use Stripe\Stripe as StripeSDK;

class StripeController extends Controller
{
    public function publicKey(Request $request): JsonResponse
    {
        $key = config('services.stripe.key');
        return response()->json([
            'key' => $key ?? '',
            'configured' => (bool) $key,
        ]);
    }

    public function health(Request $request): JsonResponse
    {
        $hasSecret = (bool) config('services.stripe.secret');
        $hasKey = (bool) config('services.stripe.key');
        return response()->json([
            'stripeSecretConfigured' => $hasSecret,
            'stripeKeyConfigured' => $hasKey,
        ]);
    }

    public function checkout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'sessionTitle' => 'required|string',
            'packType' => 'nullable|string', // 'introspectivas' o 'construccion' para packs
        ]);

        try {
            StripeSDK::setApiKey(config('services.stripe.secret'));

            $origin = $request->getSchemeAndHttpHost();
            $sessionTitle = $validated['sessionTitle'];
            $packType = $validated['packType'] ?? null;

            // Mapear título de sesión a Price ID de Stripe desde variables de entorno
            $priceId = $this->getPriceIdForSession($sessionTitle, $packType);

            if (!$priceId) {
                return response()->json(['error' => 'No se encontró el precio configurado para esta sesión'], 422);
            }

            $session = StripeCheckoutSession::create([
                'mode' => 'payment',
                'line_items' => [[
                    'price' => $priceId,
                    'quantity' => 1,
                ]],
                'success_url' => $origin.'/lex?payment=success'
                    .'&session='.rawurlencode($sessionTitle)
                    .'&session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $origin.'/lex?payment=cancelled',
            ]);

            return response()->json([
                'sessionId' => $session->id,
                'url' => $session->url,
                'publicKey' => config('services.stripe.key') ?? '',
            ]);
        } catch (\Throwable $e) {
            Log::error('Stripe checkout error', ['message' => $e->getMessage()]);
            $message = config('app.debug') ? $e->getMessage() : 'No se pudo crear la sesión de pago';
            return response()->json(['error' => $message], 500);
        }
    }

    /**
     * Obtiene el Price ID de Stripe según el título de la sesión
     */
    private function getPriceIdForSession(string $sessionTitle, ?string $packType = null): ?string
    {
        // Mapa de sesiones a variables de entorno
        $priceMap = [
            'Carta Natal' => env('STRIPE_PRICE_CARTA_NATAL'),
            'Viaje a las tripas - Introspección' => env('STRIPE_PRICE_VIAJE_TRIPAS'),
            'Motín existencial - Talentos y propósito' => env('STRIPE_PRICE_MOTIN_EXISTENCIAL'),
            'Caja de cerillas - Desbloqueo creativo' => env('STRIPE_PRICE_CAJA_CERILLAS'),
            'Lex ID - Adn de marca' => env('STRIPE_PRICE_LEX_ID'),
            'Aesthetic Overdose - Estética y concepto' => env('STRIPE_PRICE_AESTHETIC_OVERDOSE'),
            'Carne y hueso - Creación de producto' => env('STRIPE_PRICE_CARNE_HUESO'),
        ];

        // Pack de sesiones tiene dos precios diferentes
        if ($sessionTitle === 'Pack de sesiones') {
            if ($packType === 'introspectivas') {
                return env('STRIPE_PRICE_PACK_INTROSPECTIVAS');
            } elseif ($packType === 'construccion') {
                return env('STRIPE_PRICE_PACK_CONSTRUCCION');
            }
            return null; // Requiere especificar el tipo
        }

        return $priceMap[$sessionTitle] ?? null;
    }

    public function verify(Request $request): JsonResponse
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) {
            return response()->json(['paid' => false], 400);
        }

        // Minimal client-side friendly check: requires STRIPE_SECRET in env and stripe/stripe-php installed
        try {
            StripeSDK::setApiKey(config('services.stripe.secret'));
            $session = StripeCheckoutSession::retrieve($sessionId);
            $paid = ($session && $session->payment_status === 'paid');
            return response()->json(['paid' => $paid]);
        } catch (\Throwable $e) {
            Log::warning('Stripe verify error', ['message' => $e->getMessage()]);
            return response()->json(['paid' => false], 500);
        }
    }
}


