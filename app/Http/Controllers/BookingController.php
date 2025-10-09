<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->all();

        try {
            Mail::send('lex_booking', $data, function ($message) {
                $message->to('lexcorazon@gmail.com')
                        ->from(config('mail.from.address'), 'Lex Corazón')
                        ->subject('💫 Nueva reserva en Lex Corazón');
            });

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
