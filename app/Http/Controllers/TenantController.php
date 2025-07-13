<?php

namespace App\Http\Controllers;

use App\Models\RentalBill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaintenanceRequest;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;
use App\Services\TenantOnboardingService;
use App\Models\Lease;

class TenantController extends Controller
{


    public function __construct(private TenantOnboardingService $onboardingService)
    {
    }

    public function index()
    {

        $user = Auth::user();
        $pendingLease = $this->onboardingService->getPendingOnboardingLease($user);

        $leaseID = Lease::getOwnLeaseID(Auth::id());
        $maintenanceData = MaintenanceRequest::getMaintenanceRequests(Auth::id());
        $tenantData = Tenant::getSelfInfo(Auth::id());
        $leaseInfo = Lease::getOwnLeases(Auth::id());
        $rentalBill = RentalBill::getOwnBills($leaseID);




        return Inertia::render('tenant/Landing', [
            'maintenanceRequests' => $maintenanceData,
            'tenantData' => $tenantData,
            'leaseData' => $leaseInfo,
            'rentalBill' => $rentalBill,
            'onboardingLease' => $pendingLease ? [
                'id' => $pendingLease->id,
                'completion_percentage' => $pendingLease->getOnboardingCompletionPercentage(),
                'onboarding_steps' => $pendingLease->getOnboardingSteps(),
                'required_fees_amount' => $pendingLease->required_fees_amount,
                'monthly_rent' => $pendingLease->monthly_rent,
                'deposit_amount' => $pendingLease->deposit_amount,
                'pending_requirements' => $pendingLease->getPendingOnboardingRequirements(),
            ] : null,
        ]);
    }

    public function listings()
    {
        return Inertia::render('tenant/Listings');
    }

    public function gcash()
    {
        return Inertia::render('tenant/payment/Gcash');
    }

    public function paymaya()
    {
        return Inertia::render('tenant/payment/PayMaya');
    }

    public function bank()
    {
        return Inertia::render('tenant/payment/BankTransfer');
    }
}
