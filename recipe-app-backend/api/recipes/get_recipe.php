<?php
require '../../config.php';

// if (!isset($_SESSION["is_authenticated"]) || !$_SESSION["is_authenticated"]) {
//   echo json_encode(["message" => "Unauthorized", "status" => "unsuccessful"]);
//   exit;
// }


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

  $recipe_id = $_GET["recipe_id"];


  try {
    $stmt = $conn->prepare('
    SELECT 
      r.id, 
      r.name, 
      r.steps,
      r.image_url,
      u.user_name, 
      s.count as stars,
       CASE 
        WHEN EXISTS (
          SELECT 1
          FROM stars s2 
          WHERE s2.recipe_id = r.id AND s2.user_id = ?
        ) THEN 1
        ELSE 0
      END as is_starred,
      CONCAT("[", GROUP_CONCAT(
        CONCAT(\'{"ing_id":\', ri.id, \',
        "name":"\', ri.ingredient, \'","quantity":"\', ri.quantity, \'","measurement":"\', ri.measurement, \'"}\')
        ), "]") as ingredients
    from 
      recipes r 
    join
      users u on u.id = r.user_id
    join 
      recipe_ingredients ri on ri.recipe_id = r.id
   left join 
    (select recipe_id, count(id) as count
     from stars
     group by recipe_id) s on s.recipe_id = r.id
   where
    r.id = ?
   group by
    r.id
    ;
  ');

    $stmt->bind_param('ii', $user_id, $recipe_id);
    $stmt->execute();
    $results = $stmt->get_result();
    $recipes = [];
    if ($results->num_rows > 0) {
      while ($row = $results->fetch_assoc()) {

        $row['ingredients'] = json_decode($row['ingredients'], true);


        $recipes[] = $row;
      }
      echo json_encode(["recipes" => $recipes, "status" => "successful"]);
    } else {
      echo json_encode(["message" => "no recipes to fetch", "status" => "unsuccessful"]);
    }
  } catch (Exception $e) {
    echo json_encode(["message" => $e . "couldn't get recipes", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only GET methods are allowed", "status" => "unsuccessful"]);
};
