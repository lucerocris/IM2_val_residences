<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MaintenanceRequest;
use App\Http\Requests\RequestMaintenanceRequest;
use App\Notifications\MaintenanceRequestReceived;
use App\Models\RentalUnit;
use Inertia\Inertia;

class RequestMaintenanceController extends Controller
{
    //
    public function create()
    {
        // return Inertia::render()  TO BE ADDED
        //
    }

    public function store(RequestMaintenanceRequest $request)
    {
        // MaintenanceRequest::create($request->validated());
        // return redirect()->route('tenant.dashboard')->with('success', 'Request added successfully');

        $maintenanceRequest = MaintenanceRequest::create($request->validated());

        if($maintenanceRequest->unit && $maintenanceRequest->unit->landlord) {
            $landlord = $maintenanceRequest->unit->landlord;
            $landlord->notify(new MaintenanceRequestReceived($maintenanceRequest));
        }
        
        return redirect()->route('tenant.dashboard')->with('success', 'Maintenance request submitted successfully');
    }
}
