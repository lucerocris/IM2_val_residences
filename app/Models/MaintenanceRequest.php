<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
