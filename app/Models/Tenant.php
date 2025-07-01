<?php

namespace App\Models;

class Tenant extends User
{
    protected static $singleTableType = 'tenant';

    // Add Tenant-specific methods and relationships here
    public function leases() {
        return $this->hasMany(Lease::class, 'tenant_id');
    }

    public function maintenanceRequests() {
        return $this->hasMany(MaintenanceRequest::class, 'tenant_id');
    }

    public function currentLease() {
        return $this->hasOne(Lease::class)->where('lease_status', 'active');

    }

}
