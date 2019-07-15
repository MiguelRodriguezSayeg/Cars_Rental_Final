<?php

namespace App\Http\Controllers;
use App\Car;
use App\Http\Resources\Car as CarResource;
use App\Http\Resources\CarCollection;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    public function index()
    {
        return new CarCollection(Car::all());

    }
}
