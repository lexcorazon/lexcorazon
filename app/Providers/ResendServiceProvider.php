<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Mail\MailManager;
use Resend;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\MessageConverter;

class ResendServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->app->afterResolving(MailManager::class, function (MailManager $mailManager) {
            $mailManager->extend('resend', function ($config) {
                return new ResendTransport(
                    Resend::client(config('services.resend.key'))
                );
            });
        });
    }
}

class ResendTransport extends AbstractTransport
{
    protected $resend;

    public function __construct($resend)
    {
        parent::__construct();
        $this->resend = $resend;
    }

    protected function doSend(SentMessage $message): void
    {
        \Illuminate\Support\Facades\Log::info('ResendTransport::doSend called');
        
        $email = MessageConverter::toEmail($message->getOriginalMessage());
        
        $from = $email->getFrom()[0];
        $to = $email->getTo();
        
        $payload = [
            'from' => $from->getAddress(),
            'to' => array_values(array_map(fn($addr) => $addr->getAddress(), $to)),
            'subject' => $email->getSubject(),
        ];

        if ($email->getHtmlBody()) {
            $payload['html'] = $email->getHtmlBody();
        } elseif ($email->getTextBody()) {
            $payload['text'] = $email->getTextBody();
        }

        \Illuminate\Support\Facades\Log::info('Resend payload prepared', [
            'from' => $payload['from'],
            'to' => $payload['to'],
            'subject' => $payload['subject'],
            'has_html' => isset($payload['html']),
            'api_key_set' => !empty(config('services.resend.key'))
        ]);

        // Resend SDK v0.22 - Correct API call using GuzzleHTTP
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->post('https://api.resend.com/emails', [
                'headers' => [
                    'Authorization' => 'Bearer ' . config('services.resend.key'),
                    'Content-Type' => 'application/json',
                ],
                'json' => $payload,
            ]);
            
            $body = json_decode($response->getBody(), true);
            $statusCode = $response->getStatusCode();
            
            \Illuminate\Support\Facades\Log::info('Resend API response', [
                'status' => $statusCode,
                'body' => $body
            ]);
            
            if ($statusCode !== 200) {
                throw new \Exception('Resend API error: ' . ($body['message'] ?? 'Unknown error'));
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Resend API exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new \Exception('Resend API error: ' . $e->getMessage());
        }
    }

    public function __toString(): string
    {
        return 'resend';
    }
}

