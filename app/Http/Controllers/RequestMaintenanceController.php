<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MaintenanceRequest;
use App\Http\Requests\RequestMaintenanceRequest;
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
        MaintenanceRequest::create($request->validated());
        return redirect()->route('tenant.dashboard')->with('success', 'Request added successfully');

    }
}
