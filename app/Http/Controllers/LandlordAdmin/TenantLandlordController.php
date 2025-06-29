<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TenantLandlordController extends Controller
{
    public function index() {
        return Inertia::render('landlord/TenantsOverviewPage');
    }

    public function applications() {
        return Inertia::render('landlord/ApplicationsPage');
    }

    public function leases() {
        return Inertia::render('landlord/LeasesPage');
    }
}
