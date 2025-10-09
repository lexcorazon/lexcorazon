<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LexBookingMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $data;

    public function __construct(array $data) { $this->data = $data; }

    public function build()
    {
        return $this->subject('Nueva solicitud de sesión — Lex Corazón')
                    ->view('emails.lex_booking');
    }
}
