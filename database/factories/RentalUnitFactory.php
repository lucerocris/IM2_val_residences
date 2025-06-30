<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalUnit>
 */
class RentalUnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address' => fake()->address(),
            'unit_number' => fake()->optional()->regexify('[A-C][0-9]{1,2}'),
            'availability_status' => fake()->randomElement(['available', 'occupied', 'maintenance']),
            'floor_area' => fake()->randomFloat(2, 25, 150),
            'rent_price' => fake()->randomFloat(2, 8000, 35000),
            'property_type' => fake()->randomElement(['duplex', 'triplex']),
            'description' => fake()->paragraph(),
            'amenities' => json_encode(fake()->randomElements([
                'WiFi', 'Parking', 'AC', 'Kitchen', 'Laundry', 'Balcony', 'Security'
            ], fake()->numberBetween(2, 5))),
            'unit_photos' => json_encode([
                'photos/unit1.jpg', 'photos/unit2.jpg', 'photos/unit3.jpg'
            ]),
        ];
    }
}
