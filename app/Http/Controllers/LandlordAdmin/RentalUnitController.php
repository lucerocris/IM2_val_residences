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
            'amenities' => $validated['amenities'] ?? [],
            'unit_photos' => $photoUrls,
        ];

        RentalUnit::create($data);

        return redirect()->route('landlord.properties')->with('success', 'Rental Unit created successfully');
    }


    public function edit($id)
    {
        $unit = RentalUnit::findOrFail($id);

        return Inertia::render('landlord/AddPropertyPage', [
            'unit' => $unit,
            'isEditing' => true,
        ]);
    }

    public function update(StorePropertyRequest $request, $id)
    {
        $unit = RentalUnit::findOrFail($id);
        $validated = $request->validated();

        $newPhotoUrls = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                // Store the photo in the 'public/property-photos' directory
                $path = $photo->store('property-photos', 'public');
                // Generate the full URL
                $newPhotoUrls[] = Storage::url($path);
            }
        }

        // Handle existing photos - ensure we get an array
        $existingPhotos = [];
        if ($unit->unit_photos) {
            if (is_array($unit->unit_photos)) {
                $existingPhotos = $unit->unit_photos;
            } else if (is_string($unit->unit_photos)) {
                $decoded = json_decode($unit->unit_photos, true);
                $existingPhotos = is_array($decoded) ? $decoded : [];
            }
        }

        $allPhotos = array_merge($existingPhotos, $newPhotoUrls);

        // Prepare update data
        $updateData = [
            'landlord_id' => $validated['landlord_id'],
            'address' => $validated['address'],
            'unit_number' => $validated['unit_number'] ?? $unit->unit_number,
            'availability_status' => $validated['availability_status'],
            'floor_area' => $validated['floor_area'] ?? $unit->floor_area,
            'rent_price' => $validated['rent_price'],
            'property_type' => $validated['property_type'],
            'description' => $validated['description'] ?? $unit->description,
            'amenities' => $validated['amenities'] ?? $unit->amenities,
            'unit_photos' => $allPhotos,
        ];

        $unit->update($updateData);

        return redirect()->route('landlord.properties')->with('success', 'Successfully edited a property');
    }

    public function destroy($id) {
        $unit = RentalUnit::findOrFail($id);
        $unit->delete();
        return redirect()->back()->with('success', 'Rental unit and all associated records deleted successfully.');
    }
}
