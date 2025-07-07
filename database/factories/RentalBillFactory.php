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

    /**
     * Create rental bills with paid dates in a specific month for monthly revenue.
     *
     * @param int $month Month (1-12)
     * @param int $year Year (e.g., 2025)
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function monthlyRevenue(int $month = 7, int $year = 2025): Factory
    {
        return $this->state(function (array $attributes) use ($month, $year) {
            // Create start and end dates for the specified month
            $monthStart = new \DateTime("{$year}-{$month}-01");
            $monthEnd = (clone $monthStart)->modify('last day of this month');
            $paidDate = fake()->dateTimeBetween($monthStart, $monthEnd);

            // Set billing date to be before paid date (previous month billing for current month payment)
            $billingDate = (clone $paidDate)->modify('-1 month');
            $dueDate = (clone $billingDate)->modify('+15 days');
            $rentAmount = fake()->randomFloat(2, 8000, 35000);

            return [
                'billing_date' => $billingDate,
                'rent_amount' => $rentAmount,
                'due_date' => $dueDate,
                'paid_date' => $paidDate,
                'amount_paid' => $rentAmount, // Fully paid for revenue tracking
                'payment_status' => 'paid',
            ];
        });
    }
}
