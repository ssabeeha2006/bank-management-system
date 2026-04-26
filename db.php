<?php

$DATABASE_URL = getenv("DATABASE_URL");

if (!$DATABASE_URL) {
    die("DATABASE_URL not set");
}

$db = parse_url($DATABASE_URL);

$host = $db["host"];
$user = $db["user"];
$password = $db["pass"];
$dbname = ltrim($db["path"], "/");
$port = $db["port"];

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>