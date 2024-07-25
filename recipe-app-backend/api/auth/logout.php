<?php
require "../../config.php";

session_unset();
session_destroy();

print_r($_SESSION);

echo json_encode(["message" => "Logged out successfully", "status" => "successful"]);
