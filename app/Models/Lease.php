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

    public function rentalUnits() {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public function tenants() {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function bills() {
        return $this->hasMany(RentalBill::class);
    }

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class);
    }

}
