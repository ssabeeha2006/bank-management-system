include "db.php";
<?php
$host = "shuttle.proxy.rlwy.net";
$user = "root";
$password = "YOUR_PASSWORD"; // paste from Railway
$database = "railway";
$port = 54756;

$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>