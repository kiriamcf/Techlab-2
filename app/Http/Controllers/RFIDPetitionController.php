<?php

namespace App\Http\Controllers;

use App\Http\Requests\RFIDPetition\StoreRequest;
use App\Http\Requests\RFIDPetition\DestroyRequest;
use App\Http\Requests\RFIDPetition\IndexRequest;
use App\Http\Requests\RFIDPetition\ShowRequest;
use App\Http\Requests\RFIDPetition\UpdateRequest;
use App\Http\Resources\RFIDPetitionResource;
use App\Models\RFIDPetition;
use App\Models\User;

class RFIDPetitionController extends Controller
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
    public function index(IndexRequest $request)
    {
        return RFIDPetitionResource::collection(
            RFIDPetition::with('user')->get(),
            // $request->user()->petition,
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRFIDPetitionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        return new RFIDPetitionResource(
            $request
                ->user()
                ->petition()
                ->create($request->validated()),
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RFIDPetition  $rFIDPetition
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, RFIDPetition $rfidPetition)
    {
        return new RFIDPetitionResource(
            $rfidPetition
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRFIDPetitionRequest  $request
     * @param  \App\Models\RFIDPetition  $rFIDPetition
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, RFIDPetition $rfidPetition)
    {
        return new RFIDPetitionResource(
            tap($rfidPetition)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RFIDPetition  $rFIDPetition
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, RFIDPetition $rfidPetition)
    {
        $rfidPetition->user->update($request->validated());

        $rfidPetition->delete();

        return response()->noContent();
    }
}
