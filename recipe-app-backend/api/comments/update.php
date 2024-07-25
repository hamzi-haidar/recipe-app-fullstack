<?php
require "../../config.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["id"], $data["comment"])) {
    echo json_encode(["message" => "invalid inputs", "status" => "unsuccessful"]);
    exit;
  }

  $id = $data["id"];
  $comment = $data["comment"];

  if ($comment == "") {
    echo json_encode(["message" => "comment can't be empty", "status" => "unsuccessful"]);
    exit;
  }

  try {

    $stmt = $conn->prepare("update comments set comment=? where id=?");
    $stmt->bind_param("si", $comment, $id);
    $stmt->execute();

    echo json_encode(["message" => "comment updated successfully", "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "Couldn't update comment", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
