<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaintenanceRequest;
use App\Models\Tenant;
use App\Models\Lease;

class TenantController extends Controller
{
    public function index() {
        $maintenanceData = MaintenanceRequest::getMaintenanceRequests();
        $selfInfo = Tenant::getSelfInfo();
       // $leaseInfo = Lease::getOwnLease();

        return Inertia::render('tenant/Landing', [
            'maintenanceRequests' => $maintenanceData,
            'tenantInfo' => $selfInfo,
        //    'leaseInfo' => $leaseInfo,
        ]);
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
