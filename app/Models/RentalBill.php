<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class RentalBill extends Model
{
    use HasFactory;

    protected $fillable = [
        'billing_date',
        'rent_amount',
        'due_date',
        'paid_date',
        'amount_paid',
        'payment_status',
    ];

    public function leases() {
        return $this->belongsTo(Lease::class);
    }
}
