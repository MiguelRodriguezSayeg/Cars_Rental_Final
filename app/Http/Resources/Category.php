<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Location;

class Category extends JsonResource
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
            'name'       => $this->brand,
            'cost'    => $this->model,
            'capacity'     => (int) $this->year
        ];
    }
}
