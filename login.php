<?php
session_start();
include 'dbh.php';

$eid = $_POST['eid'];
$pwd = $_POST['pwd'];

$sql = "SELECT * FROM users WHERE eid='$eid' AND pwd='$pwd'";


$result = mysqli_query($conn, $sql);

if (!$row = mysqli_fetch_assoc($result)) {
echo 0;
} else {
	echo $row['id'];
}

//header("Location: index.html");
