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
        $leaseStatus = fake()->randomElement(['active', 'pending', 'expired', 'terminated']);

        // Generate terminated date and reason only if lease is terminated
        $terminatedDate = null;
        $terminationReason = null;

        if ($leaseStatus === 'terminated') {
            $terminatedDate = fake()->dateTimeBetween($startDate, $endDate);
            $terminationReason = fake()->randomElement([
                'Mutual agreement',
                'Lease violation',
                'Non-payment of rent',
                'Property damage',
                'Early termination by tenant',
                'Property sold',
                'Landlord needs property for personal use',
                'Breach of contract'
            ]);
        }

        return [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'monthly_rent' => fake()->randomFloat(2, 8000, 35000),
            'deposit_amount' => fake()->randomFloat(2, 5000, 20000),
            'lease_term' => 12,
            'lease_status' => $leaseStatus,
            'terminated_date' => $terminatedDate,
            'termination_reason' => $terminationReason,
        ];
    }

    /**
     * Create a terminated lease with terminated_date and terminate_reason
     */
    public function terminated(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $attributes['start_date'] ?? fake()->dateTimeBetween('-2 years', '-6 months');
            $endDate = $attributes['end_date'] ?? (clone $startDate)->modify('+1 year');

            return [
                'lease_status' => 'terminated',
                'terminated_date' => fake()->dateTimeBetween($startDate, $endDate),
                'termination_reason' => fake()->randomElement([
                    'Mutual agreement',
                    'Lease violation',
                    'Non-payment of rent',
                    'Property damage',
                    'Early termination by tenant',
                    'Property sold',
                    'Landlord needs property for personal use',
                    'Breach of contract'
                ]),
            ];
        });
    }
}
