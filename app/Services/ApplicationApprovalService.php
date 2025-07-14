<?php

namespace App\Services;

use App\Models\RentalApplication;
use App\Models\User;
use App\Models\Lease;
use App\Models\RentalUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Notifications\ApplicationsStatusChanged;

class ApplicationApprovalService
{
    public function approveApplication(RentalApplication $application, string $reviewNotes = null): array
    {
        try {
            return DB::transaction(function () use ($application, $reviewNotes) {
                // 1. Update application status
                $application->update([
                    'application_status' => 'approved',
                    'reviewed_date' => now(),
                    'review_notes' => $reviewNotes,
                ]);

                $application->prospectiveTenant->notify(new ApplicationsStatusChanged($application));

                // 2. Convert prospective_tenant to tenant
                $prospectiveTenant = $application->prospectiveTenant;
                $this->convertProspectiveTenantToTenant($prospectiveTenant, $application);

                // 3. Update unit availability
                $this->updateUnitAvailability($application->rentalUnit);

                // 4. Reject other pending applications for this unit
                $rejectedApplications = $this->rejectOtherApplicationsForUnit($application->unit_id, $application->id);

                foreach ($rejectedApplications as $rejectedApp) {
                    $rejectedApp->prospectiveTenant->notify(new ApplicationsStatusChanged($rejectedApp));
                }

                // 5. Create lease record (optional - you might want to do this separately)
                $lease = $this->createLeaseRecord($application);

                // Reload the user through the Tenant model so that the correct
                // global scope (user_type = 'tenant') is applied. Using
                // ProspectiveTenant::fresh() would return null because the row
                // no longer matches the prospective_tenant scope after the
                // update above.

                $tenant = \App\Models\Tenant::find($prospectiveTenant->id);

                return [
                    'success' => true,
                    'message' => 'Application approved successfully',
                    'tenant'  => $tenant,
                    'lease'   => $lease,
                ];
            });
        } catch (\Exception $e) {
            Log::error('Application approval failed: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Failed to approve application: ' . $e->getMessage(),
            ];
        }
    }

    private function convertProspectiveTenantToTenant(User $prospectiveTenant, RentalApplication $application): void
    {
        Log::info("Converting prospective tenant {$prospectiveTenant->id} to tenant. Current user_type: {$prospectiveTenant->user_type}");

        // Update through the base User model to bypass STI restrictions
        // that might prevent changing user_type on a subclass instance
        $updated = User::withoutGlobalScopes()->where('id', $prospectiveTenant->id)->update([
            'user_type' => 'tenant',
            'move_in_date' => $application->preferred_move_in_date,
            'employment_status' => $prospectiveTenant->employment_status,
            'tenant_occupation' => $prospectiveTenant->employment_status,
            'emergency_contact' => $prospectiveTenant->emergency_contact ?? null,
        ]);

        Log::info("Update result: {$updated} row(s) affected");

        // Verify the update
        $verifyUser = User::withoutGlobalScopes()->find($prospectiveTenant->id);
        Log::info("After update - user_type: {$verifyUser->user_type}");
    }

    private function updateUnitAvailability(RentalUnit $rentalUnit): void
    {
        $rentalUnit->update([
            'availability_status' => 'occupied'
        ]);
    }

    private function rejectOtherApplicationsForUnit(int $unitId, int $approvedApplicationId): array
    {
        $applicationsToReject = RentalApplication::with('prospectiveTenant')
            ->where('unit_id', $unitId)
            ->where('id', '!=', $approvedApplicationId)
            ->where('application_status', 'pending')
            ->get();

        foreach($applicationsToReject as $application) {
            $application->update([
                'application_status' => 'rejected',
                'reviewed_date' => now(),
                'review_notes' => 'Automatically rejected - unit has been leased to another applicant',
            ]);
        }
        return $applicationsToReject->toArray();
    }

    public function rejectApplication(RentalApplication $application, string $reviewNotes = null): array
    {
        try{
            $application->update([
                'application_status' => 'rejected',
                'reviewed_date' => now(),
                'review_notes' => $reviewNotes ?? 'Application not approved at this time',
            ]);

            $application->prospectiveTenant->notify(new ApplicationsStatusChanged($application));

            return [
                'success' => true,
                'message' => 'Application rejected successfully',
            ];
        } catch (\Exception $e) {
            Log::error('Application rejection failed: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Failed to reject application: ' . $e->getMessage(),
            ];
        }
    }

    private function createLeaseRecord(RentalApplication $application): Lease
    {
        $startDate = Carbon::parse($application->preferred_move_in_date);
        $leaseTermMonths = 12; // Default 12 months, you can make this configurable

        return Lease::create([
            'tenant_id' => $application->prospective_tenant_id,
            'unit_id' => $application->unit_id,
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->addMonths($leaseTermMonths),
            'monthly_rent' => $application->rentalUnit->rent_price,
            'deposit_amount' => $application->rentalUnit->rent_price, // Typically 1 month rent
            'lease_term' => $leaseTermMonths,
            'lease_status' => 'pending', // Pending until lease is signed
        ]);
    }
}
