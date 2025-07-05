<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\RentalApplication;
use Inertia\Inertia;

class RentalApplicationController extends Controller
{
    public function index()
    {
        $applications = RentalApplication::getApplicationsData()->toArray();


        return Inertia::render('landlord/ApplicationsPage', [
            'applicationsData' => $applications,
        ]);
    }
}
