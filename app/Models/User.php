<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;

use App\Models\Landlord;
use App\Models\Tenant;
use App\Models\ProspectiveTenant;

use App\Models\RentalUnit;
use App\Models\RentalApplication;
use App\Models\Lease;
use App\Models\MaintenanceRequest;
use App\Models\VacancySubscription;


class User extends Authenticatable implements CanResetPassword
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SingleTableInheritanceTrait;
    use HasFactory, Notifiable, CanResetPasswordTrait;
    protected $table = 'users';

    protected static $singleTableTypeField = 'user_type';
    protected static $singleTableSubclasses = [
        Landlord::class,
        Tenant::class,
        ProspectiveTenant::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_name',
        'email',
        'password',
        'user_contact_number',
        'user_type',
        'move_in_date',
        'employment_status',
        'emergency_contact',
        'tenant_occupation',
        'business_license',
        'landlord_bio',
        'monthly_income',
        'current_address',
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'move_in_date' => 'date',
        'monthly_income' => 'decimal:2',
    ];

    /**
     * Get the user's dashboard URL based on their type.
     */
    public function getDashboardUrl(): string
    {
        return match ($this->user_type) {
            'landlord' => '/landlord/dashboard',
            'tenant' => '/tenant/dashboard',
            'prospective_tenant' => '/user',
            default => '/'
        };
    }

    public function ownedUnits() {
        return $this->hasMany(RentalUnit::class, 'landlord_id');
    }

    public function appliedApplications() {
        return $this->hasMany(RentalApplication::class, 'prospective_tenant_id');
    }

    public function signedLeases() {
        return $this->hasMany(Lease::class, 'tenant_id');
    }

    public function requestedMaintenance() {
        return $this->hasMany(MaintenanceRequest::class, 'tenant_id');
    }

    public function subscribedVacancyReports() {
        return $this->hasMany(VacancySubscription::class);
    }
}


