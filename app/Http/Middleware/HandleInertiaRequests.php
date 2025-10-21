<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }

    /**
     * Sets the title template for the site.
     * Using %s alone prevents concatenation with app name.
     *
     * @return string
     */
    public function title(): string
    {
        return '%s';
    }

    /**
     * Override the root template to ensure clean titles
     */
    public function rootView(Request $request): string
    {
        return 'app';
    }
}
