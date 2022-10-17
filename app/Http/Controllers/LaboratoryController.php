<?php

namespace App\Http\Controllers;

use App\Models\Laboratory;
use Illuminate\Http\Request;
use App\Http\Requests\Laboratory\IndexRequest;
use App\Http\Requests\Laboratory\StoreRequest;
use App\Http\Requests\Laboratory\ShowRequest;
use App\Http\Requests\Laboratory\UpdateRequest;
use App\Http\Requests\Laboratory\DestroyRequest;
use App\Http\Resources\LaboratoryResource;

class LaboratoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexRequest $request, Laboratory $laboratory)
    {
        return LaboratoryResource::collection(
            $laboratory->all(),
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
        return new LaboratoryResource(
            $laboratory->create($request->validated())
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, Laboratory $laboratory)
    {
        return new LaboratoryResource(
            $laboratory
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Laboratory $laboratory)
    {
        return new LaboratoryResource(
            tap($laboratory)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Laboratory  $laboratory
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, Laboratory $laboratory)
    {
        $laboratory->delete();

        return response()->noContent();
    }
}
