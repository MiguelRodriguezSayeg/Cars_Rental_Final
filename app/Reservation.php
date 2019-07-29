<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
  protected $fillable = ['id_user', 'id_origin', 'id_destiny', 'reservation','return','id_model','cost','status'];
  public $timestamps = false;
}
