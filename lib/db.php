<?php
/*
 * Подключение к базе данных  
 */
$dbloc ="mysql.hostinger.ru"; 
$dbname ="u911437298_s80"; 
$dbuser ="u911437298_s80"; 
$dbpass ="tushkanchik"; 
if ($_SERVER["SERVER_NAME"] == "localhost") { 
 $dbloc ="localhost"; 
 $dbuser ="root"; 
 $dbpass =""; 
 }
 return substr_replace();
 
$dsn = "mysql:host={$dbloc}"; 
$conn = new PDO($dsn, $dbuser, $dbpass); 
$conn->exec("SET CHARACTER SET utf8"); 

echo "соединение установлено";

