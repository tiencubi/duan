<?php
$server_username = "root";
$server_pass	 = "";
$server_host	 = "localhost";
$server_database = "webadmin";

$conn = mysqli_connect( $server_host, $server_username, $server_pass, $server_database) or die("Can't connect to the database");
mysqli_query($conn, "SET NAMES 'UTF8'");

?>