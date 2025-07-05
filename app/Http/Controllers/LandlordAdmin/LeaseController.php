<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lease;
use Inertia\Inertia;

class LeaseController extends Controller
{
    public function index() {

        $leases = Lease::getTableData()->toArray();
        echo '<pre>';
        print_r($leases);
        echo '</pre>';

        return Inertia::render('landlord/LeasesPage', [
            'leases' => $leases,
        ]);
    }
}
