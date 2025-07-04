<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        return Inertia::render('user/Landing');
    }

    public function listings() {
        return Inertia::render('user/Listings');
    }
}

?>