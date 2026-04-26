<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$cardNo = $data->cardNo;
$pin = $data->pin;

$sql = "SELECT * FROM users WHERE cardNo='$cardNo' AND pin='$pin'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>