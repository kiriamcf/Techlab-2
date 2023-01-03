<?php

namespace App\Events;

use App\Http\Resources\ConsumptionResource;
use App\Models\Consumption;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Queue\SerializesModels;

class ConsumptionEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ConsumptionResource $consumption;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ConsumptionResource $consumption)
    {
        $this->consumption = $consumption;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['chart'];
    }

    public function broadcastAs()
    {
        return 'register';
    }
}
