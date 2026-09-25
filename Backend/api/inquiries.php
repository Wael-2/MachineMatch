<?php

require_once "../config/database.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if(
    !isset($data["machine_id"]) ||
    !isset($data["name"]) ||
    !isset($data["email"]) ||
    !isset($data["message"])
) {
    http_response_code(400);

    echo json_encode([
        "error" => "Required fields are missing"
    ]);

    exit;
}

if(
    trim($data["name"]) === "" ||
    trim($data["email"]) === "" ||
    trim($data["message"]) === ""
) {
    http_response_code(400);

    echo json_encode([
        "error" => "Fields must not be empty"
    ]);

    exit;
}

if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        "error" => "Invalid email address"
    ]);

    exit;
}

$sql = "SELECT id FROM machines WHERE id = :id";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    "id" => $data["machine_id"]
]);

$machine = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$machine) {
    http_response_code(404);

    echo json_encode([
        "error" => "Machine not found"
    ]);

    exit;
}

$sql = "INSERT INTO inquiries(machine_id, name, email, message) VALUES(:machine_id, :name, :email, :message)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    "machine_id" => $data["machine_id"],
    "name" => $data["name"],
    "email" => $data["email"],
    "message" => $data["message"]
]);

http_response_code(201);

echo json_encode(["message" => "Inquiry created successfully"]);

