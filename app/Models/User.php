<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Models\Landlord;
use App\Models\Tenant;
use App\Models\ProspectiveTenant;

use Illuminate\Support\Facades\DB;

use App\Models\RentalUnit;
use App\Models\RentalApplication;
use App\Models\Lease;
use App\Models\MaintenanceRequest;
use App\Models\VacancySubscription;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use SingleTableInheritanceTrait;
    use HasFactory, Notifiable;
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

    public static function fetchUser() {
        return DB::table('users')->where('user_type', '<>', 'landlord')->select('id', 'user_name', 'email', 'user_contact_number', 'user_type', 'move_in_date', 'employment_status', 'emergency_contact', 'tenant_occupation', 'business_license', 'landlord_bio', 'monthly_income', 'current_address')->get()->toArray();
    }

     public static function deactivate($id)
    {
        $user = self::find($id);
        if ($user) {
            $user->active = 0;
            $user->save();
        }
        return $user;
    }
}
