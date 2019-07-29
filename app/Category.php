<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\Location;

class Category extends Model
{
    protected $fillable = ['name', 'cost', 'capacity'];
    public function locations()
    {
        return $this->belongsToMany('App\Location');
    }
}
