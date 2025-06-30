<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lease>
 */
class LeaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 year', '+1 month');
        $endDate = (clone $startDate)->modify('+1 year');

        return [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'monthly_rent' => fake()->randomFloat(2, 8000, 35000),
            'deposit_amount' => fake()->randomFloat(2, 5000, 20000),
            'lease_term' => 12,
            'lease_status' => fake()->randomElement(['active', 'pending', 'expired']),
            'terms_and_conditions' => fake()->paragraph(),
        ];
    }
}
