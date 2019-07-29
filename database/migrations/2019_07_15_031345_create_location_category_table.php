<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::rename('location_category', 'category_location');
      /*
        Schema::create('category_location', function (Blueprint $table) {
            $table->integer('location_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->timestamps();
        });
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        #Schema::dropIfExists('location_category');
        Schema::rename('category_location', 'location_category');
    }
}
