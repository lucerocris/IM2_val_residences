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
    ];
}
