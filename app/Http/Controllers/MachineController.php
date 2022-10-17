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

class MachineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request, Machine $machine)
    {
        return MachineResource::collection(
            $machine->all(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request, Machine $machine)
    {
        return new MachineResource(
            $machine->create($request->validated())
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
