<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RentalApplication extends Model
{
    use HasFactory;

    protected $fillable = [
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


}
