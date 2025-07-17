<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Requests\StoreTenantRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Lease;
use App\Models\RentalBill;
use App\Models\Tenant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
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
        // Create the tenant user account
        $tenant = Tenant::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'user_contact_number' => $request->user_contact_number,
            'current_address' => $request->current_address,
            'emergency_contact' => $request->emergency_contact,
            'tenant_occupation' => $request->tenant_occupation,
            'employment_status' => $request->employment_status,
            'monthly_income' => $request->monthly_income,
            'move_in_date' => $request->move_in_date,
            'user_type' => 'tenant',
            'password' => Hash::make(Str::random(32)), // Random secure password
        ]);


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

    // Resend password setup email
    public function resendSetupEmail($id)
    {
        $tenant = User::where('user_type', 'tenant')->findOrFail($id);

        $status = Password::sendResetLink(['email' => $tenant->email]);

        if ($status == Password::RESET_LINK_SENT) {
            return redirect()->back()->with('success', 'Password setup email has been resent to ' . $tenant->email);
        } else {
            return redirect()->back()->with('error', 'Failed to send password setup email. Please try again.');
        }
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
