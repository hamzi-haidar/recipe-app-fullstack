<?php

require "../../config.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["id"], $data["name"], $data["steps"], $data["ingredients"])) {
    echo json_encode(["message" => "Invalid input", "status" => "unsuccessful"]);
    exit;
  }

  $id = $data["id"];
  $name = $data["name"];
  $steps = $data["steps"];
  $ings = $data["ingredients"];

  if ($name == "" || $steps == "" || count($ings) == 0) {
    echo "inputs cant be empty";
    exit;
  }

  try {
    $stmt = $conn->prepare('update recipes set name=?, steps=? where id=?');
    $stmt->bind_param('ssi', $name, $steps, $id);
    $stmt->execute();

    $stmt = $conn->prepare('select ing_id, quantity, measurement from recipe_ingredients where recipe_id=?');
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

      $stmt = $conn->prepare('insert into recipe_ingredients (recipe_id, ing_id, quantity, measurement) values (?,?,?,?)');

      foreach ($ings as $ing) {
        $stmt->bind_param('iiis', $id, $ing["ing_id"], $ing["quantity"], $ing["measurement"]);
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
  echo "Only POST methods are allowed";
}
