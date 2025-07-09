<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index() {

        $maintenanceTableData = MaintenanceRequest::getTableData();

        return Inertia::render('landlord/MaintenancePage', [
            'maintenanceTableData' => $maintenanceTableData,
        ]);
    }
}




