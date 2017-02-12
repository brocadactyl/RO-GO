<?php
session_start();
include 'dbh.php';

$playername=$_POST['playername'];
$playerlvl=$_POST['playerlvl'];
$playergold=$_POST['playergold'];
$tut=$_POST['tut'];
$hp=$_POST['playerHealth'];
$exp=$_POST['playerExp'];
// $playergold=$_POST['stats'];
//Insert query
$sql = mysqli_query($conn, "insert into char_data(char_name, char_lvl, char_gold, tut, stats, playerHealth, playerExp) values ('$playername', '$playerlvl', '$playergold', '$tut', '0', '$hp', '$exp')");

$result = mysqli_query($conn, $sql);
