<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use App\Models\RentalBill;
use App\Models\RentalUnit;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Number;

class DashboardController extends Controller
{
    public function index()
    {


//       Maintenance requests model
        $maintenanceRequests = MaintenanceRequest::getNumberOfMaintenanceRequests();
        $maintenanceRequestsLimit = MaintenanceRequest::getLimitedMaintenanceRequestsWithUnits(4);


//        Rental Unit models
        $numberOfUnits = RentalUnit::getNumberOfUnits();
        $numberOfAvailableUnits = RentalUnit::getNumberOfAvailableUnits();
        $numberOfOccupiedUnits = RentalUnit::getNumberOfOccupiedUnits();


//        Getting start of the month and end of the month
        $startOfMonth = Carbon::now()
            ->startOfMonth()
            ->toDateString();
        $endOfMonth = Carbon::now()
            ->endOfMonth()
            ->toDateString();


//        Rental Bill models
        $paidRentalBillsThisMonth = Number::currency(RentalBill::getPaidRevenueThisMonth($startOfMonth, $endOfMonth), in: 'PHP');


        return Inertia::render('landlord/DashboardPage', [
            'numberOfUnits' => $numberOfUnits,
            'numberOfAvailableUnits' => $numberOfAvailableUnits,
            'numberOfOccupiedUnits' => $numberOfOccupiedUnits,
            'paidRentalBillsThisMonth' => $paidRentalBillsThisMonth,
            'numberOfMaintenanceRequest' => $maintenanceRequests,
            'maintenanceRequests' => $maintenanceRequestsLimit,
        ]);
    }
}
