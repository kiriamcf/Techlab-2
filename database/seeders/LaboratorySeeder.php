<?php

namespace Database\Seeders;

use App\Models\Laboratory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaboratorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Laboratory::create(['name' => 'Primary', 'room_number' => '1.7']);

        Laboratory::create(['name' => 'Secondary', 'room_number' => '1.8']);
    }
}
