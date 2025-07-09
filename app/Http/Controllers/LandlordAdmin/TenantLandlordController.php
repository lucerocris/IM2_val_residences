<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Requests\StoreTenantRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
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

   public function store(StoreTenantRequest $request) {
        Tenant::create($request->validated());
        return redirect()->route('tenants.index')->with('success', 'Tenant added successfully');
    }


    // Delete Tenant
    public function destroy($id)
    {
        $tenant = User::where('role', 'tenant')->findOrFail($id);

        //Optional: check for leases or requests before deleting
        $tenant->leases()->delete();
        $tenant->maintenanceRequests()->delete();

        $tenant->delete();

        return redirect()->back()->with('success', 'Tenant deleted successfully.');
    }



}
