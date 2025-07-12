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

    public function edit($id)
    {
        $tenant = Tenant::findOrFail($id);

        return Inertia::render('landlord/AddTenantPage', [
            'tenant' => $tenant,
            'isEditing' => true
        ]);
    }

    public function update(StoreTenantRequest $request, $id) {
        $tenant = Tenant::findOrFail($id);
        $tenant->update($request->validated());

        return redirect()->route('tenants.index')->with('success', 'Tenant updated successfully');
    }


    // Delete Tenant
    public function destroy($id)
    {
        $tenant = User::where('user_type', 'tenant')->findOrFail($id);

        $tenant->leases()->delete();
        $tenant->maintenanceRequests()->delete();

        $tenant->delete();

        return redirect()->back()->with('success', 'Tenant deleted successfully.');
    }



}
