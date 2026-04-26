<?php

$DATABASE_URL = getenv("DATABASE_URL");

$db = parse_url($DATABASE_URL);

$conn = new mysqli(
    $db["host"],
    $db["user"],
    $db["pass"],
    ltrim($db["path"], "/"),
    $db["port"]
);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>