<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Models\MaintenanceRequest;
use App\Models\RentalUnit;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RentalUnitController extends Controller
{
    public function index()
    {
        $units = RentalUnit::all();
        $numberOfAvailableUnits = RentalUnit::getNumberOfAvailableUnits();
        $numberOfOccupiedUnits = RentalUnit::getNumberOfOccupiedUnits();
        $numberOfMaintenanceRequests = MaintenanceRequest::getNumberOfMaintenanceRequests();
        $unitsTableData = RentalUnit::getDataForTable();


        return Inertia::render('landlord/RentalUnitsOverviewPage', [
            'availableUnits' => $numberOfAvailableUnits,
            'numberOfUnits' => $units->count(),
            'unitsTableData' => $unitsTableData,
            'numberOfOccupiedUnits' => $numberOfOccupiedUnits,
            'numberOfMaintenanceRequests' => $numberOfMaintenanceRequests,
        ]);
    }

    public function create()
    {
        return Inertia::render('landlord/AddPropertyPage');
    }

    public function store(StorePropertyRequest $request)
    {
        $validated = $request->validated();

        // Handle photo uploads
        $photoUrls = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                // Store the photo in the 'public/property-photos' directory
                $path = $photo->store('property-photos', 'public');
                // Generate the full URL
                $photoUrls[] = Storage::url($path);
            }
        }

        $data = [
            'landlord_id' => $validated['landlord_id'],
            'address' => $validated['address'],
            'unit_number' => $validated['unit_number'] ?? null,
            'availability_status' => $validated['availability_status'],
            'floor_area' => $validated['floor_area'] ?? null,
            'rent_price' => $validated['rent_price'],
            'property_type' => $validated['property_type'],
            'description' => $validated['description'] ?? null,
            'amenities' => !empty($validated['amenities']) ? json_encode($validated['amenities']) : null,
            'unit_photos' => !empty($photoUrls) ? json_encode($photoUrls) : null,
        ];

        RentalUnit::create($data);

        return redirect()->route('landlord.properties')->with('success', 'Rental Unit created successfully');
    }
}
