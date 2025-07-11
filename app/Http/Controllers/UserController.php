<?php

namespace App\Http\Controllers;

use App\Models\RentalUnit;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {

        $Listings = RentalUnit::getListingsData();


        return Inertia::render('user/Listings',[
            'ListingsData' => $Listings
        ]);
    }

    public function listings() {
        return Inertia::render('user/Listings');
    }

    public function storeApplication() {

    }
}

