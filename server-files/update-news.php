<!DOCTYPE html>
<html>
<body>

<?php 
    $replaced = array(" ","<",">","‘","’","'","“","”","\"");
    $replacer = array(" ","&lt;","&gt;","&lsquo;","&rsquo;","&apos;","&ldquo;","&rdquo;","&quot;");
    $eraser = "";
    function quotes_replace($the_string) {
        $quotes_replaced = array("‘","’","'","“","”","\"");
        $quotes_replacer = array("&lsquo;","&rsquo;","&apos;","&ldquo;","&rdquo;","&quot;");
        $new_string = str_replace($quotes_replaced,$quotes_replacer,$the_string);
        return $new_string;
    };
    

    // For news update
    $news_headline = $_POST["news_headline"];
    $article_link = $_POST["article_link"];
    


    //IMAGE UPLOAD AND READ-OUT
    echo "IMAGE UPLOAD:<br />";
    $target_dir = "img/";
    $uploaded_file = basename($_FILES["news_photo"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($uploaded_file,PATHINFO_EXTENSION);
    $target_file = $target_dir . "news_photo." . $imageFileType;
    
    // Check if image file is a actual image or fake image / not there
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["news_photo"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".<br />";
            $uploadOk = 1;
            // Check file size
            if ($_FILES["news_photo"]["size"] > 5000000) {
                echo "<span style='color:red'>Sorry, your file is too large.</span><br />";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "jpeg") {
                echo "<span style='color:red'>Only JPG or JPEG file extensions are allowed.</span><br />";
                $uploadOk = 0;
            }

            /*if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                echo "<span style='color:red'>Only JPG, JPEG, PNG & GIF files are allowed.</span><br />";
                $uploadOk = 0;
            }*/

            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "<span style='color:red'>Sorry, your file was not uploaded.</span><br /><br /><br />";
            // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["news_photo"]["tmp_name"], $target_file)) {
                    echo "<span style='color:green'>The file ". basename( $_FILES["photo"]["name"]). " has been uploaded.</span><br /><br /><br />";
                } else {
                    echo "<span style='color:red'>Sorry, there was an error uploading your file.</span><br /><br /><br />";
                }
            }
        } else {
            echo "<span style='color:red'>Valid file not present</span><br /><br /><br />";
            $uploadOk = 0;
        }
    }
    

    echo "<br /><br />NEWS DETAILS:<br/>";
    echo "Headline:".str_replace($replaced,$replacer,$news_headline)."<br />"; //edited
    echo "Article link: $article_link<br />";
    
    echo "<br /><br /><br /><br />";
    echo "<a href='index.html'><-- Back to form</a>";
    

    

    $news_array = array($news_headline, $article_link);
    $news_update = json_encode($news_array);

    $file = fopen("news.json","w");
    echo "<br /><br />" . fwrite($file, $news_update);
    fclose($file);

    echo($news_update);


    
?>

</body>
</html>