<?php
include "db.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

// If no input
if (!$data || !isset($data->cardNo) || !isset($data->pin)) {
    echo json_encode(["status" => "no_input"]);
    exit();
}

$cardNo = $data->cardNo;
$pin = $data->pin;

// Query DB
$sql = "SELECT * FROM users WHERE cardNo='$cardNo' AND pin='$pin'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>