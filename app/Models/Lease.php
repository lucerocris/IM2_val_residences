<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class Lease extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'unit_id',
        'start_date',
        'end_date',
        'monthly_rent',
        'deposit_amount',
        'lease_term',
        'lease_status',
        'onboarding_fees_paid',
        'onboarding_signed_lease_uploaded',
        'onboarding_id_uploaded',
        'onboarding_fees_paid_at',
        'onboarding_signed_lease_uploaded_at',
        'onboarding_id_uploaded_at',
        'onboarding_completed_at',
        'onboarding_fees_amount',
        'onboarding_signed_lease_path',
        'onboarding_id_document_path',
        'onboarding_proof_of_payment_path',
        'required_fees_amount',
        'landlord_review_status',
        'landlord_review_notes',
        'landlord_reviewed_at',
        'landlord_reviewed_by',
        'documents_submitted_for_review',
        'documents_submitted_at',

    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'terminated_date' => 'date',
        'onboarding_fees_paid' => 'boolean',
        'onboarding_signed_lease_uploaded' => 'boolean',
        'onboarding_id_uploaded' => 'boolean',
        'onboarding_fees_paid_at' => 'datetime',
        'onboarding_signed_lease_uploaded_at' => 'datetime',
        'onboarding_id_uploaded_at' => 'datetime',
        'onboarding_completed_at' => 'datetime',
        'onboarding_fees_amount' => 'decimal:2',
        'required_fees_amount' => 'decimal:2',
        'landlord_reviewed_at' => 'datetime',
        'documents_submitted_at' => 'datetime',
        'documents_submitted_for_review' => 'boolean',
    ];

    public function units()
    {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id')->where('user_type', 'tenant');
    }

    public function rentalBills()
    {
        return $this->hasMany(RentalBill::class);
    }

    public function maintenanceRequests()
    {
        return $this->hasMany(MaintenanceRequest::class);
    }

    public static function getNumberOfLeases()
    {
        return Lease::all()->count();
    }

    public static function getNumberOfActiveLeases()
    {
        return DB::table('leases')->where('lease_status', '=', 'active')->get()->count();
    }

    /**
     * this function checks if the user requires onboarding
     * @return bool
     */
    public function requiresOnboarding(): bool
    {
        return $this->lease_status === 'pending' && !$this->isOnboardingComplete();
    }

    public function getDepositAmountAttribute($value)
    {
        return ($this->attributes['monthly_rent'] ?? 0) * 3;
    }


    public function getRequiredFeesAmountAttribute($value)
    {
        return $this->deposit_amount;
    }

    /**
     * @return bool
     * checks if the onboarding is completed
     */
    public function isOnboardingComplete(): bool
    {
        return $this->onboarding_fees_paid && $this->onboarding_signed_lease_uploaded && $this->onboarding_id_uploaded;
    }

    /**
     * @return int
     * this function returns your onboarding completeness percentage
     */
    public function getOnboardingCompletionPercentage(): int
    {
        $completed = 0;
        $completed = 0;
        if ($this->onboarding_fees_paid) $completed++;
        if ($this->onboarding_signed_lease_uploaded) $completed++;
        if ($this->onboarding_id_uploaded) $completed++;

        return round(($completed / 3) * 100);
    }

    /**
     * @return array
     * this function checks if you have missing onboarding requirements
     */
    public function getPendingOnboardingRequirements(): array
    {
        $pending = [];
        if (!$this->onboarding_fees_paid) $pending[] = 'fees';
        if (!$this->onboarding_signed_lease_uploaded) $pending[] = 'signed_lease';
        if (!$this->onboarding_id_uploaded) $pending[] = 'id_upload';

        return $pending;
    }

    public function getOnboardingSteps(): array
    {
        return [
            'fees' => [
                'completed' => $this->onboarding_fees_paid,
                'completed_at' => $this->onboarding_fees_paid_at,
                'title' => 'Pay Required Fees',
                'description' => "Pay ₱{$this->required_fees_amount} (1 month advanced, 2 months deposit) and upload proof of payment",
            ],
            'signed_lease' => [
                'completed' => $this->onboarding_signed_lease_uploaded,
                'completed_at' => $this->onboarding_signed_lease_uploaded_at,
                'title' => 'Upload Signed Lease',
                'description' => 'Upload the e-signed lease document (PDF)',
            ],
            'id_upload' => [
                'completed' => $this->onboarding_id_uploaded,
                'completed_at' => $this->onboarding_id_uploaded_at,
                'title' => 'Upload Government ID',
                'description' => 'Upload a clear photo of your valid government-issued ID',
            ],
        ];
    }


    public function sendLeaseForReview(): bool
    {
        if ($this->isOnboardingComplete() && $this->lease_status === 'pending') {
            $this->update([
                'lease_status' => 'for_review',
                'landlord_review_status' => 'pending',
                'documents_submitted_for_review' => true,
                'documents_submitted_at' => now(),
            ]);
            return true;
        }
        return false;
    }



    public static function getTableData()
    {
        return self::with([
            'tenant:id,user_name,email,user_contact_number',
            'units:id,address,unit_number,property_type,landlord_id',
            'units.landlord:id,user_name'
        ])
            ->withCount([
                'rentalBills as total_bills',
                'rentalBills as pending_bills' => function ($query) {
                    $query->where('payment_status', 'pending');
                },
                'rentalBills as overdue_bills' => function ($query) {
                    $query->where('payment_status', 'overdue');
                },
                'maintenanceRequests as maintenance_requests'
            ])
            ->get();
    }

    public static function getOwnLeases(int $tenant_id)
    {
        return self::with('units')
            ->where('tenant_id', $tenant_id)
            ->get()
            ->map(function ($lease) {
                return [
                    'id' => $lease->id,
                    'tenant_id' => $lease->tenant_id,
                    'unit_id' => $lease->unit_id,
                    'start_date' => $lease->start_date,
                    'end_date' => $lease->end_date,
                    'monthly_rent' => $lease->monthly_rent,
                    'deposit_amount' => $lease->deposit_amount,
                    'lease_term' => $lease->lease_term,
                    'lease_status' => $lease->lease_status,
                    'units' => $lease->units ? [
                        'id' => $lease->units->id,
                        'landlord_id' => $lease->units->landlord_id,
                        'address' => $lease->units->address,
                        'unit_number' => $lease->units->unit_number,
                        'availability_status' => $lease->units->availability_status,
                        'floor_area' => $lease->units->floor_area,
                        'rent_price' => $lease->units->rent_price,
                        'property_type' => $lease->units->property_type,
                        'description' => $lease->units->description,
                        'amenities' => $lease->units->amenities,
                    ] : null,
                ];
            });
    }

    public static function getOwnLeaseID(int $tenant_id)
    {
        return DB::table('leases')->where('tenant_id', $tenant_id)->value('id');
    }

    public function isReadyForLandlordReview(): bool
    {
        return $this->isOnboardingComplete() &&
                $this->lease_status === 'pending' &&
                $this->landlord_review_status === 'pending';
    }


/**
 * New method for landlord to approve and activate lease
 */
    public function approveAndActivateLease(int $landlordId, string $notes = null): bool
    {
        if ($this->isOnboardingComplete() && $this->lease_status === 'for_review') {
            $this->update([
                'lease_status' => 'active',
                'landlord_review_status' => 'approved',
                'landlord_review_notes' => $notes,
                'landlord_reviewed_at' => now(),
                'landlord_reviewed_by' => $landlordId,
                'onboarding_completed_at' => now(),
            ]);
            return true;
        }
        return false;
    }

/**
 * New method for landlord to reject documents
 */
    public function rejectDocuments(int $landlordId, string $reason): bool
    {
        $this->update([
            'landlord_review_status' => 'rejected',
            'landlord_review_notes' => $reason,
            'landlord_reviewed_at' => now(),
            'landlord_reviewed_by' => $landlordId,
        // Reset document flags so tenant can re-upload
            'onboarding_signed_lease_uploaded' => false,
            'onboarding_id_uploaded' => false,
            'documents_submitted_for_review' => false,
            'documents_submitted_at' => null,
        ]);
        return true;
    }

/**
 * Get leases pending landlord review
 */
    public static function getPendingReviewLeases(int $landlordId)
    {
        return self::with(['tenant:id,user_name,email,user_contact_number', 'units:id,address,unit_number,landlord_id'])
            ->whereHas('units', function ($query) use ($landlordId) {
                $query->where('landlord_id', $landlordId);
            })
            ->where('documents_submitted_for_review', true)
            ->where('landlord_review_status', 'pending')
            ->orderBy('documents_submitted_at', 'asc')
            ->get();
    }

    public static function getOwnUnit(int $tenant_id)
    {
        return DB::table('leases')->where('tenant_id', $tenant_id)->value('unit_id');
    }
}
