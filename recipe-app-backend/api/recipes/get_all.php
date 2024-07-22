<?php

require '../../config.php';

if($_SERVER['REQUEST_METHOD'] == 'GET'){

  try { 
    $stmt = $conn->prepare('
    SELECT 
      r.id, 
      r.name, 
      r.steps,
      u.name AS user_name, 
      CONCAT("[", GROUP_CONCAT(
        CONCAT(\'{"ing_id":\', i.id, \',
        "name":"\', i.name, \'","quantity":"\', ri.quantity, \'","measurement":"\', ri.measurement, \'"}\')
        ), "]") AS ingredients
    FROM 
      recipes r
    JOIN 
      users u ON u.id = r.user_id
    JOIN 
      recipe_ingredients ri ON ri.recipe_id = r.id
    JOIN 
      ingredients i ON ri.ing_id = i.id
    GROUP BY 
      r.id
  ');

    $stmt->execute();
    $results = $stmt->get_result();
    $recipes = [];
    if($results->num_rows > 0){
      while($row = $results->fetch_assoc()){
        $row['ingredients'] = json_decode($row['ingredients'], true);
         $recipes[]=$row ;
      }
      echo json_encode(["recipes"=>$recipes, "status"=>"successful"]);
    }else{
      echo "no recipes to fetch";
    }

  } catch (Exception $e) {
    echo json_encode(["message" => "couldn't get recipes", "status" => "unsuccessful"]);
  }
}
else{
  echo 'Only GET requests are allowed'; 
};

