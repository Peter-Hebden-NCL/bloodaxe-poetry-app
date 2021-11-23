<?php
    /* Script to allow the Bloodaxe Poetry mobile app access to the online list of categroies */
    header('content-type: application/json; charset=utf-8');
    header("access-control-allow-origin: *");
 
    $file = fopen("categories_array.json","r");
    $categories = fread($file,filesize("categories_array.json"));
    fclose($file);

    echo($categories);
?>