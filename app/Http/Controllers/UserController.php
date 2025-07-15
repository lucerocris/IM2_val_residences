<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserApplicationRequest;
use App\Models\RentalApplication;
use App\Models\RentalUnit;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {

        $Listings = RentalUnit::getListingsData();

        return Inertia::render('user/Landing',[
            'ListingsData' => $Listings
        ]);
    }

    public function storeApplication(StoreUserApplicationRequest $request) {

        RentalApplication::create($request->validated());
        return redirect()->back()->with('success', 'User Application added successfully');
    }

    public function applications() {
        $Applications = RentalApplication::getOwnApplication(Auth::id());
        dd(Auth::id());
        return Inertia::render('user/Applications', [
            'ApplicationData' => $Applications,
        ]);
    }

}
