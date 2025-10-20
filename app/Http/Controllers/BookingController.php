<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\LexBookingMail;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    
    public function send(Request $request)
    {
        // Log inicial para debugging
        Log::info('Booking request received', [
            'all_data' => $request->all(),
            'headers' => $request->headers->all()
        ]);

        $data = $request->all();

        try {
            // Validar datos básicos
            $request->validate([
                'birth_date' => 'required',
                'birth_place' => 'required',
                'birth_time' => 'required',
                'phone' => 'required',
            ]);

            Log::info('Validation passed, attempting to send email');

            // Enviar el correo usando la clase Mailable
            Mail::to('lexcorazon@gmail.com')
                ->send(new LexBookingMail($data));

            // Log para debugging
            Log::info('Booking email sent successfully', ['data' => $data]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // Log del error para debugging
            Log::error('Error sending booking email: ' . $e->getMessage(), [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'data' => $data
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
