<?php 

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller; 
use Inertia\Inertia;
use App\Models\RentalBill;

class FinanceController extends Controller
{
    public function rent() {
        $rentData = RentalBill::getTableData();

            

        return Inertia::render('landlord/RentCollection', [
            'rentData' => $rentData,
            'rents' => $rentData,
        ]);
    }

    public function report() {
        return Inertia::render('landlord/FinancialReport');
    }
}
?>