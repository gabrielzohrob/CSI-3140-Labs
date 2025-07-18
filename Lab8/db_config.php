<?php
$pdo = new PDO("mysql:host=localhost;dbname=restaurant", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
