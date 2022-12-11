<?php

namespace Database\Factories;

use App\Models\Laboratory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Machine>
 */
class MachineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->text(25),
            'description' => fake()->text(50),
            'active' => false,
            'level_required' => 0,
            'laboratory_id' => Laboratory::factory(),
        ];
    }
}
