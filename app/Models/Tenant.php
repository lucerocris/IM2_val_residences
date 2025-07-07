<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class Tenant extends User
{
    protected static $singleTableType = 'tenant';

    // Add Tenant-specific methods and relationships here
    public function leases()
    {
        return $this->hasMany(Lease::class, 'tenant_id');
    }

    public function maintenanceRequests()
    {
        return $this->hasMany(MaintenanceRequest::class, 'tenant_id');
    }

    public function currentLease()
    {
        return $this->hasOne(Lease::class)->where('lease_status', 'active');
    }

    public static function getNumberOfActiveTenants()
    {
        return DB::table('users')
            ->where('user_type', '=', 'tenant')
            ->join('leases', 'users.id', '=', 'leases.tenant_id')
            ->where('leases.lease_status', '=', 'active')
            ->get()->count();
    }

    public static function getTableData()
    {
        return Tenant::with(['leases:id,unit_id', 'currentLease.units:id,address,unit_number'])->withCount(['leases as total_leases', 'maintenanceRequests'])->get();
    }

    public static function getTenantInfo()
    {
        return DB::table('users')->where('user_type', '=', 'tenant')->select('id', 'user_name', 'email')->get();
    }

}
