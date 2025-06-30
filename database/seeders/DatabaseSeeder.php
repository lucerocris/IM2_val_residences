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
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create one landlord
        $landlord = Landlord::factory()->create([
            'user_name' => 'John Landlord',
            'email' => 'landlord@example.com',
        ]);

        // Create rental units owned by the landlord - FORCE them to be 'available' initially
        $units = RentalUnit::factory(8)->create([
            'landlord_id' => $landlord->id,
            'availability_status' => 'available', // ← Force available status
        ]);

        // Create tenants and prospective tenants
        $tenants = Tenant::factory(5)->create();
        $prospects = ProspectiveTenant::factory(7)->create();

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

        // Get available units (should be 4 remaining)
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

        // Create vacancy subscriptions
        VacancySubscription::factory(10)->create();

        // Some subscriptions for existing users
        foreach ($prospects->take(3) as $prospect) {
            VacancySubscription::factory()->create([
                'user_id' => $prospect->id,
                'email' => $prospect->email,
            ]);
        }

        // Create vacancy notifications for some subscriptions
        $subscriptions = VacancySubscription::all();
        if ($subscriptions->isNotEmpty() && $availableUnits->isNotEmpty()) {
            foreach ($subscriptions->take(5) as $subscription) {
                $randomUnit = $availableUnits->random();

                VacancyNotification::create([
                    'subscription_id' => $subscription->id,
                    'unit_id' => $randomUnit->id,
                    'email' => $subscription->email,
                    'message' => "New rental unit available: {$randomUnit->address} - ₱" . number_format($randomUnit->rent_price, 2),
                    'sent_at' => now(),
                ]);
            }
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info("Created: 1 Landlord, {$tenants->count()} Tenants, {$prospects->count()} Prospective Tenants");
        $this->command->info("Created: {$units->count()} Rental Units, {$occupiedUnits->count()} Active Leases");
        $this->command->info("Available units: {$availableUnits->count()}");
    }
}
