<?php

namespace Database\Seeders;

use App\Models\Laboratory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Laboratory::where('room_number', '1.7')->first()->machines()->create(['name' => '3D machine', 'description' => 'Machine used to produce physical 3D representations of computer-created models using a technique called additive manufacturing.', 'active' => false, 'level_required' => 0]);

        Laboratory::where('room_number', '1.7')->first()->machines()->create(['name' => 'Lathe', 'description' => 'It is a type of machine tool that allows machining geometrically shaped parts of revolution. It can be driven by a crank or a motor.', 'active' => false, 'level_required' => 0]);

        Laboratory::where('room_number', '1.7')->first()->machines()->create(['name' => 'Milling machine', 'description' => 'It is a machine tool used to give complex shapes to parts made of metal, plastic, wood or other materials. It performs operations such as slot cutting, planing, drilling...', 'active' => false, 'level_required' => 0]);

        Laboratory::where('room_number', '1.8')->first()->machines()->create(['name' => 'Sewing machine', 'description' => 'It is a machine used to sew fabric and other materials together with thread. It has a needle guard to prevent accidental needle stick injuries.', 'active' => false, 'level_required' => 0]);

        Laboratory::where('room_number', '1.8')->first()->machines()->create(['name' => 'Laser cutter', 'description' => 'Machine that uses laser cutting, which is a technology that makes use of a laser beam to cut different materials with very good precision.', 'active' => false, 'level_required' => 0]);

        Laboratory::where('room_number', '1.8')->first()->machines()->create(['name' => 'Drill', 'description' => 'Machine or tool with which most of the holes that are made in the parts of the mechanical workshops are machined. It is characterized by being very easy to use.', 'active' => false, 'level_required' => 0]);
    }
}
