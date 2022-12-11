<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Reservation;
use Illuminate\Http\Request;

class HardwareController extends Controller
{
    public function status(Request $request) {
        // { 'machine_id': X }

        $machineId = $request->get('machine_id');

        $machine = Machine::where('id', $machineId)->firstOrFail();

        if ($machine->active) {
            return response()->json(['active' => true]);
        }

        $now = now();

        $reservation = Reservation::where('machine_id', $machineId)
                        ->whereDate('day', $now->copy()->startOfDay())
                        ->where('hour', $now->hour)
                        ->first();

        if ($reservation === null) {
            return response()->json(['active' => false, 'rfid_card' => null]);
        }

        $rfidCard = $reservation->user()->rfid_card;

        return response()->json(['active' => false, 'rfid_card' => $rfidCard]);
    }

    public function diagnostic(Request $request) {
        // { 'machine_id': X, 'value': X }
    }
}
