<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
     public function index() {
        return Inertia::render('tenant/Landing');
    }

    public function listings() {
        return Inertia::render('tenant/Listings');
    }
}
