<?php

$conn = mysqli_connect("localhost", "rogo_admin", "admin84!", "RoGO_db");

if(!$conn) {
	die("Connection Failed: ".mysqli_connect_error());
}