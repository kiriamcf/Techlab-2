<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HardwareController extends Controller
{
    public function rfid(Request $request) {
        // { 'id_targeta': '1234 1234 1234 1234', 'id_maquina': 'X' }

        // $id_targeta = $request->get('id_targeta');
        // $id_maquina = $request->get('id_maquina');

        // $now = now();
        // $user = User::where('targeta', $id_targeta)->firstOrFail();

        // $r = $user
        //     ->reservations()
        //     ->where('machine_id', $id_maquina)
        //     ->whereDate('date', $now->copy()->startOfDay())
        //     ->where('hour', strval($now->hour) . '-' . strval($now->hour + 1))
        //     ->firstOrFail();

        // return [
        //     'nom' => $user->name,
        //     'temps_restant' => 60 - $now->minute,
        // ];
    }
}
