<?php

require "../../config.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $data = json_decode(file_get_contents("php://input"), true);

  if (!isset($data["email"], $data["password"])) {
    echo json_encode(["message" => "Invalid inputs", "status" => "unsuccessful"]);
    exit;
  };

  $email = $data["email"];
  $password = $data["password"];

  if ($email == "" || $password == "") {
    echo json_encode(["message" => "Inputs can't be empty", "status" => "unsuccessful"]);
    exit;
  }

  try {

    $stmt = $conn->prepare("select id,user_name, password, email from users where email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $results = $stmt->get_result();

    if ($results->num_rows > 0) {

      $user = $results->fetch_assoc();

      $hashed_password =  $user["password"];

      if (password_verify($password, $hashed_password)) {
        session_regenerate_id(true);
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["user_name"] = $user["user_name"];
        $_SESSION["email"] = $user["email"];
        $_SESSION["is_authenticated"] = true;

        print_r($_SESSION);

        $payload = [
          'iat' => time(),
          'exp' => time() + 30600,
          'sub' => $user["id"],
          'user_name' => $user["user_name"],
          'email' => $user["email"]
        ];

        echo json_encode([
          "user_id" => $user["id"],
          "user_name" => $user["user_name"],
          "email" => $user["email"],
          "isAuthenticated" => true
        ]);
        exit;
      }
    }

    echo json_encode(["message" => "Wrong credentials", "status" => "unsuccessful"]);
  } catch (Exception $e) {

    echo json_encode(["message" => "Failed to login", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
