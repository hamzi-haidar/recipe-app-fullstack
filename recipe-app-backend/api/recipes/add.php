<?php
require "../../config.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["name"], $data["steps"], $data["user_id"], $data["ingredients"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  };

  $name = $data["name"];
  $steps = $data["steps"];
  $user_id = $data["user_id"];
  $ings = $data["ingredients"];


  if ($name == "" || $steps == "" || count($ings) == 0 || $user_id == 0) {
    echo "inputs cant be empty";
    exit;
  }


  try {
    $stmt = $conn->prepare('insert into recipes (name, steps, user_id) values (?,?,?)');
    $stmt->bind_param('ssi', $name, $steps, $user_id);
    $stmt->execute();
    $recipe_id = $stmt->insert_id;

    if ($stmt->affected_rows === 0) {
      throw new Exception("couldn't add recipe");
    }

    $stmt = $conn->prepare('insert into recipe_ingredients (recipe_id, ing_id, quantity, measurement) values (?,?,?,?)');

    foreach ($ings as $ing) {
      $stmt->bind_param('iiis', $recipe_id, $ing["ing_id"], $ing["quantity"], $ing["measurement"]);
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
  echo "Only POST methods are allowed";
}
