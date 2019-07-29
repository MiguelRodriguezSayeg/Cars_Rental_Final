<?php

namespace App\Http\Controllers;
use \App\Category;
use \App\Car;
use \App\Extra;
use \App\Client;
use \App\Reservation;
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
        $data = request();
        $categories = \App\Location::find($data['origin'])->categories;
        return view('categories')->with('reservation', $data)
                                 ->with('categories', json_encode($categories));
    }
    public function car_select(Request $request){
      $data = request();
      $id = $data['category_id'];
      $cars = \App\Car::where('category_id', $id)->get();
      return view('models')->with('cars', json_encode($cars))
                           ->with('reservation', $data);
    }

    public function admin_locations(){
      return view('locations');
    }

    public function store_loc(Request $request){
        $loc = new Location();
        $loc->address = request('address');
        $loc->city = request('city');
        $loc->state = request('state');
        $loc->country = request('country');
        $loc->is_airport = request('is_airport');
        $loc->save();
        return redirect('http://localhost:8000/rental/admin_loc');
    }
    public function extras(Request $request){
        $data = request();
        $res_arr = array(array("origin"=>$data['origin'],
                         "destiny"=>$data['destiny'],
                         "reservation"=>$data['reservation'],
                         "return"=>$data['return'],
                         "model_id"=>$data['model_id'],
                         "category_id"=>$data['category_id'],
                         "is_airport"=> \App\Location::where('id', $data['origin'])->get(['is_airport'])->first()['is_airport']
                       ));
        $cat_info = \App\Category::where('id', $data['category_id'])->get();
        $extras_in_loc = \App\Location::find($data['origin'])->extras;
        return view('extras')->with('reservation',json_encode($res_arr))
                            ->with('exval', json_encode($extras_in_loc))
                            ->with('category', json_encode($cat_info));
    }
    public function user_form(Request $request){
      $data = request();
      $res = array(array("origin"=>$data['origin'],
                       "destiny"=>$data['destiny'],
                       "reservation"=>$data['reservation'],
                       "return"=>$data['return'],
                       "model_id"=>$data['model_id'],
                       "category_id"=>$data['category_id'],
                       "is_airport"=> $data['is_airport']
                     ));
      $cost = $data['cost'];
      $extras = $data['extras'];
      return view('userform')->with('reservation', json_encode($res))
                          ->with('cost', $cost)
                          ->with('extras', json_encode($extras));
    }

    public function create_reservation(Request $request){
      $reservation = array("origin"=>$request['origin'],
                       "destiny"=>$request['destiny'],
                       "reservation"=>$request['reservation'],
                       "return"=>$request['return'],
                       "model_id"=>$request['model_id'],
                       "category_id"=>$request['category_id'],
                       "is_airport"=> $request['is_airport']
                     );

      $user = \App\Client::where('email', '=', $request['email'])->first();

      if ($user === null) {
        $cli = new Client();
        $cli->name = request('name');
        $cli->lastname = request('lastname');
        $cli->email = request('email');
        $saved = $cli->save();
        if(!$saved){
          App::abort(500, 'Error');
        }
        else{
          $res = new Reservation();
          $user = \App\Client::where('email', '=', $request['email'])->first();
          $res->id_user = $user['id'];
          $res->id_origin = $reservation['origin'];
          $res->id_destiny = $reservation['destiny'];
          $res->reservation = $reservation['reservation'];
          $res->return = $reservation['return'];
          $res->id_model = $reservation['model_id'];
          $res->cost = $request['cost'];
          $res->status = 0;
          $saved = $res->save();
          if(!$saved){
            App::abort(500, 'Error');
          }
        }
      }
      else{
        $res = new Reservation();
        $res->id_user = $user['id'];
        $res->id_origin = $reservation['origin'];
        $res->id_destiny = $reservation['destiny'];
        $res->reservation = $reservation['reservation'];
        $res->return = $reservation['return'];
        $res->id_model = $reservation['model_id'];
        $res->cost = $request['cost'];
        $res->status = 0;
        $saved = $res->save();
        if(!$saved){
          App::abort(500, 'Error');
        }
      }
    }
}
