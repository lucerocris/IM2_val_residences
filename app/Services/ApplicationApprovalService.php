<?php

namespace App\Services;

use App\Models\RentalApplication;
use App\Models\User;
use App\Models\Lease;
use App\Models\RentalUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

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

                // 2. Convert prospective_tenant to tenant
                $prospectiveTenant = $application->prospectiveTenant;
                $this->convertProspectiveTenantToTenant($prospectiveTenant, $application);

                // 3. Update unit availability
                $this->updateUnitAvailability($application->rentalUnit);

                // 4. Reject other pending applications for this unit
                $this->rejectOtherApplicationsForUnit($application->unit_id, $application->id);

                // 5. Create lease record (optional - you might want to do this separately)
                $lease = $this->createLeaseRecord($application);

                return [
                    'success' => true,
                    'message' => 'Application approved successfully',
                    'tenant' => $prospectiveTenant->fresh(),
                    'lease' => $lease,
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
        // Update user type from prospective_tenant to tenant
        $prospectiveTenant->update([
            'user_type' => 'tenant',
            'move_in_date' => $application->preferred_move_in_date,
            // Keep prospective tenant data but add tenant-specific fields
            'employment_status' => $prospectiveTenant->employment_status,
            'tenant_occupation' => $prospectiveTenant->employment_status, // Map employment to occupation
            'emergency_contact' => $prospectiveTenant->emergency_contact ?? null,
        ]);
    }

    private function updateUnitAvailability(RentalUnit $unit): void
    {
        $unit->update([
            'availability_status' => 'occupied'
        ]);
    }

    private function rejectOtherApplicationsForUnit(int $unitId, int $approvedApplicationId): void
    {
        RentalApplication::where('unit_id', $unitId)
            ->where('id', '!=', $approvedApplicationId)
            ->where('application_status', 'pending')
            ->update([
                'application_status' => 'rejected',
                'reviewed_date' => now(),
                'review_notes' => 'Automatically rejected - unit has been leased to another applicant',
            ]);
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
            'terms_and_conditions' => $this->getDefaultLeaseTerms(),
        ]);
    }

    private function getDefaultLeaseTerms(): string
    {
        return "Standard lease terms and conditions apply. Tenant must sign lease agreement within 7 days of approval.";
    }
}
