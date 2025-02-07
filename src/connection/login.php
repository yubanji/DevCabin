<?php
include 'connection.php'; // Ensure this file exists and works

// Set headers for JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Capture output to prevent breaking JSON response
ob_start();

// Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    ob_end_clean(); // Clear output buffer
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

if (!$username || !$password) {
    ob_end_clean();
    echo json_encode(["error" => "Username and password are required"]);
    exit;
}

// Check if user exists
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    error_log("Stored Password: " . $user['password']);
    error_log("Entered Password: " . $password);

    if (password_verify($password, $user['password'])) {
        ob_end_clean();
        echo json_encode(["message" => "Login successful!", "token" => md5(uniqid())]);
    } else {
        ob_end_clean();
        echo json_encode(["error" => "Invalid username or password"]);
    }
} else {
    ob_end_clean();
    echo json_encode(["error" => "Invalid username or password"]);
}

$stmt->close();
$conn->close();
?>
