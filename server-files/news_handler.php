<?php

    header('content-type: application/json; charset=utf-8');
    header("access-control-allow-origin: *");
    /*
    //open connection to mysql db
    $connection = mysqli_connect("db713125457.db.1and1.com","dbo713125457","H3xham66","db713125457") or die("!Error " . mysqli_error($connection));

    //charset
    mysqli_set_charset($connection, 'utf8');

    //fetch table rows from mysql db
    $sql = "select * from poetsdb";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $fullarray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $fullarray[] = $row;
    }
    //print_r(json_encode($fullarray));
    echo json_encode($fullarray);

    //close the db connection
    mysqli_close($connection);
    */

    $file = fopen("news.json","r");
    $the_news = fread($file,filesize("news.json"));
    fclose($file);

    echo($the_news);

?>