<?php
require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["recipe_id"], $data["user_id"], $data["comment"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  };

  $recipe_id = $data["recipe_id"];
  $user_id = $data["user_id"];
  $comment = $data["comment"];

  if ($comment == "") {
    echo json_encode(["message" => "comment can't be empty", "status" => "unsuccessful"]);
    exit;
  }

  try {

    $stmt = $conn->prepare("insert into comments (recipe_id, user_id, comment) values (?,?,?)");
    $stmt->bind_param("iis", $recipe_id, $user_id, $comment);
    $stmt->execute();

    echo json_encode(["message" => "comment was added successfully", "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "comment couldn't be added", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
