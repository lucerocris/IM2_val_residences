<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        // Define Gates for user types
        Gate::define('is-landlord', function (User $user) {
            return $user->user_type === 'landlord';
        });

        Gate::define('is-tenant', function (User $user) {
            return $user->user_type === 'tenant';
        });

        Gate::define('is-prospective-tenant', function (User $user) {
            return $user->user_type === 'prospective_tenant';
        });

        Gate::define('manage-property', function (User $user) {
            return $user->user_type === 'landlord';
        });

        Gate::define('apply-for-rental', function (User $user) {
            return $user->user_type === 'prospective_tenant';
        });

        Gate::define('access-tenant-features', function (User $user) {
            return $user->user_type === 'tenant';
        });
    }
}
