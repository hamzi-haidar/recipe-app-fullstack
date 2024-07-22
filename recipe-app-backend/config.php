<?php

$server_name = "localhost";
$user_name = "root";
$password = "";
$database_name = "recipe_app_db";

$conn = new mysqli($server_name, $user_name, $password, $database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

