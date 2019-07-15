<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Car extends JsonResource
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
            'brand'       => $this->brand,
            'model'    => $this->model,
            'year'     => (int) $this->year,
            'category_id' => (int) $this->year,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
