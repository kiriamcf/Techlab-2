<?php

namespace Database\Factories;

use App\Models\Machine;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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

    public function correct(?Carbon $day = null)
    {
        $totalHours = [8, 9, 10, 11, 15, 16, 17, 18, 19, 20];
        $day = $day ? $day : now();

        return $this->state(function (array $attributes) use ($totalHours, $day) {
            return [
                'hour' => fake()->randomElement($totalHours),
                'day' => $day,
            ];
        });
    }
}
