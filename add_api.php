<?php
// add_api.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_config.php'; // Ensure this path is correct

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed.']);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->url) && isset($data->description)) {
    $name = trim($data->name);
    $url = trim($data->url);
    $description = trim($data->description);
    $category = isset($data->category) ? trim($data->category) : 'General';

    // Prepare and execute SQL statement
    $stmt = $conn->prepare("INSERT INTO apis (name, url, description, category) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $url, $description, $category);

    if ($stmt->execute()) {
        echo json_encode(["success" => "API added successfully."]);
    } else {
        echo json_encode(["error" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Incomplete data. All fields are required."]);
}

$conn->close();
?>
