<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LatLoc extends Model
{
  protected $fillable = ['id', 'latitute', 'longitude'];
  public $timestamps = false;
}
