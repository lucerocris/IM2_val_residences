<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RentalApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'prospective_tenant_id',
        'unit_id',
        'application_date',
        'preferred_move_in_date',
        'application_status',
        'additional_notes',
        'reviewed_date',
        'review_notes',
    ];

    public function prospectiveTenant()
    {
        return $this->belongsTo(ProspectiveTenant::class, 'prospective_tenant_id');
    }

    public function rentalUnit()
    {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public static function getApplicationsData()
    {
        return RentalApplication::with(
            ['prospectiveTenant:id,user_name,email,user_contact_number,monthly_income,current_address,employment_status',
                'rentalUnit:id,address,unit_number,property_type,rent_price,availability_status,landlord_id',
            'rentalUnit.landlord:id,user_name'])->get();
    }

    public static function getNumberOfPendingApplications() {
        return DB::table('rental_applications')->where('application_status', '=', 'pending')->get()->count();
    }

    public static function getOwnApplication(int $userID)
    {
        return DB::table('rental_applications')
            ->where('prospective_tenant_id', '=', $userID)
            ->join('rental_units', 'rental_applications.unit_id', '=', 'rental_units.id')
            ->select(
                'rental_applications.id as application_id', 
                'rental_units.id as unit_id', 
                'rental_units.address', 
                'rental_units.unit_number', 
                'rental_units.rent_price', 
                'rental_units.property_type', 
                'rental_units.floor_area',
                'rental_applications.application_date',
                'rental_applications.preferred_move_in_date',
                'rental_applications.application_status',
                'rental_applications.additional_notes',
                'rental_applications.reviewed_date',
                'rental_applications.review_notes'
            )
            ->get()->toArray();
    }


}
