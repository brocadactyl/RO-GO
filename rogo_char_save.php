<?php
session_start();
$link = mysqli_connect("127.0.0.1", "rogo_admin", "admin84!", "RoGO_db"); // Establishing Connection with Server..

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

//Fetching Values from URL
$userid=$_POST['userid'];
$playername=$_POST['playername'];
$playerlvl=$_POST['playerlvl'];
$playergold=$_POST['playergold'];
$stats=$_POST['stats'];
// $STR=$_POST['STR'];
// $VIT=$_POST['VIT'];
// $AGI=$_POST['AGI'];
// $DEX=$_POST['DEX'];
// $INT=$_POST['INT'];
// $LUK=$_POST['LUK'];
$tut=$_POST['tut'];
$hp=$_POST['playerHealth'];
$exp=$_POST['playerExp'];
$invItemArray=$_POST['invItemArray'];
$invItemCountArray=$_POST['invItemCountArray'];
//Insert query
$query = mysqli_query($link, "UPDATE char_data SET char_name='$playername', char_lvl='$playerlvl', char_gold='$playergold', stats='$stats', tut='$tut', playerHealth='$hp', playerExp='$exp', invItemArray='$invItemArray', invItemCountArray='$invItemCountArray' WHERE id='$userid'");
echo "Game Saved";
mysqli_close($link); // Connection Closed
?>
