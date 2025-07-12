<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index() {

        $maintenanceTableData = MaintenanceRequest::getTableData();

        return Inertia::render('landlord/MaintenancePage', [
            'maintenanceTableData' => $maintenanceTableData,
        ]);
    }

    public function destroy($id)
    {
        $request = MaintenanceRequest::findOrFail($id);
        $request->delete();
        return redirect()->back()->with('success', 'Request deleted successfully');
    }

    public function startMaintenance()
    {

    }

    public function completeMaintenance(Request $request, $id)
    {
        $maintenanceRequest = MaintenanceRequest::findOrFail($id);

        $validatedData = $request->validate([
            'actual_cost' => 'required|numeric|min:0',
            'request_status' => 'required|string|in:pending,in_progress,completed,cancelled',
        ]);

        $maintenanceRequest->update($validatedData);
        return redirect()->back()->with('success', 'Request updated successfully');

    }
}




