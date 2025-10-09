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
            'priceId' => 'nullable|string',
            'sessionId' => 'nullable|string',
            'sessionTitle' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        try {
            StripeSDK::setApiKey(config('services.stripe.secret'));

            $origin = $request->getSchemeAndHttpHost();
            $sessionIdParam = $validated['sessionId'] ?? '';
            $sessionTitleParam = $validated['sessionTitle'] ?? '';
            $categoryParam = $validated['category'] ?? '';

            // Resolve price: prefer secure server-side mapping by sessionId; fallback to passed priceId
            $resolvedPrice = null;
            $sid = $validated['sessionId'] ?? '';
            if ($sid) {
                $mapEnvKey = 'STRIPE_PRICE_'.strtoupper(str_replace(['-', ' '], ['_', '_'], $sid));
                $resolvedPrice = env($mapEnvKey);
            }
            if (!$resolvedPrice) {
                $resolvedPrice = $validated['priceId'] ?? null;
            }
            if (!$resolvedPrice) {
                return response()->json(['error' => 'Missing Stripe price for this session'], 422);
            }

            $session = StripeCheckoutSession::create([
                'mode' => 'payment',
                'line_items' => [[
                    'price' => $resolvedPrice,
                    'quantity' => 1,
                ]],
                'success_url' => $origin.'/lex/booking?success=true'
                    .'&sessionId='.rawurlencode($sessionIdParam)
                    .'&session='.rawurlencode($sessionTitleParam)
                    .'&category='.rawurlencode($categoryParam)
                    .'&session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $origin.'/lex/booking?canceled=true',
            ]);

            return response()->json([
                'id' => $session->id,
                'publicKey' => config('services.stripe.key') ?? '',
            ]);
        } catch (\Throwable $e) {
            Log::error('Stripe checkout error', ['message' => $e->getMessage()]);
            $message = config('app.debug') ? $e->getMessage() : 'Unable to create checkout session';
            return response()->json(['error' => $message], 500);
        }
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


