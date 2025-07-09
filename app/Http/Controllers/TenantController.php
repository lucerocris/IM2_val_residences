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

    public function gcash() {
        return Inertia::render('tenant/payment/Gcash');
    }

    public function paymaya() {
        return Inertia::render('tenant/payment/PayMaya');
    }

    public function bank() {
        return Inertia::render('tenant/payment/BankTransfer');
    }
}
