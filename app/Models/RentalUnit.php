<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'landlord_id',
        'address',
        'unit_number',
        'availability_status',
        'floor_area',
        'rent_price',
        'property_type',
        'description',
        'amenities',
        'unit_photos'
    ];

    protected $casts = [
        'floor_area' => 'decimal:2',
        'rent_price' => 'decimal:2',
        'amenities' => 'array',
        'unit_photos' => 'array',
    ];

    public function landlord() {
        return $this->belongsTo(Landlord::class, 'landlord_id');
    }

    public function rentalUnits() {
        return $this->hasMany(RentalUnit::class, 'unit_id');
    }

    public function vacancyNotifications() {
        return $this->hasMany(VacancyNotification::class, 'unit_id');
    }

    public function leases() {
        return $this->hasMany( Lease::class, 'unit_id');
    }

    public function currentLease() {
        return $this->hasOne(Lease::class, 'unit_id')->where('lease_status', 'active');
    }

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class, 'unit_id');
    }
}
