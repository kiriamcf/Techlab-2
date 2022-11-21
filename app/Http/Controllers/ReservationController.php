<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Requests\Reservation\IndexRequest;
use App\Http\Requests\Reservation\StoreRequest;
use App\Http\Requests\Reservation\ShowRequest;
use App\Http\Requests\Reservation\UpdateRequest;
use App\Http\Requests\Reservation\DestroyRequest;
use App\Http\Resources\HoursResource;
use App\Http\Resources\ReservationResource;
use App\Models\Machine;

class ReservationController extends Controller
{
    /**
     * Creates a new controller instance.
     */
    public function __construct()
    {
        $this
            ->middleware(['auth:sanctum', 'verified']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request, Machine $machine)
    {
        return ReservationResource::collection(
            $machine
                ->reservations()
                ->when($request->query('date'), fn ($query, $day) => $query->where('day', $day))
                ->get(),
        );

            // ?date=2022-02-32

        // return ReservationResource::collection(
        //     Reservation::when($request->query('date'), fn ($query, $day) => $query->where('day', $day))
        //         ->get(),
        // );

        // $reservation = new Reservation($request->validated());
        // $reservation->user()->associate($machine);
        // $reservation->user()->associate($request->user());
        // $reservation->save();

        // return $reservation;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request, Machine $machine)
    {
        $reservation = new Reservation($request->validated());
        $reservation->machine()->associate($machine);
        $reservation->user()->associate($request->user());
        $reservation->save();

        return new ReservationResource(
            $reservation
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, Reservation $reservation)
    {
        return new ReservationResource(
            $reservation
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Reservation $reservation)
    {
        return new ReservationResource(
            tap($reservation)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, Reservation $reservation)
    {
        $reservation->delete();

        return response()->noContent();
    }

    public function getAvailableHours(Request $request)
    {
        return new HoursResource(['hours' => [8, 9, 10, 11, 15, 16, 17, 18, 19, 20]]);
    }

    // /**
    //  * Return hours already reserved from a specific date.
    //  *
    //  * @param  \App\Models\Reservation  $reservation
    //  * @return \Illuminate\Http\Response
    //  */
    // public function showReservedHours(Request $request, Machine $machine, string $date)
    // {
    //     return $machine
    //         ->reservations()
    //         ->where('day', $date)
    //         ->get();
    // }
}
