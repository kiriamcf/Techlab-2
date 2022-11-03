<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Requests\Reservation\IndexRequest;
use App\Http\Requests\Reservation\StoreRequest;
use App\Http\Requests\Reservation\ShowRequest;
use App\Http\Requests\Reservation\UpdateRequest;
use App\Http\Requests\Reservation\DestroyRequest;
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
        // return ReservationResource::collection(
        //     $reservation->all(),
        // );

        return ReservationResource::collection(
            Reservation::all(),
        );

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
}
