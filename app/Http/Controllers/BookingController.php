<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function send(Request $request)
    {
        try {
            $data = $request->all();

            // Enviar correo
            Mail::send([], [], function ($message) use ($data) {
                $message->to('lexcorazon@gmail.com')
                    ->subject('🪐 Nueva reserva Lex Corazón')
                    ->html("
                        <h2>Nueva solicitud de sesión</h2>
                        <p><strong>Sesión:</strong> {$data['session_title']}</p>
                        <p><strong>Fecha de nacimiento:</strong> {$data['birth_date']}</p>
                        <p><strong>Lugar de nacimiento:</strong> {$data['birth_place']}</p>
                        <p><strong>Hora de nacimiento:</strong> {$data['birth_time']} (exacta: " . ($data['time_exact'] ? 'sí' : 'no') . ")</p>
                        <p><strong>Expectativas:</strong> {$data['expectations']}</p>
                        <p><strong>¿Conoce astrología?:</strong> " . ($data['knows_astrology'] ? 'Sí' : 'No') . "</p>
                        <p><strong>Punto vital:</strong> {$data['life_point']}</p>
                        <p><strong>Creatividad:</strong> {$data['creativity']}</p>
                    ");
            });

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error al enviar el correo: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
