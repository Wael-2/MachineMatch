<?php

require_once "../config/database.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM sellers";

$conditions = [];
$params = [];

if(isset($_GET["company_name"])) {
    $conditions[] = "company_name = :company_name";
    $params["company_name"] = $_GET["company_name"];
}

if(isset($_GET["city"])) {
    $conditions[] = "city = :city";
    $params["city"] = $_GET["city"];
}

if (isset($_GET["id"])) {
    $conditions[] = "id = :id";
    $params["id"] = $_GET["id"]; 
}

if(!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $pdo->prepare($sql);

$stmt->execute($params);

$sellers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sellers);