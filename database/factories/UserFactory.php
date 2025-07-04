<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'user_contact_number' => fake()->phoneNumber(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    public function landlord(): static
    {
        return $this->state(fn(array $attributes) => [
            'user_type' => 'landlord',
            'business_license' => fake()->regexify('[A-Z]{2}[0-9]{8}'),
            'landlord_bio' => fake()->paragraph(),
        ]);
    }

    public function tenant(): static
    {
        return $this->state(fn(array $attributes) => [
            'user_type' => 'tenant',
            'move_in_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'employment_status' => fake()->randomElement(['employed', 'self-employed', 'unemployed', 'student']),
            'emergency_contact' => fake()->phoneNumber(),
            'tenant_occupation' => fake()->jobTitle(),
        ]);
    }

    public function prospectiveTenant(): static
    {
        return $this->state(fn(array $attributes) => [
            'user_type' => 'prospective_tenant',
            'monthly_income' => fake()->randomFloat(2, 20000, 80000),
            'current_address' => fake()->address(),
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
