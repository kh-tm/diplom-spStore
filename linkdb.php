<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'spStore';

$link = mysqli_connect($servername, $username, $password, $dbname);
mysqli_set_charset($link, "utf8");

if (mysqli_connect_errno()) {
    echo('Ошибка в подключении к БД: ('. $mysqli_connect_errno() .') $mysqli_connect_error()');
    exit();
}
