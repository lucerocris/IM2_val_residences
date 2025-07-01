<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lease;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantLandlordController extends Controller
{
    public function index() {

        $tenants = Tenant::with(['leases:id,unit_id', 'currentLease.units:id,address,unit_number'])->withCount(['leases as total_leases', 'maintenanceRequests'])->get();

        return Inertia::render('landlord/TenantsOverviewPage', [
            'tenants' => $tenants,
        ]);
    }



    public function applications() {
        return Inertia::render('landlord/ApplicationsPage');
    }

    public function leases() {

        $leases = Lease::with([
            'tenant:id,user_name,email,user_contact_number',
            'units:id,address,unit_number,property_type,landlord_id',
            'units.landlord:id,user_name'
        ])
            ->withCount([
                'rentalBills as total_bills',
                'rentalBills as pending_bills' => function($query) {
                    $query->where('payment_status', 'pending');
                },
                'rentalBills as overdue_bills' => function($query) {
                    $query->where('payment_status', 'overdue');
                },
                'maintenanceRequests as maintenance_requests'
            ])
            ->get();


        return Inertia::render('landlord/LeasesPage', [
            'leases' => $leases,
        ]);
    }
}
