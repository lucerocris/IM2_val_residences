<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\RentalUnit;


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


}
