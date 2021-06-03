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
    
    $id_number = (int)$_POST["id_number"];
    
    $first_name = $_POST["first_name"]; //edited
    $first_name_sql = quotes_replace($first_name); //edited
    $last_name = $_POST["last_name"]; //edited
    $last_name_sql = quotes_replace($last_name); //edited
    $id_name = str_replace(
        $replaced,$eraser,str_replace(
            $replacer,$eraser,mb_strtolower($first_name) . "-" . mb_strtolower($last_name))); //edited
    $bio = $_POST["bio"]; //edited
    $bio_sql = quotes_replace($bio); //edited
    $author_link = $_POST["author_link"];
    $poem_title = $_POST["poem_title"]; //edited
    $poem_title_sql = quotes_replace($poem_title); //edited
    $epigraph_text = $_POST["epigraph_text"]; //edited
    $epigraph_text_sql = quotes_replace($epigraph_text); //edited
    $poem_text = $_POST["poem_text"]; //edited
    $poem_text_sql = quotes_replace($poem_text); //edited
    $featured_book_title = $_POST["featured_book_title"];
    $featured_book_link = $_POST["featured_book_link"];
    $translated = 0;
    if ($_POST["translated"] == "Yes") {
        $translated = 1;
    }
    $original_epigraph = $_POST["original_epigraph"];
    $original_epigraph_sql = quotes_replace($original_epigraph);
    $original_text = $_POST["original_text"];
    $original_text_sql = quotes_replace($original_text);
    $translator_first_name = $_POST["translator_first_name"]; //edited
    $translator_first_name_sql = quotes_replace($translator_first_name); //edited
    $translator_last_name = $_POST["translator_last_name"]; //edited
    $translator_last_name_sql = quotes_replace($translator_last_name); //edited
    $audio = 0;
    if ($_POST["audio"] == "Yes") {
        $audio = 1;
    }
    $audio_embed = $_POST["audio_embed"];
    $video = 0;
    if ($_POST["video"] == "Yes") {
        $video = 1;
    }
    $video_embed = $_POST["video_embed"];
    $video_start = 0;
    if (is_numeric($_POST["video_start"]) && (int)$_POST["video_start"] > 0) {
        $video_start = (int)$_POST["video_start"];
    }
    $video_end = 0;
    if (is_numeric($_POST["video_end"]) && (int)$_POST["video_end"] > 0) {
        $video_end = (int)$_POST["video_end"];
    }
    $themes = $_POST["themes"];
    $themes_sql = str_replace(", ",",",$themes);
    $user_themes = $_POST["user_themes"];
    $user_themes_sql = str_replace(", ",",",$user_themes);


    //IMAGE UPLOAD AND READ-OUT
    echo "IMAGE UPLOAD:<br />";
    $target_dir = "img/author_photos/";
    $uploaded_file = basename($_FILES["photo"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($uploaded_file,PATHINFO_EXTENSION);
    $target_file = $target_dir . $id_name . "." . $imageFileType;
    // Check if image file is a actual image or fake image / not there
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["photo"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".<br />";
            $uploadOk = 1;
            // Check file size
            if ($_FILES["photo"]["size"] > 5000000) {
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
                if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
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



    echo "POET DETAILS:<br/>";
    echo "First Name:".str_replace($replaced,$replacer,$first_name)."<br />"; //edited
    echo "Last Name:".str_replace($replaced,$replacer,$last_name)."<br />"; //edited
    echo "Bio: $bio<br />"; //edited
    echo "Author link: $author_link<br />";
    echo "Photo:" . $id_name . "." . $imageFileType . "<br />";
    echo "Poem Title:".str_replace($replaced,$replacer,$poem_title)."<br />"; //edited
    echo "Epigraph: $epigraph_text<br />"; //edited
    echo "Poem Text: $poem_text<br />"; //edited
    echo "Featured book title: $featured_book_title<br />";
    echo "Featured book link: $featured_book_link<br />";
    echo "Translated: $translated <br />";
    echo "Original Epigraph: $original_epigraph<br />";
    echo "Original Text: $original_text<br />";
    echo "Translator First Name:".str_replace($replaced,$replacer,$translator_first_name)."<br />"; //edited
    echo "Translator Last Name:".str_replace($replaced,$replacer,$translator_last_name)."<br />"; //edited
    echo "Audio: $audio <br />";
    echo "Audio embed code:"; echo str_replace($replaced,$replacer,$audio_embed); echo "<br />";
    echo "Video: $video <br />";
    echo "Video embed code:"; echo str_replace($replaced,$replacer,$video_embed); echo "<br />";
    echo "Video start: $video_start <br />";
    echo "Video end: $video_end <br />";
    echo "Main themes: $themes <br />";
    echo "User-added themes: $user_themes <br />";
    
    echo "<br /><br />";
    echo "ID number: $id_number <br />";
    echo "ID name: $id_name <br />";
    
    echo "<br /><br /><br /><br />";
    echo "<a href='index.html'><-- Back to form</a>";
    
    //connecting to POETSDB
    $servername = "db713125457.db.1and1.com";
    $username = "dbo713125457";
    $password = "H3xham66";
    $dbname = "db713125457";
    
    $conn = new mysqli($servername, $username, $password,$dbname);
    
    //charset
    mysqli_set_charset($conn, 'utf8');

    //checking
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    //editing record
    $sql = "UPDATE poetsdb
    SET id_name='$id_name', first_name='$first_name_sql', last_name='$last_name_sql', author_link='$author_link', poem_title='$poem_title_sql', epigraph_text='$epigraph_text_sql', poem_text='$poem_text_sql', featured_book_title='$featured_book_title', featured_book_link='$featured_book_link', translated='$translated',  original_epigraph='$original_epigraph_sql', original_text='$original_text_sql', translator_first_name='$translator_first_name_sql', translator_last_name='$translator_last_name_sql', audio=$audio, audio_embed='$audio_embed', video=$video, video_embed='$video_embed', video_start='$video_start', video_end='$video_end', bio='$bio_sql', themes='$themes_sql', user_themes='$user_themes_sql'
    WHERE id_number=$id_number";
    
    if ($conn->query($sql) === TRUE) {
        echo "<br /><br />POET UPDATED! :-)";
    } else {
        echo "<br /><br />ERROR: Poet not updated.<br />" . sql . "<br />" . $conn->error;
    }

    $conn->close();
    
?>

</body>
</html>