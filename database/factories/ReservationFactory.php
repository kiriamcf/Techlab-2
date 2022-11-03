<?php

namespace Database\Factories;

use App\Models\Machine;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'hour' => fake()->numberBetween(9, 21),
            'day' => fake()->date('Y-m-d'),
            'machine_id' => Machine::factory(),
            'user_id' => User::factory(),
        ];
    }
}
