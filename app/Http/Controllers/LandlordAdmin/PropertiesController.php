<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PropertiesController extends Controller
{
    public function index() {
        return Inertia::render('landlord/PropertiesOverviewPage');
    }

    public function create() {
        return Inertia::render('landlord/AddPropertyPage');
    }
}
