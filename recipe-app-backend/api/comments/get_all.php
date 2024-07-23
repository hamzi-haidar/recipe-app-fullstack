<?php
require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $recipe_id = $_GET["recipe_id"];


  try {

    $stmt = $conn->prepare("select c.id, c.comment, u.user_name from comments c 
    join users u on c.user_id = u.id
    where recipe_id = ? ");
    $stmt->bind_param("i", $recipe_id);
    $stmt->execute();
    $results = $stmt->get_result();
    $comments = [];
    while ($row = $results->fetch_assoc()) {
      $comments[] = $row;
    }

    echo json_encode(["message" => $comments, "status" => "successful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "couldn't get comments", "status" => "unsuccessful"]);
  }
} else {
  echo "Only GET methods are allowed";
}
