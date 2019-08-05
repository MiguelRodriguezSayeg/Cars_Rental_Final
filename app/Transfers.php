<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transfers extends Model
{
  protected $fillable = ['id_res', 'trans_id', 'type', 'amount','method'];
  public $timestamps = false;
}
