<!DOCTYPE html>
<html>
<body>

<?php 

foreach ($_POST as $key => $value) {
    print_r($key." => ".$value."<br/>");
}
print_r("<br/>");

$file = fopen("categories_array.json","r");
$categories_array = json_decode(fread($file,filesize("categories_array.json")), true);
fclose($file);

$category_name = $_POST["category_name"];
print_r($category_name."<br/>");
print_r("<br/>");

if (!($categories_array[0][$category_name])) {
    foreach ($categories_array as &$poet) {
        print_r("<br/>".$poet["id_number"].": ".$_POST[$poet["id_number"]]."<br/>");
        if ($_POST[$poet["id_number"]]){
            $poet[$category_name] = "1";
            print_r("Category value: ".$poet[$category_name]."<br/>");
        } else {
            $poet[$category_name] = "0";
            print_r("Category value: ".$poet[$category_name]."<br/>");
        }
        print_r("<br/>");
    }

    $file = fopen("categories_array.json","w");
    fwrite($file, json_encode($categories_array));
    echo json_encode($categories_array);
    fclose($file);

} else {
    print_r("This category already exists.");
}

echo "<br /><br /><br /><br />";
echo "<a href='index.html'><-- Back to form</a>";
    
?>

</body>
</html>