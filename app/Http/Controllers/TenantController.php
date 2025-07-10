<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaintenanceRequest;

class TenantController extends Controller
{
    public function index() {
        $maintenance = MaintenanceRequest::getMaintenanceRequests();
        return Inertia::render('tenant/Landing', ['maintenanceRequests']);
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
