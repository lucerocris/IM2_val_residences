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

    public function store(StoreLeaseRequest $request) {
        Lease::create($request->validated());
        return redirect()->route('leases.index')->with('success', 'Lease created successfully.');
    }

    public function destroy($id)
    {
        $lease = Lease::findOrFail($id);
        $lease->delete();

        return redirect()->back()->with('success', 'Lease deleted successfully.');
    }
}
