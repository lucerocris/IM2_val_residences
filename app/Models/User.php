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

use Illuminate\Support\Facades\DB;

use App\Models\RentalUnit;
use App\Models\RentalApplication;
use App\Models\Lease;
use App\Models\MaintenanceRequest;
use App\Models\VacancySubscription;
use Carbon\Carbon;


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

    public static function fetchUser() {
        return DB::table('users')->where('user_type', '<>', 'landlord')->select('id', 'user_name', 'email', 'user_contact_number', 'user_type', 'move_in_date', 'employment_status', 'emergency_contact', 'tenant_occupation', 'monthly_income', 'current_address', 'created_at')->get()->toArray();
    }


    public static function deactivate($user_id)
    {
        $user = self::find($user_id);

        if (!$user) {
            return null;
        }


        $user->active = false;
        $user->save();


        $leases = Lease::where('tenant_id', $user->id)->get();

        foreach ($leases as $lease) {
            $lease->lease_status = "Terminated";
            $lease->terminated_date = Carbon::now();
            $lease->save();


            $unit = RentalUnit::find($lease->unit_id);
            if ($unit) {
                $unit->availability_status = 'Available';
                $unit->save();
            }
        }

        return $user;
    }

    public static function getNumberOfProspectiveTenants() {
        return DB::table('users')->where('user_type', '=','prospective_tenant')->count();
    }

    public static function getNumberOfActiveTenants() {
        return DB::table('users')->where('user_type', '=', 'tenant')->count();
    }

    public static function getNumberOfUsers() {
        return DB::table('users')
            ->whereIn('user_type', ['tenant', 'prospective_tenant'])
            ->count();
    }

    public static function getNumberOfNewUsers() {
        return  DB::table('users')
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();
    }


}
