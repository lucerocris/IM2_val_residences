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
        return Lease::where('tenant_id', $tenant->id)
            ->where(function ($query) {
                $query->where('lease_status', 'pending')
                    ->where(function ($q) {
                        $q->where('onboarding_fees_paid', false)
                            ->orWhere('onboarding_signed_lease_uploaded', false)
                            ->orWhere('onboarding_id_uploaded', false);
                    });
            })
            ->orWhere(function ($query) use ($tenant) {
                $query->where('tenant_id', $tenant->id)
                    ->where('lease_status', 'for_review');
            })
            ->first();


    }

    public function markFeesAsPaid(Lease $lease, float $amount, UploadedFile $proofOfPayment): void
    {
        // this creates a path for the proof of payment, and gets it's path
        $proofPath = $proofOfPayment->store('payment_proofs', 'public');

        $lease->update([
            'onboarding_fees_paid' => true,
            'onboarding_fees_paid_at' => now(),
            'onboarding_fees_amount' => $amount,
            'onboarding_proof_of_payment_path' => $proofPath,
        ]);
        $lease->sendLeaseForReview();
    }

    public function markSignedLeaseAsUploaded(Lease $lease, UploadedFile $signedLease): void
    {
        $leasePath = $signedLease->store('signed_leases', 'public');

        $lease->update([
            'onboarding_signed_lease_uploaded' => true,
            'onboarding_signed_lease_uploaded_at' => now(),
            'onboarding_signed_lease_path' => $leasePath,
        ]);

        $lease->sendLeaseForReview();
    }

    public function markIdAsUploaded(Lease $lease, UploadedFile $idDocument): void
    {
        $idPath = $idDocument->store('tenant_ids', 'public');

        $lease->update([
            'onboarding_id_uploaded' => true,
            'onboarding_id_uploaded_at' => now(),
            'onboarding_id_document_path' => $idPath,
        ]);

        $lease->sendLeaseForReview();
    }


    /**
    * Check if tenant can re-upload documents after rejection
    */
    public function canReuploadDocuments(User $tenant): bool
    {
        $lease = $this->getPendingOnboardingLease($tenant);
        return $lease && $lease->landlord_review_status === 'rejected';
    }

/**
 * Reset rejected documents for re-upload
 */
    public function resetRejectedDocuments(Lease $lease): bool
    {
        if ($lease->landlord_review_status === 'rejected') {
            $lease->update([
                'landlord_review_status' => 'pending',
                'landlord_review_notes' => null,
                'landlord_reviewed_at' => null,
                'landlord_reviewed_by' => null,
            ]);
            return true;
        }
        return false;
    }
}
