<?php

$url = "mysql://root:sabeeha@shuttle.proxy.rlwy.net:54756/railway";

$dbparts = parse_url($url);

$host = $dbparts['host'];
$user = $dbparts['user'];
$password = $dbparts['pass'];
$dbname = ltrim($dbparts['path'],'/');
$port = $dbparts['port'];

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";
?>