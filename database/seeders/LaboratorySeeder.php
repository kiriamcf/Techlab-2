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
        Laboratory::create(['name' => 'Main Laboratory', 'room_number' => '1.7']);

        Laboratory::create(['name' => 'Secondary Laboratory', 'room_number' => '1.8']);

        // DB::table('laboratories')->insert([
        //     'name' => "Main Laboratory",
        //     'room_number' => "1.7",
        // ]);

        // DB::table('laboratories')->insert([
        //     'name' => "Secondary Laboratory",
        //     'room_number' => "1.8",
        // ]);
    }
}