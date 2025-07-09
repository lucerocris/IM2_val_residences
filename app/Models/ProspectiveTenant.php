<?php

    namespace App\Models;

    class ProspectiveTenant extends User
    {
        protected static $singleTableType = 'prospective_tenant';


        public function rentalApplications()
        {
            return $this->hasMany(RentalApplication::class, 'prospective_tenant_id');
        }
    }
