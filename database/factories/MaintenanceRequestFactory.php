<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceRequest>
 */
class MaintenanceRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'maintenance_description' => fake()->sentence(),
            'request_status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'priority_level' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'scheduled_date' => fake()->optional()->dateTimeBetween('now', '+1 month'),
            'completion_date' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
            'tenant_remarks' => fake()->optional()->sentence(),
            'landlord_notes' => fake()->optional()->sentence(),
            'actual_cost' => fake()->optional()->randomFloat(2, 500, 10000),
        ];
    }
}
