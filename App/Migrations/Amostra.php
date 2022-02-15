<?php

namespace App\Migrations;
use Illuminate\Database\Capsule\Manager as Capsule;

class Amostra
{
    public function up()
    {
        Capsule::schema()->create('Amostras', function ($table) {
            $table->increments('id');
            $table->string('numerodeamostra');
            $table->integer('especie_1');
            $table->integer('especie_2');
            $table->integer('especie_3');
            $table->integer('especie_4');
            $table->integer('especie_5');
            $table->timestamps();
        });
    }
    public function down()
    {
        Capsule::schema()->drop('Amostras');
    }
}
?>
