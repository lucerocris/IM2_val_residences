<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\RentalApplication;
use App\Services\ApplicationApprovalService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class RentalApplicationController extends Controller
{
    protected $approvalService;

    public function __construct(ApplicationApprovalService $approvalService)
    {
        $this->approvalService = $approvalService;
    }

    public function index()
    {
        $applications = RentalApplication::getApplicationsData()->toArray();


        return Inertia::render('landlord/ApplicationsPage', [
            'applicationsData' => $applications,
        ]);
    }

    public function updateStatus(Request $request, RentalApplication $application)
    {
        $request->validate([
            'action' => 'required|in:approved,rejected',
            'notes' => 'nullable|string|max:1000'
        ]);

        // Ensure landlord owns the unit
        if ($application->rentalUnit->landlord_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Unauthorized to update this application']);
        }

        if ($request->action === 'approved') {
            $result = $this->approvalService->approveApplication($application, $request->notes);

            if ($result['success']) {
                return back()->with('success', 'Application approved successfully! Prospective tenant has been converted to tenant.');
            } else {
                return back()->withErrors(['error' => $result['message']]);
            }
        } else {
            // Handle rejection
            $application->update([
                'application_status' => 'rejected',
                'reviewed_date' => now(),
                'review_notes' => $request->notes,
            ]);
        }


        $applications = RentalApplication::getApplicationsData()->toArray();

        return back()->with([
            'success'          => 'Application '.$request->action.' successfully!',
            'applicationsData' => $applications,
        ]);

    }

    public function sendMessage(Request $request, RentalApplication $application)
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        // Ensure landlord owns the unit
        if ($application->rentalUnit->landlord_id !== Auth::id()) {
            return back()->withErrors(['error' => 'Unauthorized to send message to this applicant']);
        }

        // Here you would typically send an email or create a message record
        // For now, we'll just return success
        return back()->with('success', 'Message sent successfully!');
    }
}
