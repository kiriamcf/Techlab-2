<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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

        $rfidCard = $reservation->user->rfid_card;

        return response()->json(['active' => false, 'rfid_card' => $rfidCard]);
    }

    public function activate(Request $request)
    {
        // { 'machine_id': X }

        $machineId = $request->get('machine_id');

        $machine = Machine::where('id', $machineId)->firstOrFail();

        $machine->active = true;

        $machine->save();

        return response()->json(['active' => true]);
    }

    public function authorized(Request $request)
    {
        // { 'machine_id': X }

        $machineId = $request->get('machine_id');

        $machine = Machine::where('id', $machineId)->firstOrFail();

        if ($machine->url === '' || $machine->url === null) {
            return response()->json(['response' => true]);
        }

        $response = Http::get($machine->url);

        return response()->json(['response' => $response->body()]);
    }
}
