<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lease extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'monthly_rent',
        'deposit_amount',
        'lease_term',
        'lease_status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'terminated_date' => 'date',
    ];

    public function unit() {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public function tenant() {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function rentalBills() {
        return $this->hasMany(RentalBill::class);
    }

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class);
    }

}
