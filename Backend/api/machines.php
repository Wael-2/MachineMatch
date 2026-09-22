<?php

require_once "../config/database.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM machines";

$stmt = $pdo->query($sql);

$machines = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($machines);