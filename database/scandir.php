<?php


function get_photos_URL() {
    $dir    = $_SERVER['DOCUMENT_ROOT'] . '/images/photos/';
    $array  = array();


    // Открыть заведомо существующий каталог и начать считывать его содержимое
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($initialSubDir = readdir($dh)) !== false) {
                if ($initialSubDir !== '.' && $initialSubDir !== '..') {

                    $subDir = ''.$dir.''.$initialSubDir;

                    if (is_dir($subDir)) {
                        if ($dhh = opendir($subDir)) {
                            $subArray = array();
                            while (($file = readdir($dhh)) !== false) {

                                if ($file !== '.' && $file !== '..') {
                                    array_push($subArray, $file);
                                }

                            }
                            closedir($dhh);
                            $array[$initialSubDir] = $subArray;
                        }
                    }
                }

            }
            closedir($dh);
        }
    }

    return $array;
}


echo json_encode(get_photos_URL());

 ?>
