<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProspectiveTenant;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('auth/RegisterPage');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_contact_number' => 'required|string|max:20',
            'monthly_income' => 'nullable|numeric|min:0',
            'current_address' => 'nullable|string|max:500',
        ]);

        // Create a new prospective tenant
        $user = ProspectiveTenant::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_contact_number' => $request->user_contact_number,
            'user_type' => 'prospective_tenant',
            'monthly_income' => $request->monthly_income,
            'current_address' => $request->current_address,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/user')->with('success', 'Registration successful! You can now browse and apply for rental listings.');
    }
}
