<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LexBookingMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $data;

    public function __construct(array $data) 
    { 
        $this->data = $data; 
    }

    public function build()
    {
        return $this->subject('💫 Nueva reserva en Lex Corazón')
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->view('lex_booking')
                    ->with($this->data); // Pasar los datos a la vista
    }
}
