<?php
// get_categories.php
include 'db_config.php';

header("Content-Type: application/json");

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed.']);
    exit();
}

try {
    // Query to get distinct categories
    $query = "SELECT DISTINCT category FROM apis";
    $result = $conn->query($query);
    $categories = [];

    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['category'];
    }

    echo json_encode($categories);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
