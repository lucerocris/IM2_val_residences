<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalApplication>
 */
class RentalApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'application_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'preferred_move_in_date' => fake()->dateTimeBetween('now', '+2 months'),
            'application_status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'additional_notes' => fake()->optional()->sentence(),
            'reviewed_date' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
            'review_notes' => fake()->optional()->sentence(),
        ];
    }
}
