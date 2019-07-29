<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Category;

class Location extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
        'id'         => $this->id,
        'address'       => $this->address,
        'city'    => $this->city,
        'state'     => $this->state,
        'country' => $this->country
        'is_airport' => $this->is_airport
        ];
    }
}
