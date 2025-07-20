<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\SoftDeletes;

    class ProspectiveTenant extends User
    {
        protected static $singleTableType = 'prospective_tenant';
        use SoftDeletes;


        public function rentalApplications()
        {
            return $this->hasMany(RentalApplication::class, 'prospective_tenant_id');
        }
    }
