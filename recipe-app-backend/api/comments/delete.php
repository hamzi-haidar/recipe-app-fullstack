<?php

require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["id"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  }

  $id = $data["id"];

  try {

    $stmt = $conn->prepare("delete from comments where id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["message" => "comment deleted successfully", "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "couldn't delete comment", "status" => "unsuccessful"]);
  }
} else {
  echo "Only POST methods are allowed";
}
