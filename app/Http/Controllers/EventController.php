<?php

namespace App\Http\Controllers;

use App\Http\Requests\Event\DestroyRequest;
use App\Http\Requests\Event\IndexRequest;
use App\Http\Requests\Event\ShowRequest;
use App\Http\Requests\Event\StoreRequest;
use App\Http\Requests\Event\UpdateRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
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
    public function index(IndexRequest $request)
    {
        return EventResource::collection(
            Event::all(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request, Event $event)
    {
        return new EventResource(
            $event->create($request->validated())
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(ShowRequest $request, Event $event)
    {
        return new EventResource(
            $event
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Event $event)
    {
        return new EventResource(
            tap($event)->update($request->validated())
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(DestroyRequest $request, Event $event)
    {
        $event->delete();

        return response()->noContent();
    }
}
