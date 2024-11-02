<?php
// get_apis.php
include 'db_config.php';

header("Content-Type: application/json");

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed.']);
    exit();
}

try {
    // Fetch all APIs
    $apiQuery = "SELECT * FROM apis";
    $apisResult = $conn->query($apiQuery);
    $apis = [];

    while ($row = $apisResult->fetch_assoc()) {
        $apis[] = $row;
    }

    echo json_encode($apis);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
