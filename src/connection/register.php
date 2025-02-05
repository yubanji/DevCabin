<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL); 
ini_set('display_errors', 1); 

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $employee_id = $_POST['employee_id'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = password_hash($_POST['password'] ?? '', PASSWORD_BCRYPT);
    $last_name = $_POST['lastname'] ?? ''; 
    $first_name = $_POST['firstName'] ?? '';
    $company_email = $_POST['company_email'] ?? '';
    $jobDesc = $_POST['jobDesc'] ?? '';

    if (empty($employee_id) || empty($username) || empty($password)) {
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $sql = "INSERT INTO users (employee_id, username, password, lastname, firstName, company_email, jobDesc) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $employee_id, $username, $password, $last_name, $first_name, $company_email, $jobDesc);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to register user."]);
    }

    $stmt->close();
}
?>
