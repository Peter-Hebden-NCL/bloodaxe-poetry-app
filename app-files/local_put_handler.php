<?php
    //This script saves any Themes that the user adds to a poem in the app.
    
    header('content-type: application/json; charset=utf-8');
    header("access-control-allow-origin: *");

    //open local poets_array
    $get_data = file_get_contents("poets_array.json");

    $array_php = json_decode($get_data,true);

    //adding user tags

    $id_number = (int)$_POST["id_number"];
    $user_themes = $_POST["user_themes"];

    foreach ($array_php as $poet) {
        if ($poet["id_number"] == $id_number) {
            $poet["user_themes"] = $user_themes;
        }
    };

    $updated_array = json_encode($array_php);
    
    $file = fopen("poets_array.json","w");
    echo "<br /><br />" . fwrite($file, $updated_array);
    fclose($file);

    echo($updated_array);
    
?>