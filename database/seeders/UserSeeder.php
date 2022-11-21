<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => "Kiriam",
            'surname' => "Campobadal Forés",
            'email' => "kiriamcf@gmail.com",
            'password' => '$2y$10$z1KsdsDgSAkONU0JM5qmSelCZqbzIirHLBTUopn13Hwy.oqU.847e',
        ]);
    }
}
