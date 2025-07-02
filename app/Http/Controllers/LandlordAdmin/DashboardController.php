<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\RentalUnit;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {

        $units = RentalUnit::all();
        $numberOfUnits = count($units);

        return Inertia::render('landlord/DashboardPage', [
            'numberOfUnits' => $numberOfUnits,
        ]);
    }

}
