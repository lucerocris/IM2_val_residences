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
        dd($userList);

        return Inertia::render('landlord/UserTablePage', [
            'userList' => $userList,
        ]);
    }
}
