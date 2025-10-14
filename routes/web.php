<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;
use Stripe\Stripe;
use Stripe\Checkout\Session;

/**
 * LANDING (raíz)
 */
Route::get('/', fn() => Inertia::render('Landing'))->name('landing');

/**
 * ALEJANDRA JAIME
 */
Route::prefix('aj')->group(function () {
    Route::get('/', fn() => Inertia::render('AJ/Home'))->name('aj.home');
    Route::get('/sobre-mi', fn() => Inertia::render('AJ/SobreMi'))->name('aj.sobremi');
    Route::get('/servicios', fn() => Inertia::render('AJ/Servicios'))->name('aj.servicios');
    Route::get('/portfolio', fn() => Inertia::render('AJ/Portfolio'))->name('aj.portfolio');
    Route::get('/contacto', fn() => Inertia::render('AJ/Contacto'))->name('aj.contacto');
});

/**
 * LEX CORAZÓN
 */
Route::prefix('lex')->group(function () {
    Route::get('/', fn() => Inertia::render('Lex/Home'))->name('lex.home');
    Route::get('/sobre-mi', fn() => Inertia::render('Lex/SobreMi'))->name('lex.sobremi');
    Route::get('/servicios', fn() => Inertia::render('Lex/Servicios'))->name('lex.servicios');
    Route::get('/portfolio', fn() => Inertia::render('Lex/Portfolio'))->name('lex.portfolio');
    Route::get('/contacto', fn() => Inertia::render('Lex/Contacto'))->name('lex.contacto');
    Route::get('/booking', fn() => Inertia::render('Lex/Booking'))->name('lex.booking');
    Route::get('/lex/booking', function () {return Inertia::render('Lex/BookingForm');})->name('lex.booking.form');
    Route::post('booking/send', [BookingController::class, 'send'])->name('lex.booking.send');

});



/**
 * DASHBOARD / AUTH (Breeze)
 */
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/stripe/checkout', function () {
    Stripe::setApiKey(env('STRIPE_SECRET'));

    $session = Session::create([
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

require __DIR__ . '/auth.php';
