<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use App\Notifications\TenantResetPasswordNotification;
class Tenant extends User implements CanResetPassword
{

    use CanResetPasswordTrait;

    protected static $singleTableType = 'tenant';

    protected static function booted() {
        static::addGlobalScope('tenant', function ($query) {
            $query->where('user_type', 'tenant');
        });

        static::creating(function ($model) {
            $model->user_type = 'tenant';
        });

    }




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

    public static function getSelfInfo(int $tenant_id) //Gets Tenant Info but for himself!!
    {
        return DB::table('users')->where('id', '=', $tenant_id)->select('user_name', 'email', 'user_contact_number', 'user_type', 'move_in_date', 'employment_status', 'emergency_contact', 'tenant_occupation')->get();
    }
}

