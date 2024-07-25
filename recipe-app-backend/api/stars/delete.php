<?php

require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["recipe_id"], $data["user_id"])) {
    echo json_encode(["message" => "Invalid inputs", "status" => "unsuccessful"]);
    exit;
  }

  $recipe_id = $data["recipe_id"];
  $user_id = $data["user_id"];



  try {

    $stmt = $conn->prepare("delete from stars where recipe_id = ? and user_id = ?");
    $stmt->bind_param("ii", $recipe_id, $user_id);
    $stmt->execute();

    echo json_encode(["message" => "Recipe unstared", "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "Coudn't remove star", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
