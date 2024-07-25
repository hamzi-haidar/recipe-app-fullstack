<?php

require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["user_id"], $data["recipe_id"])) {
    echo json_encode(["message" => "Invalid inputs", "status" => "unsuccessful"]);
    exit;
  }

  $user_id = $data["user_id"];
  $recipe_id = $data["recipe_id"];

  try {
    $stmt = $conn->prepare("insert into stars (user_id, recipe_id) values (?,?)");
    $stmt->bind_param("ii", $user_id, $recipe_id);
    $stmt->execute();

    echo json_encode(["message" => "Recipe stared", "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "Coudn't star recipe", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
