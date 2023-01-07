<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConsumptionHistoricResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            '5 days ago' => $this['5 days ago'],
            '4 days ago' => $this['4 days ago'],
            '3 days ago' => $this['3 days ago'],
            '2 days ago' => $this['2 days ago'],
            '1 days ago' => $this['1 day ago'],
        ];
    }
}
