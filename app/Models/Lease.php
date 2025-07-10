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
        'terms_and_conditions',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'terminated_date' => 'date',
    ];

    public function units() {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public function tenant() {
        return $this->belongsTo(User::class, 'tenant_id')->where('user_type', 'tenant');
    }

    public function rentalBills() {
        return $this->hasMany(RentalBill::class);
    }

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class);
    }

    public static function getNumberOfLeases() {
        return Lease::all()->count();
    }

    public static function getNumberOfActiveLeases() {
        return DB::table('leases')->where('lease_status', '=', 'active')->get()->count();
    }

    public static function getTableData() {
        return self::with([
            'tenant:id,user_name,email,user_contact_number',
            'units:id,address,unit_number,property_type,landlord_id',
            'units.landlord:id,user_name'
        ])
            ->withCount([
                'rentalBills as total_bills',
                'rentalBills as pending_bills' => function($query) {
                    $query->where('payment_status', 'pending');
                },
                'rentalBills as overdue_bills' => function($query) {
                    $query->where('payment_status', 'overdue');
                },
                'maintenanceRequests as maintenance_requests'
            ])
            ->get();
    }


    //Gets his Own leaes info
    /* public static function getOwnLease($userId = null) {
        $id = $userId ?? Auth::id();

        // Fix when table columns are added dab dab dab dab
        //
        //return DB::table('leases')->where('tenant_id', $id)->select('apartment', 'unitNo', 'totalFloors', 'livingArea', 'bedrooms', 'toiletBaths', 'balcony', 'parkingSpace', 'petFriendly', 'furnished', 'leaseTerm', 'rentPrice', 'deposit', 'advance', 'startDate', 'endDate', 'status')->get();
    }
    */
}
