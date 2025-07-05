<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function applications() {
        return $this->hasMany(RentalApplication::class, 'unit_id');
    }

    public static function getNumberOfAvailableUnits() {
        return DB::table('rental_units')
            ->where('availability_status', '=', 'available')
            ->get()->count();
    }

    public static function getNumberOfOccupiedUnits() {
        return DB::table('rental_units')
            ->where('availability_status', '=', 'occupied')
            ->get()->count();
    }

    public static function getDataForTable() {
        return RentalUnit::with(['landlord:id,user_name,email,user_contact_number'])->get()->map(function ($unit) {
            return [
                'id' => $unit->id,
                'landlord_id' => $unit->landlord_id,
                'landlord' => [
                    'id' => $unit->landlord->id,
                    'user_name' => $unit->landlord->user_name,
                    'email' => $unit->landlord->email,
                    'user_contact_number' => $unit->landlord->user_contact_number,
                ],
                'address' => $unit->address,
                'unit_number' => $unit->unit_number,
                'availability_status' => $unit->availability_status,
                'floor_area' => $unit->floor_area,
                'rent_price' => $unit->rent_price,
                'property_type' => $unit->property_type,
                'description' => $unit->description,
                'amenities' => $unit->amenities ? json_decode($unit->amenities) : null,
                'unit_photos' => $unit->unit_photos ? json_decode($unit->unit_photos) : null,
                'created_at' => $unit->created_at->toISOString(),
                'updated_at' => $unit->updated_at->toISOString(),
            ];
        })->toArray();
    }

    public static function getNumberOfUnits() {
        return RentalUnit::all()->count();
    }

}
