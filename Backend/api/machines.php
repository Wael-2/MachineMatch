<?php

require_once "../config/database.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM machines";

$conditions = [];
$params = [];

if (isset($_GET["category"])) {
    $conditions[] = "category = :category";
    $params["category"] = $_GET["category"];
}

if (isset($_GET["location"])) {
    $conditions[] = "location = :location";
    $params["location"] = $_GET["location"];
}

if (isset($_GET["maxPrice"])) {
    $conditions[] = "price <= :maxPrice";
    $params["maxPrice"] = $_GET["maxPrice"];
}

if (isset($_GET["manufacturer"])) {
    $conditions[] = "manufacturer = :manufacturer";
    $params["manufacturer"] = $_GET["manufacturer"]; 
}

if (isset($_GET["max_working_hours"])) {
    $conditions[] = "working_hours <= :max_working_hours";
    $params["max_working_hours"] = $_GET["max_working_hours"];
}

if (isset($_GET["min_year"])) {
    $conditions[] = "year >= :min_year";
    $params["min_year"] = $_GET["min_year"];
}

if (isset($_GET["id"])) {
    $conditions[] = "id = :id";
    $params["id"] = $_GET["id"]; 
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $pdo->prepare($sql);

$stmt->execute($params);

$machines = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($machines);