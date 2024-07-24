<?php

require "../../config.php";

if ($_SERVER["REQUEST_METHOD"] ==  "POST") {

  $data = json_decode(file_get_contents("php://input"), true);


  if (!isset($data["user_name"], $data["email"], $data["password"])) {
    echo json_encode(["message" => "Invalid inputs", "status" => "insuccessful"]);
  };

  $user_name = $data["user_name"];
  $email = $data["email"];
  $password = $data['password'];

  if ($user_name == "" || $email == "" || $password == "") {
    echo json_encode(["message" => "inputs can't be empty", "status" => "unsuccessful"]);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "invalid email address", "status" => "unsuccessful"]);
    exit;
  }

  if (strlen($password) < 8) {
    echo json_encode(["message" => "Password should be 8 characters or more", "status" => "unsuccessful"]);
    exit;
  }

  // use it if you want the password to contain atleast one symbol
  // if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
  //   echo json_encode(["message" => "Password should contain at least one symbol", "status" => "unsuccessful"]);
  //   exit;
  // }

  try {

    $stmt_username = $conn->prepare("select id from users where user_name = ?");
    $stmt_username->bind_param("s", $user_name);
    $stmt_username->execute();
    $results_username = $stmt_username->get_result();

    $stmt_email = $conn->prepare("select id from users where email = ?");
    $stmt_email->bind_param("s", $email);
    $stmt_email->execute();
    $results_email = $stmt_email->get_result();

    if ($results_username->num_rows > 0 && $results_email->num_rows > 0) {
      echo json_encode(["message" => "Username and email already exist", "status" => "unsuccessful"]);
      exit;
    }

    if ($results_username->num_rows > 0) {
      echo json_encode(["message" => "Username already exists", "status" => "unsuccessful"]);
      exit;
    }

    if ($results_email->num_rows > 0) {
      echo json_encode(["message" => "Email already exists", "status" => "unsuccessful"]);
      exit;
    }

    $password = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("insert into users (user_name, email, password) values (?,?,?)");
    $stmt->bind_param("sss", $user_name, $email, $password);
    $stmt->execute();

    echo json_encode(["message" => "Signup successful", "status" => "success"]);
  } catch (Exception $e) {
    echo json_encode(["message" => "Couldn't add user", "status" => "unsuccessful"]);
  }
} else {
  echo json_encode(["message" => "Only POST methods are allowed", "status" => "unsuccessful"]);
}
