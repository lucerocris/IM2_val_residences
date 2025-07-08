<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthenticationService;
use Illuminate\Auth\Events\Registered;


class RegisteredUserController extends Controller
{

    public function __construct(
        private AuthenticationService $authService
    ) {}


    public function create() {
        return Inertia::render('Auth/RegisterPage');
    }

    public function store(RegisterRequest $request) {
        $user = $this->authService->createProspectiveTenant($request->validated());



        event(new Registered($user));

        Auth::login($user);

        return redirect('/user')->with('success', 'Registration successful! You can now browse and apply for rental listings.');
    }
}
