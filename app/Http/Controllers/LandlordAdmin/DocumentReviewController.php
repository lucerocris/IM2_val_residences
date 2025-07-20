<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Lease;

class DocumentReviewController extends Controller
{

    public function show(Lease $lease)
    {
        // Ensure landlord owns the unit
        if ($lease->units->landlord_id !== Auth::id()) {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('landlord/DocumentReviewDetail', [
            'lease' => [
                'id' => $lease->id,
                'tenant' => $lease->tenant,
                'unit' => $lease->units,
                'monthly_rent' => $lease->monthly_rent,
                'deposit_amount' => $lease->deposit_amount,
                'required_fees_amount' => $lease->required_fees_amount,
                'documents_submitted_at' => $lease->documents_submitted_at,
                'onboarding_fees_amount' => $lease->onboarding_fees_amount,
                'document_paths' => [
                    'signed_lease' => $lease->onboarding_signed_lease_path,
                    'id_document' => $lease->onboarding_id_document_path,
                    'payment_proof' => $lease->onboarding_proof_of_payment_path,
                ],
            ],
        ]);
    }

    public function approve(Request $request, Lease $lease)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);


        $success = $lease->approveAndActivateLease(Auth::id(), $request->notes);

        if ($success) {
            return redirect()->route('leases.index')->with('success', 'Documents approved and lease activated successfully!');
        } else {
            return back()->with('error', 'Failed to activate lease. Please check the documents again.');
        }
    }

    public function reject(Request $request, Lease $lease)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);



        $success = $lease->rejectDocuments(Auth::id(), $request->reason);

        if ($success) {
            return redirect()->route('leases.index')->with('success', 'Documents rejected. Tenant will be notified to re-upload.');
        } else {
            return back()->with('error', 'Failed to reject documents.');
        }
    }

    public function downloadDocument(Lease $lease, string $documentType)
    {


        $filePath = match ($documentType) {
            'signed_lease' => $lease->onboarding_signed_lease_path,
            'id_document' => $lease->onboarding_id_document_path,
            'payment_proof' => $lease->onboarding_proof_of_payment_path,
            default => null,
        };

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            abort(404, 'Document not found');
        }

        return Storage::disk('public')->download($filePath);
    }
}
