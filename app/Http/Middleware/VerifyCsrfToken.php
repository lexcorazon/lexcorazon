<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * URIs que deben excluirse de la verificación CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        'lex/booking/send',
        '/lex/booking/send',
        'http://127.0.0.1:8000/lex/booking/send',
    ];
}
