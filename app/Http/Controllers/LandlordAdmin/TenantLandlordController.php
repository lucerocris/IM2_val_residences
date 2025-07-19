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
use Illuminate\Support\Facades\DB;

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
        // Find tenant by ID and ensure it's a tenant type
        $tenant = User::where('user_type', 'tenant')->findOrFail($id);

        // Wrap in transaction for data consistency
        DB::transaction(function () use ($tenant) {
            // Get all leases of the tenant
            $leases = $tenant->leases;

            foreach ($leases as $lease) {
                // Update lease status to terminated
                $lease->update(['lease_status' => 'terminated']);

                // Make the related unit available
                if ($lease->units) {
                    $lease->units->update(['availability_status' => 'available']);
                }
            }

            // Delete maintenance requests
            $tenant->maintenanceRequests()->delete();

            // Delete tenant
            $tenant->delete();
        });

        return redirect()->back()->with('success', 'Tenant deleted successfully and related leases updated.');
    }

}
