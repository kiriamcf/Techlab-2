<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;
use App\Http\Requests\Machine\IndexRequest;
use App\Http\Requests\Machine\StoreRequest;
use App\Http\Requests\Machine\ShowRequest;
use App\Http\Requests\Machine\UpdateRequest;
use App\Http\Requests\Machine\DestroyRequest;
use App\Http\Resources\MachineResource;
use App\Models\Laboratory;

class MachineController extends Controller
{
    /**
     * Creates a new controller instance.
     */
    public function __construct()
    {
        $this
            ->middleware(['auth:sanctum', 'verified'])
            ->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request, Laboratory $laboratory)
    {
        return MachineResource::collection(
            $laboratory->machines,
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request, Laboratory $laboratory)
    {
        return new MachineResource(
            $laboratory
                ->machines()
                ->create($request->validated()),
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, Machine $machine)
    {
        return new MachineResource(
            $machine
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Machine $machine)
    {
        return new MachineResource(
            tap($machine)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, Machine $machine)
    {
        $machine->delete();

        return response()->noContent();
    }
}
