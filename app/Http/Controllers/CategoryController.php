<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use \App\Category;
use \App\Car;
use \App\Transfers;
use \App\Extra;
use \App\Client;
use \App\ExtraReservation;
use \App\Reservation;
use \App\Timestamp;
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
        date_default_timezone_set("America/Mexico_City");
        $this->validate(request(), [
            'origin' => 'required',
            'destiny' => 'required',
            'reservation' => 'required|date_format:"Y-m-d\TH:i"|after:'.date(DATE_ATOM, time() + (23 * 60 * 60)),
            'return' => 'required|date_format:"Y-m-d\TH:i"|after:reservation|after:'.date(DATE_ATOM, time() + (24 * 60 * 60)),
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

    public function admin_categories(){
      return view('admin_cat');
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

    public function store_cat(Request $request){
        $cat = new Category();
        $cat->name = $request->get('name');
        $cat->cost = $request->get('cost');
        $cat->capacity = $request->get('capacity');
        $cat->save();
        return response()->json('Category inserted!');
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
      $res = preg_replace("/[^0-9]/", " ", $request['extras']);
      $res = trim($res);
      $elements = explode(" ", $res);
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
          else{
            foreach ($elements as $element) {
              $er = new ExtraReservation();
              $er->id_res = (int)$res->id;
              $er->id_extra=(int)$element;
              $saved_element = $er->save();
            }

            $data = array(
                    'name'      =>  $cli->name,
                    'res_id'   =>   $res->id
                );
            $time = new Timestamp();
            $time->id_res = (int)$res->id;
            date_default_timezone_set("America/Mexico_City");
            $date =date('Y-m-d H:i');
            $date = preg_replace('/\s+/', 'T', $date);
            $time->date = $date;
            $time->save();
            Mail::to($cli->email)->send(new SendMail($data));
            return view('reservation')->with('reservation_id', (int)$res->id)
            ->with('client', json_encode($cli));
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
        else{
          foreach ($elements as $element) {
            $er = new ExtraReservation();
            $er->id_res = (int)$res->id;
            $er->id_extra = (int)$element;
            $saved_element = $er->save();
          }
          $data = array(
                  'name'      =>  $user->name,
                  'res_id'   =>   $res->id
              );
          $time = new Timestamp();
          $time->id_res = (int)$res->id;
          date_default_timezone_set("America/Mexico_City");
          $date =date('Y-m-d H:i');
          str_replace('/\s+/', 'T', $date);
          $time->date = $date;
          $time->save();
          Mail::to($user->email)->send(new SendMail($data));
          return view('reservation')->with('reservation_id', (int)$res->id)
          ->with('client', json_encode($user));
        }
      }
    }

    public function my_reservation(){
      return view('my_reservation');
    }
    public function my_status(Request $request){
      $id = $request['res_id'];
      $res = \App\Reservation::where('id_res', $id)->get();
      $ext = \App\ExtraReservation::where('id_res', $id)->get();
      $array = array();
      foreach ($ext as $ex) {
        array_push($array, \App\Extra::where('id', $ex['id_extra'])->get(['description'])->first());
      }
      $user = \App\Client::where('id', $res[0]['id_user'])->get();
      return view('status')->with('reservation',json_encode($res))
                           ->with('extras', json_encode($array))
                           ->with('user', json_encode($user));
    }
    public function list_locations(){
      $loc = \App\Location::all();
    	return response()->json([
    		'data'=> [
    			'locations' => $loc
    		]
    	]);
    }
    public function list_categories(){
      $cat = \App\Category::all();
    	return response()->json([
    		'data'=> [
    			'categories' => $cat
    		]
    	]);
    }
    public function update_locations(Request $request, $id){
      $location = \App\Location::find($id);
      $location->address = $request->address;
      $location->city = $request->city;
      $location->state = $request->state;
      $location->country = $request->country;
      $location->is_airport = $request->is_airport;
      $location->save();
      return response()->json('Location updated!');
    }

    public function update_categories(Request $request, $id){
      $cat = \App\Category::find($id);
      $cat->name = $request->name;
      $cat->cost = $request->cost;
      $cat->capacity = $request->capacity;
      $cat->save();
      return response()->json('Category updated!');
    }
    public function delete_locations($id){
      $location = \App\Location::find($id);
      $location->delete();
    }
    public function delete_categories($id){
      $cat = \App\Category::find($id);
      $cat->delete();
    }
    public function admin_res(){
      $res = \App\Reservation::all();
      $arr_reservaciones = array();
      foreach ($res as $r) {
        $arr_individual = array();
        $arr_individual['id_res'] = $r->id_res;
        $arr_individual['name'] = \App\Client::where('id',$r->id_user)->first()['name'];
        $arr_individual['lastname'] = \App\Client::where('id',$r->id_user)->first()['lastname'];
        $arr_individual['departure'] = $r->reservation;
        $arr_individual['return'] = $r->return;
        $arr_individual['model'] = \App\Car::find($r->id_model)['name'];
        $arr_individual['brand'] = \App\Car::find($r->id_model)['brand'];
        $arr_individual['cost'] = $r->cost;
        if($r->status == 0){
          $arr_individual['status'] = "Reserved";
        }
        elseif($r->status == 1){
          $arr_individual['status'] = "Payed";
        }
        else{
          $arr_individual['status'] = "Cancelled";
        }
        $ext_res = \App\ExtraReservation::where('id_res', $r->id_res)->get(['id_extra']);
        $array_extras = array();
        foreach ($ext_res as $ext) {
          $extra = \App\Extra::find($ext->id_extra)->get(['description']);
          foreach ($extra as $k) {
            array_push($array_extras, $k['description']);
          }
        }
        $arr_individual['extras'] = implode(", ", $array_extras);
        array_push($arr_reservaciones, $arr_individual);
      }
      return view('admin_res')->with('reservations', json_encode($arr_reservaciones));
    }

    public function payment(Request $request){
      $id = $request['reservation_id'];
      $res = \App\Reservation::where('id_res', $id)->first();
      $time = \App\Timestamp::where('id_res', $id)->first();
      $time = $time->date;
      return view('payment')->with('reservation', json_encode($res))->with('date', json_encode($time));
    }

    public function insert_transfer(Request $request){
      $id = $request->id_res;
      $amount = (double)$request->amount;
      $tra = new Transfers();
      $tra->id_res = $id;
      $tra->trans_id = $request->trans_id;
      $tra->type = $request->type;
      $tra->amount = $amount;
      $tra->method = $request->method;
      $tra->save();
      $selection = \App\Reservation::where('id_res' , '=', $id)->first();
      \App\Reservation::where('id_res', $id)
          ->update(['status' => '1']);
      \App\Reservation::where('id_res', $id)
          ->update(['cost' => $amount]);
      return response()->json($amount);
    }

    public function cancel(Request $request){
      $id = $request['reservation_id'];
      $res = \App\Reservation::where('id_res', $id)->first();
      $time = \App\Timestamp::where('id_res', $id)->first();
      $time = $time->date;
      return view('cancel')->with('reservation', json_encode($res))->with('date', json_encode($time));
    }

    public function update_cancel(Request $request, $id){
      \App\Reservation::where('id_res', $id)
          ->update(['status' => '3']);
      \App\Reservation::where('id_res', $id)
          ->update(['cost' => $request->cost]);
      return response()->json('Category updated!');
    }
}
