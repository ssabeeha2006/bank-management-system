<?php

$host = "shuttle.proxy.rlwy.net";
$user = "root";
$password = "QukXncydiRRTXohqRbTBVLuaSQKLpltf";
$dbname = "railway";
$port = 54756;

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

?>