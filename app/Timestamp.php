<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timestamp extends Model
{
  protected $fillable = ['id_res', 'date'];
  public $timestamps = false;
}
