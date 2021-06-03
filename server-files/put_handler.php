<?php

    //header('content-type: application/json; charset=utf-8');
    header("access-control-allow-origin: *");

    //open connection to mysql db
    $connection = mysqli_connect("db713125457.db.1and1.com","dbo713125457","H3xham66","db713125457") or die("!Error " . mysqli_error($connection));

    //charset
    mysqli_set_charset($connection, 'utf8');

    //adding user tags

    $id_number = (int)$_POST["id_number"];
    $user_themes = $_POST["user_themes"];
    
    //NOT IDEAL - takes the user_tags from an individual's app and overwrites the online database - potentially problematic if the user is using an out-of-date, offline version of poets_array.
    $sql = "UPDATE poetsdb SET user_themes='$user_themes,' WHERE id_number=$id_number";
    
    //RESPONSE TO APP (needs amending for user tags)
    if ($connection->query($sql) === TRUE) {
        echo "<br /><br />POET UPDATED! :-)";
    } else {
        echo "<br /><br />ERROR: Poet not updated.<br />" . sql . "<br />" . $connection->error;
    };
    
    

    //close the db connection
    mysqli_close($connection);
?>