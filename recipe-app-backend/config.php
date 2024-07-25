<?php

$server_name = "localhost";
$user_name = "root";
$password = "";
$database_name = "recipe_app_db";

$conn = new mysqli($server_name, $user_name, $password, $database_name);



if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start([
    'cookie_lifetime' => 86400,
    'cookie_secure' => true,
    'cookie_httponly' => true,
    'use_strict_mode' => true,
    'use_cookies' => true,
    'use_only_cookies' => true,
    'sid_length' => 128,
]);

$timeout = 3600;
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $timeout)) {
    session_unset();
    session_destroy();
    echo json_encode(["message" => "Session expired", "status" => "unsuccessful"]);
    exit;
}
$_SESSION['last_activity'] = time();
