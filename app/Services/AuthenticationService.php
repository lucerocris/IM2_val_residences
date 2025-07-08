<?php

namespace App\Services;
use App\Models\ProspectiveTenant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthenticationService
{

    /**
     * Validate user credentials.
     */
    public function validateCredentials(string $email, string $password): ?User
    {
        $user = User::where('email', $email)
            ->whereNotNull('password')
            ->first();

        if ($user && Hash::check($password, $user->password)) {
            return $user;
        }

        return null;
    }

    public function createProspectiveTenant(array $data): User
    {
        return ProspectiveTenant::create([
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'user_contact_number' => $data['user_contact_number'],
            'user_type' => 'prospective_tenant',
            'monthly_income' => $data['monthly_income'] ?? null,
            'current_address' => $data['current_address'] ?? null,
        ]);
    }

    public function getRedirectUrl(User $user): string
    {
        return $user->getDashboardUrl();
    }
}
