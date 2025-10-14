<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

/**
 * LANDING (raíz)
 */
Route::get('/', fn() => Inertia::render('Landing'))->name('landing');

/**
 * ALEJANDRA JAIME
 */
Route::prefix('aj')->group(function () {
    Route::get('/', fn() => Inertia::render('AJ/Home'))->name('aj.home');

});

/**
 * LEX CORAZÓN
 */
Route::prefix('lex')->group(function () {
    Route::get('/', fn() => Inertia::render('Lex/Home'))->name('lex.home');
    Route::post('booking/send', [BookingController::class, 'send'])->name('lex.booking.send');
});

/**
 * DASHBOARD / AUTH (Breeze)
 */
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**
 * STRIPE CHECKOUT
 */
Route::post('/stripe/checkout', function () {
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => 'Sesión Creativa Lex Corazón',
                ],
                'unit_amount' => 15000, // 150€ → 15000 céntimos
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => env('APP_URL') . '/reserva-exitosa',
        'cancel_url' => env('APP_URL') . '/reserva-cancelada',
    ]);

    return response()->json(['id' => $session->id]);
});

// Auth routes
require __DIR__ . '/auth.php';
