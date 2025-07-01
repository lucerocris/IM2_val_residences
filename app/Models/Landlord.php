<?php

namespace App\Models;

class Landlord extends User
{
    protected static $singleTableType = 'landlord';

    // Add Landlord-specific methods and relationships here

    public function landlord() {
        $this->hasMany(RentalUnit::class, 'landlord_id');
    }
}
