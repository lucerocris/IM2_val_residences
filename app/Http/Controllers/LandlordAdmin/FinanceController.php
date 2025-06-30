<?php 

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller; 
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function rent() {
        return Inertia::render('landlord/RentCollection');
    }
}
?>