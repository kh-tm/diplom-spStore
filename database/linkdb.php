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

function get_phones($link) {
    $sql = 'SELECT * FROM phones';

    $result = mysqli_query($link, $sql);

    $phones = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return $phones;
}

$phones = get_phones($link);

echo json_encode($phones, JSON_UNESCAPED_UNICODE);
