<?php

namespace App\Http\Controllers;

use App\Events\ConsumptionEvent;
use App\Http\Requests\Consumption\DestroyRequest;
use App\Http\Requests\Consumption\IndexRequest;
use App\Http\Requests\Consumption\ShowRequest;
use App\Http\Requests\Consumption\StoreRequest;
use App\Http\Requests\Consumption\UpdateRequest;
use App\Http\Resources\ConsumptionResource;
use App\Models\Consumption;
use App\Models\Machine;
use Illuminate\Http\Request;

class ConsumptionController extends Controller
{

    public function __construct()
    {
        $this
            ->middleware(['auth:sanctum', 'verified'])
            ->except(['store', 'index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request, Machine $machine)
    {
        return ConsumptionResource::collection(
            $machine->consumptions()->latest()->take(10)->get()->sort(),
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
        $consumptionResource = new ConsumptionResource(
            $machine
                ->consumptions()
                ->create($request->validated()),
        );

        // $indexRequest = IndexRequest::create($request);

        // $indexResult = $this->index($indexRequest, $machine);
        // dd($indexResult);

        ConsumptionEvent::dispatch($consumptionResource);

        return $consumptionResource;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, Consumption $consumption)
    {
        return new ConsumptionResource(
            $consumption
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Consumption $consumption)
    {
        return new ConsumptionResource(
            tap($consumption)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, Consumption $consumption)
    {
        $consumption->delete();

        return response()->noContent();
    }
}
