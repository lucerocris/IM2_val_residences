<?php

namespace Database\Seeders;

use App\Models\Landlord;
use App\Models\Tenant;
use App\Models\ProspectiveTenant;
use App\Models\RentalUnit;
use App\Models\Lease;
use App\Models\RentalBill;
use App\Models\MaintenanceRequest;
use App\Models\RentalApplication;
use App\Models\VacancySubscription;
use App\Models\VacancyNotification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Get photos for a specific unit with main.jpg as primary
     */
    private function getUnitPhotos($unitId): array
    {
        $unitFolder = "rental-units/unit-{$unitId}";
        $fullPath = storage_path("app/public/{$unitFolder}");

        if (!File::exists($fullPath)) {
            return [];
        }

        $files = File::files($fullPath);
        $photos = [];
        $mainPhoto = null;

        foreach ($files as $file) {
            $extension = strtolower($file->getExtension());
            $filename = $file->getFilename();

            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $photoPath = "{$unitFolder}/{$filename}";

                // Check if this is the main photo
                if (strtolower(pathinfo($filename, PATHINFO_FILENAME)) === 'main') {
                    $mainPhoto = $photoPath;
                } else {
                    $photos[] = $photoPath;
                }
            }
        }

        // Put main photo first if it exists
        if ($mainPhoto) {
            array_unshift($photos, $mainPhoto);
        }

        return $photos;
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create one landlord
        $testLandlord = Landlord::create([
            'user_name' => 'Cris Lawrence Lucero',
            'email' => 'testadmin@gmail.com',
            'password' => Hash::make('admin123'),
        ]);

        $testTenant = Tenant::create([
            'user_name' => 'Derick Angelo Yu',
            'email' => 'testtenant@gmail.com',
            'password' => Hash::make('tenant123'),
        ]);

        $testProsTenant = ProspectiveTenant::create([
            'user_name' => 'Simon Gementiza',
            'email' => 'testprostenant@gmail.com',
            'password' => Hash::make('prostenant123'),
        ]);

        // Create tenants and prospective tenants
        $tenants = Tenant::factory(5)->create();
        $prospects = ProspectiveTenant::factory(7)->create();

        // Create real rental units
        $rentalUnitsData = [
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 1',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 80.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 2',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 20.00,
                'rent_price' => 11000.00,
                'property_type' => 'studio',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '1 Floor',
                    '1 Bedroom',
                    '1 Bathroom',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 3',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, With balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Balcony',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 2, Lot 5, Block 3, Unit 1',
                'address' => 'Ph. 2, Lot 5, Block 3, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 2, Lot 5, Block 3, Unit 2',
                'address' => 'Ph. 2, Lot 5, Block 3, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 2, Lot 5, Block 3, Unit 3',
                'address' => 'Ph. 2, Lot 5, Block 3, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Escala, Block 1, Lot 67, Unit 1',
                'address' => 'Escala, Block 1, Lot 67, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 60.00,
                'rent_price' => 16000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Escala, Block 1, Lot 67, Unit 2',
                'address' => 'Escala, Block 1, Lot 67, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 60.00,
                'rent_price' => 16000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 1',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 2',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 18.00,
                'rent_price' => 10000.00,
                'property_type' => 'studio',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '1 Floor',
                    '1 Bedroom',
                    '1 Bathroom',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 3',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, With balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Balcony',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 4',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 12.00,
                'rent_price' => 12000.00,
                'property_type' => 'loft',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, With balcony, No parking, With tile floors, No dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [
                    '1 Floor',
                    '1 Bedroom',
                    '1 Bathroom',
                    'Balcony',
                    'Tile Floors',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'
                ],
                'unit_photos' => [],
                'availability_status' => 'available'
            ]
        ];

        $units = collect();
        foreach ($rentalUnitsData as $unitData) {
            $unit = RentalUnit::create([
                'landlord_id' => $testLandlord->id,
                'unit_number' => $unitData['unit_number'],
                'address' => $unitData['address'],
                'floor_area' => $unitData['floor_area'],
                'rent_price' => $unitData['rent_price'],
                'property_type' => $unitData['property_type'],
                'description' => $unitData['description'],
                'amenities' => $unitData['amenities'],
                'unit_photos' => [], // Will be updated after creation
                'availability_status' => $unitData['availability_status']
            ]);

            // Get photos for this unit and update the unit_photos field
            $unitPhotos = $this->getUnitPhotos($unit->id);
            $unit->update(['unit_photos' => $unitPhotos]);

            $units->push($unit);

            // Log the photos found for this unit
            $photoCount = count($unitPhotos);
            $this->command->info("Unit {$unit->id} ({$unit->unit_number}): {$photoCount} photos found");
        }

        // Create leases for some units with tenants
        $occupiedUnits = $units->take(4);
        foreach ($occupiedUnits as $index => $unit) {
            $tenant = $tenants[$index] ?? $tenants[0];

            $lease = Lease::factory()->create([
                'tenant_id' => $tenant->id,
                'unit_id' => $unit->id,
                'monthly_rent' => $unit->rent_price,
                'lease_status' => 'active',
            ]);

            // Update unit status
            $unit->update(['availability_status' => 'occupied']);

            // Create rental bills for active leases
            RentalBill::factory(3)->create([
                'lease_id' => $lease->id,
                'rent_amount' => $lease->monthly_rent,
            ]);

            // Create maintenance requests
            MaintenanceRequest::factory(rand(1, 3))->create([
                'tenant_id' => $tenant->id,
                'unit_id' => $unit->id,
                'lease_id' => $lease->id,
            ]);
        }

        // Create a lease for the test tenant
        $availableUnitsForTestTenant = $units->where('availability_status', 'available');
        if ($availableUnitsForTestTenant->isNotEmpty()) {
            $testTenantUnit = $availableUnitsForTestTenant->first();

            $testTenantLease = Lease::factory()->create([
                'tenant_id' => $testTenant->id,
                'unit_id' => $testTenantUnit->id,
                'monthly_rent' => $testTenantUnit->rent_price,
                'lease_status' => 'active',
            ]);

            // Update unit status
            $testTenantUnit->update(['availability_status' => 'occupied']);

            // Create rental bills for test tenant's lease
            RentalBill::factory(3)->create([
                'lease_id' => $testTenantLease->id,
                'rent_amount' => $testTenantLease->monthly_rent,
            ]);

            // Create maintenance requests for test tenant
            MaintenanceRequest::factory(rand(1, 2))->create([
                'tenant_id' => $testTenant->id,
                'unit_id' => $testTenantUnit->id,
                'lease_id' => $testTenantLease->id,
            ]);
        }

        // Create some terminated leases for historical data
        $remainingUnits = $units->skip(4)->take(2); // Take 2 more units for terminated leases
        foreach ($remainingUnits as $index => $unit) {
            $tenant = $tenants[$index % $tenants->count()];

            $terminatedLease = Lease::factory()->terminated()->create([
                'tenant_id' => $tenant->id,
                'unit_id' => $unit->id,
                'monthly_rent' => $unit->rent_price,
            ]);

            // Create some rental bills for terminated leases (historical data)
            RentalBill::factory(rand(2, 6))->create([
                'lease_id' => $terminatedLease->id,
                'rent_amount' => $terminatedLease->monthly_rent,
                'due_date' => fake()->dateTimeBetween($terminatedLease->start_date, $terminatedLease->terminated_date),
                'payment_status' => fake()->randomElement(['paid', 'overdue']),
            ]);

            // Unit remains available after termination
            $unit->update(['availability_status' => 'available']);
        }

        // Create rental bills with specific month paid dates for monthly revenue tracking
        $activeLeases = Lease::where('lease_status', 'active')->get();
        foreach ($activeLeases as $lease) {
            // Create bills for different months - July 2025 (default)
            RentalBill::factory(rand(1, 2))->monthlyRevenue()->create([
                'lease_id' => $lease->id,
                'rent_amount' => $lease->monthly_rent,
            ]);

            // Create bills for June 2025
            RentalBill::factory(1)->monthlyRevenue(6, 2025)->create([
                'lease_id' => $lease->id,
                'rent_amount' => $lease->monthly_rent,
            ]);

            // Create bills for May 2025
            RentalBill::factory(1)->monthlyRevenue(5, 2025)->create([
                'lease_id' => $lease->id,
                'rent_amount' => $lease->monthly_rent,
            ]);
        }

        // Get available units
        $availableUnits = $units->where('availability_status', 'available');

        // Add safety check to prevent the error
        if ($availableUnits->isEmpty()) {
            $this->command->warn('No available units found for rental applications');
        } else {
            // Create rental applications from prospective tenants
            foreach ($prospects as $prospect) {
                $randomUnit = $availableUnits->random();

                RentalApplication::factory()->create([
                    'prospective_tenant_id' => $prospect->id,
                    'unit_id' => $randomUnit->id,
                ]);
            }
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info("Created: 1 Test Landlord, 1 Test Tenant (with lease), {$tenants->count()} Tenants, {$prospects->count()} Prospective Tenants");
        $this->command->info("Created: {$units->count()} Real Rental Units, " . ($occupiedUnits->count() + 1) . " Active Leases (including test tenant), 2 Terminated Leases");
        $this->command->info("Available units: {$availableUnits->count()}");
    }
}
