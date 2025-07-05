<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lease;
use Inertia\Inertia;

class LeaseController extends Controller
{
    public function index() {

        $leases = Lease::getTableData()->toArray();


        return Inertia::render('landlord/LeasesPage', [
            'leases' => $leases,
        ]);
    }

    public function create() {
        return Inertia::render('landlord/AddLeasePage');
    }
}
