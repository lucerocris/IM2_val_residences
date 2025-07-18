<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserTableController extends Controller
{
    //
    public function index(){
        $userList = User::fetchUser();
        $metrics = [
            'numberOfUsers' => User::getNumberOfUsers(),
            'numberOfTenant' => User::getNumberOfActiveTenants(),
            'numberOfProspectiveTenant' => User::getNumberOfProspectiveTenants(),
            'numberOfNewUsers' => User::getNumberOfNewUsers(),
        ];

        return Inertia::render('landlord/UserPage', [
            'userList' => $userList,
            'metrics' => $metrics
        ]);
    }
}
