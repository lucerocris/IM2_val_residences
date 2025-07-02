<?php 

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index() {
        return Inertia::render('landlord/MaintenanceRequest');
    }
}

?>