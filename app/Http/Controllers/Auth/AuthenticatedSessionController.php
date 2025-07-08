<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{

    /**
     * Display the login view.
     */
    public function create()
    {
        return Inertia::render('auth/LoginPage');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => __('The provided credentials do not match our records.'),
            ]);
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        return $this->redirectBasedOnUserType($user);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect user based on their type after login.
     */
    private function redirectBasedOnUserType(User $user)
    {
        switch ($user->user_type) {
            case 'landlord':
                return redirect()->intended('/landlord/dashboard');
            case 'tenant':
                return redirect()->intended('/tenant/dashboard');
            case 'prospective_tenant':
                return redirect()->intended('/user');
            default:
                return redirect()->intended('/');
        }
    }
}
