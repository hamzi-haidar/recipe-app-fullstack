<?php
require "../../config.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["name"], $data["steps"], $data["description"], $data["user_id"], $data["image_url"], $data["ingredients"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  };

  $name = $data["name"];
  $steps = $data["steps"];
  $description = $data["description"];
  $user_id = $data["user_id"];
  $image_url = $data["image_url"];
  $ings = $data["ingredients"];


  if ($name == "" || $steps == "" || count($ings) == 0 || $user_id == 0) {
    echo json_encode(["message" => "inputs can't be empty", "status" => "unsuccessful"]);
    exit;
  }


  try {
    $stmt = $conn->prepare('insert into recipes (name, steps,description, user_id, image_url) values (?,?,?,?,?)');
    $stmt->bind_param('sssis', $name, $steps, $description, $user_id, $image_url);
    $stmt->execute();
    $recipe_id = $stmt->insert_id;

    if ($stmt->affected_rows === 0) {
      throw new Exception("couldn't add recipe");
    }

    $stmt = $conn->prepare('insert into recipe_ingredients (recipe_id, ingredient, quantity, measurement) values (?,?,?,?)');

    foreach ($ings as $ing) {
      $stmt->bind_param('isis', $recipe_id, $ing["ingredient"], $ing["quantity"], $ing["measurement"]);
      $stmt->execute();

      if ($stmt->affected_rows === 0) {
        throw new Exception("couldn't add recipe_ingredients");
      }
    }

    echo json_encode(["message" => "$name added to recipes", "status" => "successful"]);
  } catch (Exception $e) {
    echo json_encode(["message" => $e->getMessage(), "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
