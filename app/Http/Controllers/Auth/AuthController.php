<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia

class AuthController extends Controller
{
    //
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        //Check if user exists & active
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !$user->is_active) {
            throw ValidationException::withMessages(
                [
                'email' => ['Account not found or inactive.'],
                ]
            );
        }

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $request->session()->regenerate();

        //Redirect based on user type
        return $this->redirectAfterLogin($user);
    }
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'user_type' => $request->user_type,
            'profile_data' => $this->getInitialProfileData($request->user_type),
        ]);
        Auth::login($user);

        return $this->redirectAfterLogin($user);
    }

    public function logout(Request $reqest)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }

    private function redirectAfterLogin(User $user)
    {
        return match($user->user_type){
            'tenant' => redirect()->route('tenant.dashboard'),
            'prospective-tenant' => redirect()->route('user.dashboard'),
            'landlord' => redirect()->route('landlord.dashboard'),
            default => redirect()->route('dashboard'),
        };
    }

    private function getInitialProfileData(string $userType):array
    {
        return match($userType) {
            'tenant' => [
                'lease_start_date' => null,
                'lease_end_date' => null,
                'monthly_rent' => null,
                'security_deposit' => null,
            ],
            'landlord' => [
                'properties_count' => 0,
                'business_license' => null,
                'verification_status' => 'pending',
            ],
            'prospective_tenant' => [
                'budget_min' => null,
                'budget_max' => null,
                'preferred_location' => null,
                'move_in_date' => null,
            ],
            default = [],
        };
    }
}
