<!DOCTYPE html>
<html>
<body>

<?php 

    $file = fopen("categories_array.json","r");
    $categories_array = json_decode(fread($file,filesize("categories_array.json")), true);
    fclose($file);

    $category_name = $_POST["category_name"];

    foreach ($categories_array as &$poet) {
        print_r("<br/>".$poet["id_number"].": ".$_POST[$poet["id_number"]]."<br/>");
        if ($_POST[$poet["id_number"]]){
            print_r("Submitted!<br/>");
            print_r("Old value: ".$poet[$category_name]."<br/>");
            $poet[$category_name] = "1";
            print_r("New value: ".$poet[$category_name]."<br/>");
        } else {
            print_r("Not submitted<br/>");
            print_r("Old value: ".$poet[$category_name]."<br/>");
            $poet[$category_name] = "0";
            print_r("New value: ".$poet[$category_name]."<br/>");
        }
        
    }

    echo "<br /><br /><br /><br />";
    echo "<a href='index.html'><-- Back to form</a>";

    
    $file = fopen("categories_array.json","w");
    fwrite($file, json_encode($categories_array));
    echo json_encode($categories_array);
    fclose($file);
    
    
    
?>

</body>
</html>