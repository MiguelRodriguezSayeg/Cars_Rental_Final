<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\Category;

class Location extends Model
{
    protected $fillable = ['address', 'city', 'state', 'country', 'is_airport'];
    public $timestamps = false;
    public function categories(){
        return $this->belongsToMany('App\Category');
    }
    public function extras(){
        return $this->belongsToMany('App\Extra');
    }
}
