<?php

namespace App\Services;

use App\Models\User;
use App\Models\Lease;
use Illuminate\Http\UploadedFile;


class TenantOnboardingService
{
    /**
     * Create a new class instance.
     */

    /**
     * @param User $tenant
     * @return Lease|null
     * this function gets the user that has a pending lease and needs an onboarding
     */
    public function getPendingOnboardingLease(User $tenant): ?Lease
    {
        return Lease::where('tenant_id', $tenant->id)->where('lease_status', 'pending')->where(function ($query) {
            $query->where('onboarding_fees_paid', false)
                ->orWhere('onboarding_signed_lease_uploaded', false)
                ->orWhere('onboarding_id_uploaded', false);
        })->first();

    }

    public function markFeesAsPaid(Lease $lease, float $amount, UploadedFile $proofOfPayment): bool
    {
        // Store the proof of payment image
        $proofPath = $proofOfPayment->store('payment_proofs', 'public');

        $lease->update([
            'onboarding_fees_paid' => true,
            'onboarding_fees_paid_at' => now(),
            'onboarding_fees_amount' => $amount,
            'onboarding_payment_proof_path' => $proofPath,
        ]);

        return $lease->activateLeaseIfOnboardingComplete();
    }

    public function markSignedLeaseAsUploaded(Lease $lease, UploadedFile $signedLease): bool
    {
        $leasePath = $signedLease->store('signed_leases', 'public');

        $lease->update([
            'onboarding_signed_lease_uploaded' => true,
            'onboarding_signed_lease_uploaded_at' => now(),
            'onboarding_signed_lease_path' => $leasePath,
        ]);

        return $lease->activateLeaseIfOnboardingComplete();
    }

    public function markIdAsUploaded(Lease $lease, UploadedFile $idDocument): bool
    {
        $idPath = $idDocument->store('tenant_ids', 'public');

        $lease->update([
            'onboarding_id_uploaded' => true,
            'onboarding_id_uploaded_at' => now(),
            'onboarding_id_document_path' => $idPath,
        ]);

        return $lease->activateLeaseIfOnboardingComplete();
    }

    public function requiresOnboarding(User $tenant): bool
    {
        return $this->getPendingOnboardingLease($tenant) !== null;
    }
}
