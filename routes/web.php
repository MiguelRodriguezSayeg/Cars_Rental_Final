<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/rental/store_loc/', 'CategoryController@store_loc');
Route::post('/rental/create_reservation/', 'CategoryController@create_reservation');
Route::post('/rental/form/', 'CategoryController@user_form');
Route::post('/rental/extras/', 'CategoryController@extras');
Route::post('/rental/categories/', 'CategoryController@available');
Route::post('/rental/cars/', 'CategoryController@car_select');
Route::get('/rental/reserve/', 'CategoryController@index');
Route::get('/rental/admin_loc/', 'CategoryController@admin_locations');
