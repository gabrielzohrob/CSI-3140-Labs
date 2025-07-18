<?php
require 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$query = $data['query'];

try {
  $stmt = $pdo->query($query);
  if ($stmt->columnCount()) {
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  } else {
    echo json_encode(['success' => true]);
  }
} catch (Exception $e) {
  http_response_code(400);
  echo json_encode(['error' => $e->getMessage()]);
}
?>
