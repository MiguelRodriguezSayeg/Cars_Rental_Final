<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->bigIncrements('id_res');
            $table->integer('id_user');
            $table->integer('id_origin');
            $table->integer('id_destiny');
            $table->string('reservation');
            $table->string('return');
            $table->integer('id_model');
            $table->double('cost', 10, 3);
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
