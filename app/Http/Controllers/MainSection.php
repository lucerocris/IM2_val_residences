<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RentalUnit;
use App\Models\Landlord;
use App\Notifications\ContactFormSubmitted;
use Illuminate\Support\Facades\Notification;


class MainSection extends Controller
{
    public function home() {
        $Listings = RentalUnit::getListingsData();
        return Inertia::render('main/landing',[
            'listingsData' => $Listings
        ]);

    }

    public function about() {
        return Inertia::render('main/AboutUs');
    }

    public function contact() {
        return Inertia::render('main/ContactUs');
    }

    public function submitContactForm(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        Notification::route('mail', 'gementizasgg08@gmail.com')
            ->notify(new ContactFormSubmitted(
                $request->name,
                $request->email,
                $request->phone ?? '',
                $request->message
            ));

        return back()->with('success', 'Thank you for your message! We will get back to you within 24 hours.');
    }
}
