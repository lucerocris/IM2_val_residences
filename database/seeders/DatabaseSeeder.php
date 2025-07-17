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
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

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

                if (strtolower(pathinfo($filename, PATHINFO_FILENAME)) === 'main') {
                    $mainPhoto = $photoPath;
                } else {
                    $photos[] = $photoPath;
                }
            }
        }

        if ($mainPhoto) {
            array_unshift($photos, $mainPhoto);
        }

        return $photos;
    }

    /**
     * Create realistic rental bills for a lease
     */
    /**
     * Create realistic rental bills for a lease
     */
    private function createRealisticBills($lease, $monthsToGenerate = 12)
    {
        $currentDate = Carbon::now();
        $rentAmount = $lease->monthly_rent;

        // Generate bills for current month, last month, and last last month only
        $monthsToCreate = [
            $currentDate->copy()->subMonths(2), // Last last month
            $currentDate->copy()->subMonths(1), // Last month
//            $currentDate->copy()                // Current month
        ];

        foreach ($monthsToCreate as $billingDate) {
            $leaseStartDay = Carbon::parse($lease->start_date)->day;
            $dueDate = $billingDate->copy()->day(min($leaseStartDay, $billingDate->daysInMonth()));

            // Determine payment status based on billing month
            $paymentStatus = $this->determinePaymentStatusByMonth($billingDate, $currentDate);

            // Calculate amount paid based on status
            $amountPaid = $this->calculateAmountPaid($rentAmount, $paymentStatus);

            // Set paid date if payment was made
            $paidDate = null;
            if ($paymentStatus === 'paid') {
                $paidDate = $dueDate->copy()->addDays(fake()->numberBetween(-3, 10));
            } elseif ($paymentStatus === 'partial') {
                $paidDate = $dueDate->copy()->addDays(fake()->numberBetween(-2, 15));
            }

            RentalBill::create([
                'lease_id' => $lease->id,
                'billing_date' => $billingDate->format('Y-m-d'),
                'rent_amount' => $rentAmount,
                'due_date' => $dueDate->format('Y-m-d'),
                'paid_date' => $paidDate?->format('Y-m-d'),
                'amount_paid' => $amountPaid,
                'payment_status' => $paymentStatus,
                'reference_number' => $paymentStatus !== 'pending' ? 'REF-' . fake()->unique()->numerify('########') : null,
                'proof_of_payment_path' => $paymentStatus !== 'pending' ? 'payments/proof_' . fake()->uuid() . '.jpg' : null,
            ]);
        }
    }
    /**
     * Determine payment status based on billing month
     */
    private function determinePaymentStatusByMonth($billingDate, $currentDate)
    {
        $monthsDiff = $currentDate->diffInMonths($billingDate);

        if ($monthsDiff >= 2) {
            // Last last month - if not paid, mark as overdue
            return fake()->randomElement(['paid', 'paid', 'overdue', 'overdue']);
        } elseif ($monthsDiff >= 1) {
            // Last month - if not paid, mark as overdue
            return fake()->randomElement(['paid', 'overdue', 'overdue', 'partial']);
        } else {
            // Current month - mostly pending or recently paid
            return fake()->randomElement(['pending', 'pending', 'paid']);
        }
    }


    /**
     * Calculate amount paid based on payment status
     */
    private function calculateAmountPaid($rentAmount, $paymentStatus)
    {
        switch ($paymentStatus) {
            case 'paid':
                return $rentAmount;
            case 'partial':
                // Partial payment between 30% and 80% of rent
                $percentage = fake()->numberBetween(30, 80) / 100;
                return round($rentAmount * $percentage, 2);
            case 'overdue':
            case 'pending':
            default:
                return 0.00;
        }
    }

    /**
     * Create rental application for a user and unit
     */
    private function createRentalApplication($userId, $unitId, $isApproved = false)
    {
        $applicationDate = fake()->dateTimeBetween('-60 days', '-7 days');
        $status = $isApproved ? 'approved' : fake()->randomElement(['pending', 'approved', 'rejected']);

        return RentalApplication::create([
            'prospective_tenant_id' => $userId,
            'unit_id' => $unitId,
            'application_date' => $applicationDate->format('Y-m-d'),
            'preferred_move_in_date' => Carbon::parse($applicationDate)->addDays(fake()->numberBetween(7, 30))->format('Y-m-d'),
            'application_status' => $status,
            'additional_notes' => fake()->optional(0.3)->paragraph(),
            'reviewed_date' => $status !== 'pending' ? Carbon::parse($applicationDate)->addDays(fake()->numberBetween(1, 7))->format('Y-m-d') : null,
            'review_notes' => $status !== 'pending' ? fake()->optional(0.7)->sentence() : null,
        ]);
    }

    public function run(): void
    {
        // Create landlord
        $landlord = Landlord::create([
            'user_name' => 'Cris Lawrence Lucero',
            'email' => 'lucerocris22@gmail.com',
            'password' => Hash::make('admin123'),
            'user_type' => 'landlord',
            'user_contact_number' => '+63 912 345 6789',
            'business_license' => 'BL-2024-001',
            'landlord_bio' => 'Experienced property manager with 10+ years in real estate.',
        ]);

        // Create rental units
        $rentalUnitsData = [
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 1',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 80.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => ['2 Floors', '3 Bedrooms', '2 Bathrooms', 'Parking', 'Tile Floors', 'Dirty Kitchen', 'Pet Friendly'],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 2',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 20.00,
                'rent_price' => 11000.00,
                'property_type' => 'studio',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly.',
                'amenities' => ['1 Floor', '1 Bedroom', '1 Bathroom', 'Parking', 'Tile Floors', 'Dirty Kitchen', 'Pet Friendly'],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 4, Lot 6, Block 8, Unit 3',
                'address' => 'Ph. 4, Lot 6, Block 8, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 20.00,
                'rent_price' => 11000.00,
                'property_type' => 'studio',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, With balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => ['2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Balcony',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 2, Lot 5, Block 3, Unit 1',
                'address' => 'Ph. 2, Lot 5, Block 3, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 18000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly.',
                'amenities' => ['2 Floors', '3 Bedrooms', '2 Bathrooms', 'Parking', 'Tile Floors', 'Dirty Kitchen', 'Pet Friendly'],
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 2, Lot 5, Block 3, Unit 2',
                'address' => 'Ph. 2, Lot 5, Block 3, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 70.00,
                'rent_price' => 20000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly. Lease Term: 1 year, 1 Month advance, 2 Months deposit',
                'amenities' => [ '2 Floors',
                    '3 Bedrooms',
                    '2 Bathrooms',
                    'Parking',
                    'Tile Floors',
                    'Dirty Kitchen',
                    'Pet Friendly',
                    'Lease Term: 1 year',
                    'Advance: 1 month',
                    'Deposit: 2 months'],
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
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Escala, Block 1, Lot 67, Unit 1',
                'address' => 'Escala, Block 1, Lot 67, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 60.00,
                'rent_price' => 16000.00,
                'property_type' => 'duplex',
                'description' => '2 Floors, 3 Bedrooms, 2 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly.',
                'amenities' => ['2 Floors', '3 Bedrooms', '2 Bathrooms', 'Parking', 'Tile Floors', 'Dirty Kitchen', 'Pet Friendly'],
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
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 2',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 18.00,
                'rent_price' => 10000.00,
                'property_type' => 'studio',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, No balcony, With parking, With tile floors, With dirty kitchen, Pet friendly.',
                'amenities' => ['1 Floor', '1 Bedroom', '1 Bathroom', 'Parking', 'Tile Floors', 'Dirty Kitchen', 'Pet Friendly'],
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
                'availability_status' => 'available'
            ],
            [
                'unit_number' => 'Ph. 3, Block 3, Lot 16, Unit 4',
                'address' => 'Ph. 3, Block 3, Lot 16, Pooc, Corona del Mar, Talisay City, Cebu',
                'floor_area' => 12.00,
                'rent_price' => 12000.00,
                'property_type' => 'loft',
                'description' => '1 Floor, 1 Bedroom, 1 T&B, With balcony, No parking, With tile floors, No dirty kitchen, Pet friendly.',
                'amenities' => ['1 Floor', '1 Bedroom', '1 Bathroom', 'Balcony', 'Tile Floors', 'Pet Friendly'],
                'availability_status' => 'available'
            ]
        ];

        $units = collect();
        foreach ($rentalUnitsData as $unitData) {
            $unit = RentalUnit::create([
                'landlord_id' => $landlord->id,
                'unit_number' => $unitData['unit_number'],
                'address' => $unitData['address'],
                'floor_area' => $unitData['floor_area'],
                'rent_price' => $unitData['rent_price'],
                'property_type' => $unitData['property_type'],
                'description' => $unitData['description'],
                'amenities' => $unitData['amenities'],
                'unit_photos' => $this->getUnitPhotos($units->count() + 1),
                'availability_status' => $unitData['availability_status']
            ]);
            $units->push($unit);
        }

        // Create users (tenants and prospective tenants)
        $usersData = [
            // Current tenants (will get leases)
            [
                'user_name' => 'Derick Angelo Yu',
                'email' => 'testtenant@gmail.com',
                'password' => Hash::make('tenant123'),
                'user_type' => 'tenant',
                'user_contact_number' => '+63 917 111 2222',
                'move_in_date' => '2024-01-15',
                'employment_status' => 'Full-time Employee',
                'emergency_contact' => 'Maria Yu - +63 918 333 4444',
                'tenant_occupation' => 'Software Developer',
                'unit_index' => 0, // Will be assigned to first unit
                'lease_start_months_ago' => 6
            ],
            [
                'user_name' => 'Maria Santos',
                'email' => 'testtenant2@gmail.com',
                'password' => Hash::make('tenant123'),
                'user_type' => 'tenant',
                'user_contact_number' => '+63 917 222 3333',
                'move_in_date' => '2024-03-01',
                'employment_status' => 'Full-time Employee',
                'emergency_contact' => 'Juan Santos - +63 918 444 5555',
                'tenant_occupation' => 'Marketing Manager',
                'unit_index' => 1,
                'lease_start_months_ago' => 4
            ],
            [
                'user_name' => 'Carlos Reyes',
                'email' => 'testtenant3@gmail.com',
                'password' => Hash::make('tenant123'),
                'user_type' => 'tenant',
                'user_contact_number' => '+63 917 333 4444',
                'move_in_date' => '2024-05-10',
                'employment_status' => 'Self-employed',
                'emergency_contact' => 'Ana Reyes - +63 918 555 6666',
                'tenant_occupation' => 'Graphic Designer',
                'unit_index' => 2,
                'lease_start_months_ago' => 2
            ],
            [
                'user_name' => 'Jennifer Cruz',
                'email' => 'testtenant4@gmail.com',
                'password' => Hash::make('tenant123'),
                'user_type' => 'tenant',
                'user_contact_number' => '+63 917 444 5555',
                'move_in_date' => '2024-06-05',
                'employment_status' => 'Full-time Employee',
                'emergency_contact' => 'Roberto Cruz - +63 918 666 7777',
                'tenant_occupation' => 'Nurse',
                'unit_index' => 3,
                'lease_start_months_ago' => 1
            ],
            // Prospective tenants (will get applications)
            [
                'user_name' => 'Simon Gementiza',
                'email' => 'gementizasgg08@gmail.com',
                'password' => Hash::make('user1234'),
                'user_type' => 'prospective_tenant',
                'user_contact_number' => '+63 917 888 9999',
                'monthly_income' => 45000.00,
                'current_address' => '123 Main Street, Cebu City',
                'apply_to_unit_index' => 4
            ],
            [
                'user_name' => 'Patricia Lim',
                'email' => 'testuser2@gmail.com',
                'password' => Hash::make('user1234'),
                'user_type' => 'prospective_tenant',
                'user_contact_number' => '+63 917 999 0000',
                'monthly_income' => 38000.00,
                'current_address' => '456 Oak Avenue, Mandaue City',
                'apply_to_unit_index' => 5
            ],
            [
                'user_name' => 'Kevin Wong',
                'email' => 'testuser3@gmail.com',
                'password' => Hash::make('user1234'),
                'user_type' => 'prospective_tenant',
                'user_contact_number' => '+63 917 000 1111',
                'monthly_income' => 52000.00,
                'current_address' => '789 Pine Street, Talisay City',
                'apply_to_unit_index' => 0 // Multiple applications for same unit
            ],
            [
                'user_name' => 'Michelle Fernandez',
                'email' => 'testuser4@gmail.com',
                'password' => Hash::make('user1234'),
                'user_type' => 'prospective_tenant',
                'user_contact_number' => '+63 917 111 2222',
                'monthly_income' => 41000.00,
                'current_address' => '321 Elm Drive, Lapu-Lapu City',
                'apply_to_unit_index' => 1
            ],
        ];

        foreach ($usersData as $userData) {
            // Create user with appropriate model based on user_type
            if ($userData['user_type'] === 'tenant') {
                $user = Tenant::create([
                    'user_name' => $userData['user_name'],
                    'email' => $userData['email'],
                    'password' => $userData['password'],
                    'user_type' => $userData['user_type'],
                    'user_contact_number' => $userData['user_contact_number'],
                    'move_in_date' => $userData['move_in_date'],
                    'employment_status' => $userData['employment_status'],
                    'emergency_contact' => $userData['emergency_contact'],
                    'tenant_occupation' => $userData['tenant_occupation'],
                ]);
            } else {
                $user = ProspectiveTenant::create([
                    'user_name' => $userData['user_name'],
                    'email' => $userData['email'],
                    'password' => $userData['password'],
                    'user_type' => $userData['user_type'],
                    'user_contact_number' => $userData['user_contact_number'],
                    'monthly_income' => $userData['monthly_income'],
                    'current_address' => $userData['current_address'],
                ]);
            }

            if ($userData['user_type'] === 'tenant') {
                // Create lease for tenant
                $unit = $units[$userData['unit_index']];
                $startDate = Carbon::now()
                    ->subMonths(fake()->numberBetween(1, 12))
                    ->subDays(fake()->numberBetween(0, 28));
                $endDate = $startDate->copy()->addYear();

                $lease = Lease::create([
                    'tenant_id' => $user->id,
                    'unit_id' => $unit->id,
                    'start_date' => $startDate->format('Y-m-d'),
                    'end_date' => $endDate->format('Y-m-d'),
                    'monthly_rent' => $unit->rent_price,
                    'deposit_amount' => $unit->rent_price * 2, // 2 months deposit
                    'lease_term' => 12, // 12 months
                    'lease_status' => 'active',
                    'landlord_review_status' => 'approved',
                    'onboarding_fees_paid' => true,
                    'onboarding_signed_lease_uploaded' => true,
                    'onboarding_id_uploaded' => true,
                    'onboarding_completed_at' => $startDate->format('Y-m-d H:i:s'),
                    'onboarding_fees_amount' => $unit->rent_price * 3, // 1 advance + 2 deposit
                    'required_fees_amount' => $unit->rent_price * 3,
                    'documents_submitted_for_review' => true,
                    'documents_submitted_at' => $startDate->subDays(7)->format('Y-m-d H:i:s'),
                    'landlord_reviewed_at' => $startDate->subDays(3)->format('Y-m-d H:i:s'),
                    'landlord_reviewed_by' => $landlord->id,
                ]);

                // Update unit status
                $unit->update(['availability_status' => 'occupied']);

                // Create rental application (approved)
                $this->createRentalApplication($user->id, $unit->id, true);

                // Create realistic rental bills
                $this->createRealisticBills($lease, 15);

                // Create maintenance requests
                $maintenanceCount = fake()->numberBetween(1, 3);
                for ($i = 0; $i < $maintenanceCount; $i++) {
                    MaintenanceRequest::create([
                        'tenant_id' => $user->id,
                        'unit_id' => $unit->id,
                        'lease_id' => $lease->id,
                        'request_date' => fake()->dateTimeBetween($startDate, 'now')->format('Y-m-d'),
                        'maintenance_description' => fake()->randomElement([
                            'Leaking faucet in kitchen',
                            'Broken door handle',
                            'Electrical outlet not working',
                            'Window won\'t close properly',
                            'Air conditioning not cooling',
                            'Toilet running continuously',
                            'Paint peeling in bedroom',
                            'Clogged drain in bathroom'
                        ]),
                        'request_status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
                        'priority_level' => fake()->randomElement(['low', 'medium', 'high']),
                        'tenant_remarks' => fake()->optional(0.7)->sentence(),
                        'landlord_notes' => fake()->optional(0.5)->sentence(),
                        'actual_cost' => fake()->optional(0.6)->randomFloat(2, 500, 5000),
                        'completion_date' => fake()->optional(0.4)->dateTimeBetween('-30 days', 'now'),
                    ]);
                }

            } elseif ($userData['user_type'] === 'prospective_tenant') {
                // Create rental application for prospective tenant
                $unit = $units[$userData['apply_to_unit_index']];
                $this->createRentalApplication($user->id, $unit->id, false);
            }
        }

        // Create one terminated lease for historical data
        $terminatedTenant = Tenant::create([
            'user_name' => 'Robert Tan',
            'email' => 'testtenant5@gmail.com',
            'password' => Hash::make('tenant123'),
            'user_type' => 'tenant',
            'user_contact_number' => '+63 917 777 8888',
            'move_in_date' => '2023-08-01',
            'employment_status' => 'Full-time Employee',
            'emergency_contact' => 'Sarah Tan - +63 918 999 0000',
            'tenant_occupation' => 'Engineer',
        ]);

        $terminatedUnit = $units[4]; // Use unit that's still available
        $terminatedStartDate = Carbon::now()->subMonths(10);
        $terminatedEndDate = Carbon::now()->subMonths(2);

        $terminatedLease = Lease::create([
            'tenant_id' => $terminatedTenant->id,
            'unit_id' => $terminatedUnit->id,
            'start_date' => $terminatedStartDate->format('Y-m-d'),
            'end_date' => $terminatedStartDate->copy()->addYear()->format('Y-m-d'),
            'monthly_rent' => $terminatedUnit->rent_price,
            'deposit_amount' => $terminatedUnit->rent_price * 2,
            'lease_term' => 12,
            'lease_status' => 'terminated',
            'terminated_date' => $terminatedEndDate->format('Y-m-d'),
            'termination_reason' => 'Job relocation',
            'landlord_review_status' => 'approved',
            'onboarding_fees_paid' => true,
            'onboarding_signed_lease_uploaded' => true,
            'onboarding_id_uploaded' => true,
            'onboarding_completed_at' => $terminatedStartDate->format('Y-m-d H:i:s'),
            'documents_submitted_for_review' => true,
            'landlord_reviewed_by' => $landlord->id,
        ]);

        // Create bills for terminated lease (8 months of payments)
        $this->createRealisticBills($terminatedLease, 8);

        $this->command->info('Database seeded successfully!');
        $this->command->info('Created:');
        $this->command->info('- 1 Landlord');
        $this->command->info('- 6 Rental Units');
        $this->command->info('- 4 Active Tenants with Leases');
        $this->command->info('- 1 Terminated Lease');
        $this->command->info('- 4 Prospective Tenants');
        $this->command->info('- Realistic Rental Bills with proper payment statuses');
        $this->command->info('- Rental Applications for all users');
        $this->command->info('- Maintenance Requests for active tenants');

        // Summary statistics
        $totalBills = RentalBill::count();
        $paidBills = RentalBill::where('payment_status', 'paid')->count();
        $overdueBills = RentalBill::where('payment_status', 'overdue')->count();
        $partialBills = RentalBill::where('payment_status', 'partial')->count();
        $pendingBills = RentalBill::where('payment_status', 'pending')->count();

        $this->command->info("\nBilling Summary:");
        $this->command->info("- Total Bills: {$totalBills}");
        $this->command->info("- Paid: {$paidBills}");
        $this->command->info("- Overdue: {$overdueBills}");
        $this->command->info("- Partial: {$partialBills}");
        $this->command->info("- Pending: {$pendingBills}");
    }
}
