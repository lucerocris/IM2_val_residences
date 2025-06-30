<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalBill>
 */
class RentalBillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $billingDate = fake()->dateTimeBetween('-6 months', 'now');
        $dueDate = (clone $billingDate)->modify('+15 days');
        $rentAmount = fake()->randomFloat(2, 8000, 35000);

        return [
            'billing_date' => $billingDate,
            'rent_amount' => $rentAmount,
            'due_date' => $dueDate,
            'paid_date' => fake()->optional()->dateTimeBetween($billingDate, 'now'),
            'amount_paid' => fake()->randomElement([0, $rentAmount * 0.5, $rentAmount]),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'overdue', 'partial']),
        ];
    }
}
