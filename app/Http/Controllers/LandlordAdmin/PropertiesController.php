<?php

namespace App\Http\Controllers\LandlordAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Models\RentalUnit;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PropertiesController extends Controller
{
    public function index()
    {
        $units = RentalUnit::with(['landlord:id,user_name,email,user_contact_number'])->get()->map(function ($unit) {
            return [
                'id' => $unit->id,
                'landlord_id' => $unit->landlord_id,
                'landlord' => [
                    'id' => $unit->landlord->id,
                    'user_name' => $unit->landlord->user_name,
                    'email' => $unit->landlord->email,
                    'user_contact_number' => $unit->landlord->user_contact_number,
                ],
                'address' => $unit->address,
                'unit_number' => $unit->unit_number,
                'availability_status' => $unit->availability_status,
                'floor_area' => $unit->floor_area,
                'rent_price' => $unit->rent_price,
                'property_type' => $unit->property_type,
                'description' => $unit->description,
                'amenities' => $unit->amenities ? json_decode($unit->amenities) : null,
                'unit_photos' => $unit->unit_photos ? json_decode($unit->unit_photos) : null,
                'created_at' => $unit->created_at->toISOString(),
                'updated_at' => $unit->updated_at->toISOString(),
            ];
        });

        return Inertia::render('landlord/PropertiesOverviewPage', [
            'units' => $units,
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
