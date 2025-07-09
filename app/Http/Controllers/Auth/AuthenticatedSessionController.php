<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\AuthenticationService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class AuthenticatedSessionController extends Controller
{
    public function __construct(
        private AuthenticationService $authService
    ){}

    public function create()
    {
        return Inertia::render('authentication/LoginPage');
    }

    public function store(LoginRequest $request)
    {
        $user = $this->authService->validateCredentials(
            $request->email,
            $request->password
        );

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => __('The provided credentials do not match our records.'),
            ]);
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();


        $redirectUrl = $this->authService->getRedirectUrl($user);

        return redirect()->intended($redirectUrl);
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


}
