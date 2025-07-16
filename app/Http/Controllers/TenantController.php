<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestMaintenanceRequest;
use App\Models\RentalBill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaintenanceRequest;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;
use App\Services\TenantOnboardingService;
use App\Models\Lease;
use App\Models\RentalUnit;

class TenantController extends Controller
{


    public function __construct(private TenantOnboardingService $onboardingService) {}

    public function index()
    {

        $user = Auth::user();
        $userInfo = Tenant::getSelfInfo(Auth::id());
        $unitID = Lease::getOwnUnit(Auth::id());
        $tenantID = Auth::id();
        $pendingLease = $this->onboardingService->getPendingOnboardingLease($user);
        $leaseID = Lease::getOwnLeaseID($tenantID);
        $maintenanceData = MaintenanceRequest::getMaintenanceRequests(Auth::id());
        $tenantData = Tenant::getSelfInfo(Auth::id());
        $leaseInfo = Lease::getOwnLeases(Auth::id());
        $rentalBill = RentalBill::getOwnBills($leaseID);



        return Inertia::render('tenant/Landing', [

            'maintenanceRequests' => $maintenanceData,
            'tenantData' => $tenantData,
            'userInfo' => $userInfo,
            'leaseData' => $leaseInfo,
            'rentalBill' => $rentalBill,
            'leaseID' => $leaseID,
            'tenantID' => $tenantID,
            'unitID' => $unitID,
            'onboardingLease' => $pendingLease ? [
                'id' => $pendingLease->id,
                'status' => $pendingLease->getOnboardingStatus(),
                'completion_percentage' => $pendingLease->getOnboardingCompletionPercentage(),
                'onboarding_steps' => $pendingLease->getOnboardingSteps(),
                'required_fees_amount' => $pendingLease->required_fees_amount,
                'monthly_rent' => $pendingLease->monthly_rent,
                'deposit_amount' => $pendingLease->deposit_amount,
                'pending_requirements' => $pendingLease->getPendingOnboardingRequirements(),
                'landlord_review_status' => $pendingLease->landlord_review_status,
                'landlord_review_notes' => $pendingLease->landlord_review_notes,
            ] : null,
        ]);
    }

    public function storeMaintenance(RequestMaintenanceRequest $request)
    {
        MaintenanceRequest::create($request->validated());
        return redirect()->route('tenant.dashboard')->with('success', 'Request added successfully');
    }

    public function listings()
    {
        $ListingsData = RentalUnit::getListingsData();
        $userInfo = Tenant::getSelfInfo(Auth::id());
        return Inertia::render('tenant/Listings', [
            'listingsData' => $ListingsData,
            'userInfo' => $userInfo,

        ]);
    }

    public function gcash(Request $request)
    {
        $amount = $request->query('amount', 0); // Default to 0 if no amount provided
        $leaseID = $request->query('leaseid', 0);

        return Inertia::render('tenant/payment/Gcash', [
            'paymentData' => [
                'amount' => $amount,
                'leaseid' => $leaseID,
            ]
        ]);
    }

    public function bank(Request $request)
    {
        $amount = $request->query('amount', 0);
        $leaseID = $request->query('leaseid', 0);
        return Inertia::render('tenant/payment/BankTransfer', [
            'paymentData' => [
                'amount' => $amount,
                'leaseid' => $leaseID,
            ]
        ]);
    }

    public function storeGcashPayments(Request $request)
    {
        $validated = $request->validate([
            'lease_id' => 'required|numeric|exists:leases,id',
            'reference_number' => 'required|string',
            'amount_paid' => 'required|numeric|min:0',
            'proof_of_payment' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'paid_date' => 'required|date',
            'payment_status' => 'required|string|in:paid,overdue,partial,pending'
        ]);

        $lease = Lease::findOrFail($validated['lease_id']);

        $proofOfPaymentPath = $request->file('proof_of_payment')->store('proof_of_payment', 'public');

        $payment = RentalBill::create([
            'lease_id' => $validated['lease_id'],
            'billing_date' => now()->toDateString(),
            'rent_amount' => $lease->monthly_rent,
            'proof_of_payment_path' => $proofOfPaymentPath,
            'reference_number' => $validated['reference_number'],
            'due_date' => now()->addDays(30)->toDateString(),
            'paid_date' => $validated['paid_date'],
            'amount_paid' => $validated['amount_paid'],
            'payment_status' => $validated['payment_status'],
        ]);

        return redirect()->route('tenant.dashboard')->with('success', 'Payment sent successfully');
    }
}
