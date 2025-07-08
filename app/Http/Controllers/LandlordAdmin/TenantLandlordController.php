<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lease;
use App\Models\RentalBill;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantLandlordController extends Controller
{
    public function index() {

        $tenants = Tenant::getTableData();
        $numberOfActiveTenant = Tenant::getNumberOfActiveTenants();


        return Inertia::render('landlord/TenantsOverviewPage', [
            'numberOfActiveTenants' => $numberOfActiveTenant,
            'tenants' => $tenants,
        ]);
    }

   public function create() {
        return Inertia::render('landlord/AddTenantPage');
   }

   public function store() {
        
   }
}
