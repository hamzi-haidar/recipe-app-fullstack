<?php
require '../../config.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

  try {
    $stmt = $conn->prepare('
    SELECT 
      r.id, 
      r.name, 
      r.steps,
      u.user_name, 
      s.count as stars,
      CONCAT("[", GROUP_CONCAT(
        CONCAT(\'{"ing_id":\', i.id, \',
        "name":"\', i.name, \'","quantity":"\', ri.quantity, \'","measurement":"\', ri.measurement, \'"}\')
        ), "]") as ingredients
    from 
      recipes r
    join 
      users u on u.id = r.user_id
    join 
      recipe_ingredients ri on ri.recipe_id = r.id
    join 
      ingredients i on ri.ing_id = i.id
   left join 
    (select recipe_id, count(id) as count
     from stars
     group by recipe_id) s on s.recipe_id = r.id
   group by
    r.id;
  ');

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
      echo "no recipes to fetch";
    }
  } catch (Exception $e) {
    echo json_encode(["message" => "couldn't get recipes", "status" => "unsuccessful"]);
  }
} else {
  echo 'Only GET requests are allowed';
};
