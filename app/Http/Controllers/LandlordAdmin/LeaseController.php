<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeaseRequest;
use App\Models\Lease;
use App\Models\RentalApplication;
use App\Models\RentalBill;
use App\Models\RentalUnit;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class LeaseController extends Controller
{
    public function index()
    {

        $leases = Lease::getTableData()->toArray();
        $numberOfLeases = Lease::getNumberOfLeases();
        $numberOfActiveLease = Lease::getNumberOfActiveLeases();
        $numberOfPendingApplications = RentalApplication::getNumberOfPendingApplications();


        return Inertia::render('landlord/LeasesPage', [
            'leases' => $leases,
            'numberOfLeases' => $numberOfLeases,
            'numberOfActiveLease' => $numberOfActiveLease,
            'numberOfPendingApplication' => $numberOfPendingApplications,

        ]);
    }

    public function create()
    {

        $tenants = Tenant::getTenantInfo();
        $availableUnits = RentalUnit::getAvailableUnits();

        return Inertia::render('landlord/AddLeasePage', [
            'tenants' => $tenants,
            'available_units' => $availableUnits,
        ]);
    }

    public function store(StoreLeaseRequest $request)
    {
        // Create the lease
        Lease::create($request->validated());

        $tenantId = $request->input('tenant_id');
        $tenant = Tenant::find($tenantId); // or Tenant::find($tenantId)

        if ($tenant && $tenant->email) {
            $email = $tenant->email;

            $status = Password::sendResetLink(['email' => $email]);

            if ($status == Password::RESET_LINK_SENT) {
                return redirect()->route('leases.index')->with('success', 'Tenant account and Lease created successfully! A password setup email has been sent to ' . $tenant->email);
            } else {
                return redirect()->route('leases.index')->with('warning', 'Tenant account created successfully, but the password setup email could not be sent. You may need to resend it manually.');
            }
        } else {
            // Tenant not found or missing email
            return redirect()->route('leases.index')->with('success', 'Lease created successfully, but tenant not found or tenant has no email to send a password reset link.');
        }
    }
    public function edit($lease_id, $unit_id, $tenant_id)
    {
        $lease = Lease::findOrFail($lease_id);
        $tenant = Tenant::findOrFail($tenant_id);
        $unit = RentalUnit::findOrFail($unit_id);

        return Inertia::render('landlord/AddLeasePage', [
            'lease' => $lease,
            'isEditing' => true,
            'tenant' => $tenant,
            'unit' => $unit,
        ]);
    }

    public function update(StoreLeaseRequest $request, $id)
    {
        $lease = Lease::findOrFail($id);
        $lease->update($request->validated());
        return redirect()->route('leases.index')->with('success', 'Successfully edited the lease');
    }

    public function destroy($id)
    {
        $lease = Lease::findOrFail($id);
        $lease->delete();
        return redirect()->back()->with('success', 'Lease deleted successfully.');
    }
}
