<?php
session_start();
include 'dbh.php';

$eid = $_POST['eid'];
$pwd = $_POST['pwd'];



$sql = "SELECT * FROM users WHERE eid='$eid'";
$result = mysqli_query($conn, $sql);

if ($row = mysqli_fetch_assoc($result)) {
echo 0;
} else {
  $sqlnew = "INSERT INTO users (eid, pwd)
  VALUES ('$eid', '$pwd')";
  $resultnew = mysqli_query($conn, $sqlnew);
  include 'login.php';
}
//header("Location: index.html");
