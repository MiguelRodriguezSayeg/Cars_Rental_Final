<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
  protected $fillable = ['description', 'cost'];
  public $timestamps = false;
  public function locations(){
      return $this->belongsToMany('App\Category');
  }
}
