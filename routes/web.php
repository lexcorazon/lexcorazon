<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\StripeController;
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
 * STRIPE ROUTES
 */
Route::post('/stripe/checkout', [StripeController::class, 'checkout'])->name('stripe.checkout');
Route::get('/stripe/verify', [StripeController::class, 'verify'])->name('stripe.verify');
Route::get('/stripe/public-key', [StripeController::class, 'publicKey'])->name('stripe.publicKey');
Route::get('/stripe/health', [StripeController::class, 'health'])->name('stripe.health');

// Auth routes
require __DIR__ . '/auth.php';
