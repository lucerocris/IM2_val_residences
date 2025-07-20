<?php

namespace App\Http\Controllers;

use App\Services\TenantOnboardingService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Lease;
use Inertia\Inertia;

class TenantOnboardingController extends Controller
{
    public function __construct(private TenantOnboardingService $onboardingService)
    {
    }

    public function show()
    {

        //gets the current pending lease via the getPendingOnboardingLease method
        $pendingLease = $this->onboardingService->getPendingOnboardingLease(Auth::user());


        //so if the $pendingLease is null that means the current tenant already completed the onboarding. if he/she already completed the onboarding, he/she is redirected to the tenant dashboard

        if (!$pendingLease) {
            return redirect()->route('tenant.dashboard');
        }


        return Inertia::render('tenant/Onboarding', [
            'lease' => [
                'id' => $pendingLease->id,
                'completion_percentage' => $pendingLease->getOnboardingCompletionPercentage(),
                'onboarding_steps' => $pendingLease->getOnboardingSteps(),
                'required_fees_amount' => $pendingLease->required_fees_amount,
                'monthly_rent' => $pendingLease->monthly_rent,
                'deposit_amount' => $pendingLease->deposit_amount,

            ],
        ]);
    }

    public function confirmPayment(Request $request)
    {

        // this gets the request and ensures that the request sent meets these requirements
        $request->validate([
            'payment_amount' => 'required|numeric|min:0',
            'proof_of_payment' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240',
            'lease_id' => 'required|exists:leases,id',
        ]);

        //this finds the lease by the provided 'lease_id' from the request
        $lease = Lease::findOrFail($request->lease_id);


        //this is an authorization check, this checks if the currently logged in tenant, matches with the associated lease
        if ($lease->tenant_id !== Auth::id()) {
            abort(403, 'Unauthorized access to lease');
        }

        $this->onboardingService->markFeesAsPaid(
            $lease,
            $request->payment_amount,
            $request->file('proof_of_payment'));

        return back()->with('success', 'Payment and proof of payment uploaded successfully!');


    }

    public function uploadSignedLease(Request $request)
    {
        $request->validate([
            'signed_lease' => 'required|file|mimes:pdf|max:10240',
            'lease_id' => 'required|exists:leases,id',
        ]);

        $lease = Lease::findOrFail($request->lease_id);

        if ($lease->tenant_id !== Auth::id()) {

            abort(403, 'Unauthorized access to lease');
        }


        $this->onboardingService->markSignedLeaseAsUploaded($lease, $request->file('signed_lease'));

        return back()->with('success', 'Signed lease document uploaded successfully!');
    }

    public function uploadId(Request $request)
    {
        $request->validate([
            'id_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'lease_id' => 'required|exists:leases,id',
        ]);

        $lease = Lease::findOrFail($request->lease_id);

        if ($lease->tenant_id !== Auth::id()) {
            abort(403, 'Unauthorized access to lease');
        }

        $this->onboardingService->markIdAsUploaded($lease, $request->file('id_document'));

        return back()->with('success', 'ID document uploaded successfully!');

    }

    public function downloadLease(Lease $lease)
    {
        // Authorization check
        if ($lease->tenant_id !== Auth::id()) {
            abort(403, 'Unauthorized access to lease');
        }

        // Here you would implement the lease download logic
        // For now, return a placeholder response
        return response()->json(['message' => 'Lease download functionality to be implemented']);
    }

}
