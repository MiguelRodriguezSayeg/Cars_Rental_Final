<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExtraReservation extends Model
{
  protected $fillable = ['id_res', 'id_extra'];
  public $timestamps = false;
}
