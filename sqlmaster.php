<?php

/*    взять всю таблицу из базы и вернуть ассоциативным массивом    */
function get_phones($link) {
    $sql = 'SELECT * FROM phones';

    $result = mysqli_query($link, $sql);

    $phones = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return $phones;
}

$phones = get_phones($link);

echo json_encode($phones, JSON_UNESCAPED_UNICODE);
