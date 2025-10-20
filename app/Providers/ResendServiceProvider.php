<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Mail\MailManager;
use Resend;

class ResendServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->afterResolving(MailManager::class, function (MailManager $mailManager) {
            $mailManager->extend('resend', function () {
                return new \Illuminate\Mail\Transport\Resend(
                    new Resend(config('services.resend.key'))
                );
            });
        });
    }

    public function boot(): void
    {
        //
    }
}

