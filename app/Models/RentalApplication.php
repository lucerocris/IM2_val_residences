<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_date',
        'preffered_move_in_date',
        'application_status',
        'additional_notes',
        'reviewed_date',
        'review_notes',
    ];

    public function prospectiveTenants()
    {
        return $this->belongsTo(User::class, 'prospective_tenant_id');
    }

    public function rentalUnits()
    {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }


}
