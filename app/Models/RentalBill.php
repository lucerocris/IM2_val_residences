<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class RentalBill extends Model
{
    use HasFactory;

    protected $fillable = [
        'lease_id',
        'billing_date',
        'rent_amount',
        'due_date',
        'paid_date',
        'amount_paid',
        'payment_status',
    ];

    protected $casts = [
        'billing_date' => 'date',
        'due_date' => 'date',
        'paid_date' => 'date',
    ];

    // Fix: Change to singular 'lease' since it's a belongsTo relationship
    public function lease() {
        return $this->belongsTo(Lease::class);
    }

    public static function getPaidRevenueThisMonth($startOfMonth, $endOfMonth) {
        return DB::table('rental_bills')
            ->whereIn('payment_status', ['partial', 'paid'])
            ->whereBetween('paid_date', [$startOfMonth, $endOfMonth])
            ->sum('rent_amount');
    }

    public static function getTableData() {
        return RentalBill::with([
            'lease:id,tenant_id,unit_id',           
            'lease.units:id,address,unit_number',   
            'lease.tenant:id,user_name,user_contact_number' 
        ])
        ->whereHas('lease') // Only get bills that have an associated lease
        ->get()
        ->map(function ($bill) {
            // Add null checks for safety
            if (!$bill->lease || !$bill->lease->tenant || !$bill->lease->units) {
                return null; // Skip this bill if relationships are missing
            }

            return [
                'id' => $bill->id,
                'lease' => [ // Changed from 'leases' to 'lease' to match frontend interface
                    'id' => $bill->lease->id,
                    'tenant' => [
                        'id' => $bill->lease->tenant->id,
                        'user_name' => $bill->lease->tenant->user_name,
                        'user_contact_number' => $bill->lease->tenant->user_contact_number,
                    ],
                    'units' => [
                        'id' => $bill->lease->units->id,
                        'address' => $bill->lease->units->address,
                        'unit_number' => $bill->lease->units->unit_number,
                    ]
                ],
                'billing_date' => $bill->billing_date->format('Y-m-d'),
                'due_date' => $bill->due_date->format('Y-m-d'),
                'rent_amount' => (float) $bill->rent_amount,
                'paid_date' => $bill->paid_date ? $bill->paid_date->format('Y-m-d') : null,
                'amount_paid' => (float) $bill->amount_paid,
                'payment_status' => $bill->payment_status,
            ];
        })
        ->filter() // Remove null entries
        ->values() // Re-index the array
        ->toArray();
    }
}