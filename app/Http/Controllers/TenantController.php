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
        $rentalBill = RentalBill::getBills($leaseID);



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
        $billID = $request->query('billid', 0);

        return Inertia::render('tenant/payment/Gcash', [
            'paymentData' => [
                'amount' => $amount,
                'leaseid' => $leaseID,
                'billid' => $billID,
            ]
        ]);
    }

    public function bank(Request $request)
    {
        $amount = $request->query('amount', 0);
        $leaseID = $request->query('leaseid', 0);
        $billID = $request->query('billid', 0); // Make sure billID is passed

        return Inertia::render('tenant/payment/BankTransfer', [
            'paymentData' => [
                'amount' => $amount,
                'leaseid' => $leaseID,
                'billid' => $billID, // Include billid in the response
            ]
        ]);
    }

    public function updateBankPayment(Request $request, $id)
    {
        $rentalBill = RentalBill::findOrFail($id);

        // Validate input
        $maxAmount = $rentalBill->amount ?? 999999; // fallback value if null

        $validated = $request->validate([
            'reference_number' => 'required|string',
            'amount_paid' => 'required|numeric|min:0|max:' . $maxAmount,
            'proof_of_payment' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'paid_date' => 'required|date',
            'notes' => 'nullable|string|max:500',
        ]);

        $proofOfPaymentPath = $request->file('proof_of_payment')->store('proof_of_payment', 'public');

        // Update payment details
        $rentalBill->update([
            'reference_number' => $validated['reference_number'],
            'amount_paid' => $validated['amount_paid'],
            'proof_of_payment_path' => $proofOfPaymentPath,
            'paid_date' => $validated['paid_date'],
            'payment_status' => 'pending_verification', // optional, if you have this field
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('tenant.dashboard')->with('success', 'Bank transfer payment sent successfully.');
    }
    public function updateGcashPayment(Request $request, $id)
    {
        $rentalBill = RentalBill::findOrFail($id);

        // Validate input
        $maxAmount = $rentalBill->amount ?? 999999; // fallback value if null

        $validated = $request->validate([
            'reference_number' => 'required|string',
            'amount_paid' => 'required|numeric|min:0|max:' . $maxAmount,
            'proof_of_payment' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'paid_date' => 'required|date',
        ]);


        $proofOfPaymentPath = $request->file('proof_of_payment')->store('proof_of_payment', 'public');

        // Update payment details
        $rentalBill->update([
            'reference_number' => $validated['reference_number'],
            'amount_paid' => $validated['amount_paid'],
            'proof_of_payment_path' => $proofOfPaymentPath,
            'paid_date' => $validated['paid_date'],
            'payment_status' => 'pending_verification', // optional, if you have this field
        ]);

        return redirect()->route('tenant.dashboard')->with('success', 'Payment sent successfully.');
    }

}
