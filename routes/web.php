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
#PROCESO
Route::get('/rental/home','CategoryController@home');
Route::get('/rental/reserve/', 'CategoryController@index');
Route::post('/rental/payment/', 'CategoryController@payment');
Route::post('/rental/cancel/', 'CategoryController@cancel');
Route::post('/rental/transaction/', 'CategoryController@insert_transfer');
Route::post('/rental/reservation/', 'CategoryController@create_reservation');
Route::post('/rental/form/', 'CategoryController@user_form');
Route::post('/rental/extras/', 'CategoryController@extras');
Route::post('/rental/categories/', 'CategoryController@available');
Route::post('/rental/cars/', 'CategoryController@car_select');
Route::put('/rental/cancel_res/{task}', 'CategoryController@update_cancel');
#ESTADO DE RESERVACION
Route::post('/rental/my_status/', 'CategoryController@my_status');
Route::get('/rental/my_reservation/', 'CategoryController@my_reservation');
#API
Route::post('/rental/store_loc/', 'CategoryController@store_loc');
Route::post('/rental/store_cat/', 'CategoryController@store_cat');
#ADMINISTRADORES
Route::get('/rental/admin_res/', 'CategoryController@admin_res');
Route::get('/rental/admin_loc/', 'CategoryController@admin_locations');
Route::get('/rental/admin_cat/', 'CategoryController@admin_categories');
Route::get('/rental/locationslist/', 'CategoryController@list_locations');
Route::get('/rental/categorieslist/', 'CategoryController@list_categories');
Route::put('/rental/update_locations/{task}', 'CategoryController@update_locations');
Route::put('/rental/update_categories/{task}', 'CategoryController@update_categories');
Route::delete('/rental/delete_locations/{task}', 'CategoryController@delete_locations');
Route::delete('/rental/delete_categories/{task}', 'CategoryController@delete_categories');
