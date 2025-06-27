<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacancySubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subscription_name',
        'property_types',
        'max_rent',
        'is_active',
        'last_notified_at',
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }
}
