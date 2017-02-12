<?php
session_start();
include 'dbh.php';

$userid=$_POST['userid'];


$sql = "SELECT * FROM char_data WHERE id='$userid'";
$res = mysqli_query($conn, $sql);



$row = mysqli_fetch_assoc($res);
 echo "['".$row['char_name']."','".$row['char_lvl']."','".$row['char_gold']."','".$row['stats']."','".$row['tut']."','".$row['playerHealth']."','"
 .$row['playerExp']."','".$row['invItemArray']."','".$row['invItemCountArray']."'];";
// echo "playerName = " . $row['char_name'] . ";";
// echo "baseLevel = " . $row['char_lvl'] . ";";
// echo "currentGold = " . $row['char_gold'] . ";";
