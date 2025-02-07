<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL); 
ini_set('display_errors', 1);

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $employee_id = $_POST['employee_id'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = password_hash($_POST['password'] ?? '', PASSWORD_BCRYPT);
    $last_name = $_POST['last_name'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $company_email = $_POST['company_email'] ?? '';
    $job_description = $_POST['job_description'] ?? '';

    $stmt = $conn->prepare("SELECT employee_id FROM users WHERE employee_id = ?");
    $stmt->bind_param("s", $employee_id);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        echo json_encode(["error" => "Employee ID already exists!"]);
        exit();
    }

    if (!preg_match("/@ekonek\.com$/", $company_email)) {
        echo json_encode(["error" => "Only @ekonek.com emails are allowed!"]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO users (employee_id, username, password, last_name, first_name, company_email, job_description) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $employee_id, $username, $password, $last_name, $first_name, $company_email, $job_description);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to register user."]);
    }

    $stmt->close();
}
?>
