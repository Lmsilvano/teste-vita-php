<?php
require 'vendor/autoload.php';
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule();
$config = [
    'driver' => 'mysql',
    'host' => 'localhost:3306',
    'database' => 'teste-vita-leandro',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8',
];
$capsule->addConnection($config);
$capsule->setAsGlobal();
$capsule->bootEloquent();
?>
