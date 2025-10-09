<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class LexBookingController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'session_title' => 'nullable|string|max:255',
            'birth_date' => 'required|string|max:50',
            'birth_place' => 'required|string|max:255',
            'birth_time' => 'required|string|max:20',
            'time_exact' => 'boolean',
            'expectations' => 'nullable|string|max:500',
            'knows_astrology' => 'boolean',
            'life_point' => 'nullable|string|max:2000',
            'creativity' => 'nullable|string|max:2000',
        ]);

        try {
            Mail::send('emails.lex_booking', ['data' => $data], function ($message) {
                $message->to('lexcorazon@gmail.com')
                        ->subject('🪞 Nueva solicitud de sesión en Lex Corazón');
            });

            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            Log::error('Error al enviar correo de Lex Corazón: '.$e->getMessage());
            return response()->json(['ok' => false], 500);
        }
    }
}
