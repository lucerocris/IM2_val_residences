<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_date',
        'maintenance_description',
        'request_status',
        'priority_level',
        'scheduled_date',
        'completion_date',
        'tenants_remarks',
        'landlord_notes',
        'estimated_costs',
        'actual_costs'
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }

    public function units()
    {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

    public static function getLimitedMaintenanceRequestsWithUnits($limit) {
        return DB::table('maintenance_requests')
            ->join('rental_units', 'maintenance_requests.unit_id', '=', 'rental_units.id')
            ->select('maintenance_requests.id', 'rental_units.unit_number', 'maintenance_requests.request_status', 'maintenance_requests.priority_level', 'maintenance_requests.maintenance_description', 'maintenance_requests.request_date')
            ->limit($limit)
            ->get();
    }

    public static function getNumberOfMaintenanceRequests() {
        return MaintenanceRequest::all()->count();
    }
}
