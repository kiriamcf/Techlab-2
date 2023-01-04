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
            'admin' => true,
            'rfid_card' => "86 77 9C 14",
            'level_authorization' => 2,
        ]);

        DB::table('users')->insert([
            'name' => "Roger",
            'surname' => "Escudero Junyent",
            'email' => "roger.escudero@estudiantat.upc.edu",
            'password' => '$2y$10$Qitg4jTsfjLIH0Yeg1YVvOgbFt3qamSMjL4Xsta7CcPS03QaiW05O',
            'admin' => true,
            'rfid_card' => "DD 9E C0 F6",
            'level_authorization' => 2,
        ]);
    }
}
