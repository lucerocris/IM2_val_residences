<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VacancySubscription>
 */
class VacancySubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->safeEmail(),
            'subscription_name' => fake()->optional()->words(2, true),
            'property_types' => json_encode(fake()->randomElements(['duplex', 'triplex'], fake()->numberBetween(1, 2))),
            'max_rent' => fake()->optional()->randomFloat(2, 10000, 50000),
            'is_active' => fake()->boolean(80),
            'last_notified_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
