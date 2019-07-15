<?php

namespace App\Http\Controllers;
use \App\Category;
use \App\Location;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\CategoryCollection;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return view('reserve')->with('locations', json_encode(\App\Location::all()));
    }

    public function available(Request $request){

        $this->validate(request(), [
            'origin' => 'required',
            'destiny' => 'required',
            'reservation' => 'required',
            'return' => 'required',
        ]);
        return view('categories')->with('reservation',request())
                                 ->with('categories', json_encode(\App\Category::all()));
    }
}
