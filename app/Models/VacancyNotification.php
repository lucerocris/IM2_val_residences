<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacancyNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'message',
        'sent_at'
    ];

    public function vacancySubscriptions() {
        return $this->belongsTo(VacancySubscription::class, 'subscription_id');
    }

    public function rentalUnits() {
        return $this->belongsTo(RentalUnit::class, 'unit_id');
    }

}
