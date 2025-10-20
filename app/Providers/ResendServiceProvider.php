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
                    new Resend(config('services.resend.key'))
                );
            });
        });
    }
}

class ResendTransport extends AbstractTransport
{
    protected $resend;

    public function __construct(Resend $resend)
    {
        parent::__construct();
        $this->resend = $resend;
    }

    protected function doSend(SentMessage $message): void
    {
        $email = MessageConverter::toEmail($message->getOriginalMessage());
        
        $from = $email->getFrom()[0];
        $to = $email->getTo();
        
        $payload = [
            'from' => $from->getAddress(),
            'to' => [array_map(fn($addr) => $addr->getAddress(), $to)],
            'subject' => $email->getSubject(),
        ];

        if ($email->getHtmlBody()) {
            $payload['html'] = $email->getHtmlBody();
        } elseif ($email->getTextBody()) {
            $payload['text'] = $email->getTextBody();
        }

        // Resend API v0.22 - llamada directa al método send
        $this->resend->emails()->send($payload);
    }

    public function __toString(): string
    {
        return 'resend';
    }
}

