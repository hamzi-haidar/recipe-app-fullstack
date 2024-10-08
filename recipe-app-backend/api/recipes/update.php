<?php

require "../../config.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["id"], $data["name"], $data["steps"],  $data["description"], $data["image_url"], $data["ingredients"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  }

  $id = $data["id"];
  $name = $data["name"];
  $steps = $data["steps"];
  $description = $data["description"];
  $image_url = $data["image_url"];
  $ings = $data["ingredients"];

  if ($name == "" || $steps == "" || count($ings) == 0) {
    echo json_encode(["message" => "inputs can't be empty", "status" => "unsuccessful"]);
    exit;
  }

  try {
    $stmt = $conn->prepare('update recipes set name=?, steps=?, description=?, image_url=? where id=?');
    $stmt->bind_param('ssssi', $name, $steps,  $description, $image_url, $id);
    $stmt->execute();

    $stmt = $conn->prepare('select ingredient, quantity, measurement from recipe_ingredients where recipe_id=?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $results = $stmt->get_result();

    $old_ings = [];
    while ($row = $results->fetch_assoc()) {
      $old_ings[] = $row;
    }

    if (count($old_ings) > 0 && $old_ings != $ings) {
      $stmt = $conn->prepare('delete from recipe_ingredients WHERE recipe_id = ?');
      $stmt->bind_param('i', $id);
      $stmt->execute();

      if ($stmt->affected_rows === 0) {
        throw new Exception("Couldn't delete old ingredients");
      }

      $stmt = $conn->prepare('insert into recipe_ingredients (recipe_id, ingredient, quantity, measurement) values (?,?,?,?)');

      foreach ($ings as $ing) {
        $stmt->bind_param('isis', $id, $ing["ingredient"], $ing["quantity"], $ing["measurement"]);
        $stmt->execute();

        if ($stmt->affected_rows === 0) {
          throw new Exception("Couldn't add new recipe ingredient");
        }
      }
    }

    echo json_encode(["message" => "$name was updated", "status" => "successful"]);
  } catch (Exception $e) {
    echo json_encode(["message" => $e->getMessage(), "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
