<?php
/*
 * создает json файл;
 */

//include "db.php";
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

$dsn = "mysql:host={$dbloc}"; 
$conn = new PDO($dsn, $dbuser, $dbpass); 
$conn->exec("SET CHARACTER SET utf8"); 

/*
 * запрос к бд - фомируем новостную ленту
 */
if (isset($_GET['target'])&&($_GET['target']=='like')){
  $sql = "UPDATE `u911437298_s80`.`news` SET `likes` = `likes`+ 1 where `id` = ".$_GET['id']." ;";
  $result = $conn->query($sql);
  return true;
}

$sql = "SELECT * FROM `u911437298_s80`.`news` ORDER BY `id` DESC";
$result = $conn->query($sql);
$html1 = '{"article": [';
$html = '';      
if ($result) {
while ($row = $result->fetch(PDO::FETCH_OBJ)) {
  $addition = str_replace('"','\"',$row->addition);
  $title = str_replace('"','\"',$row->title);
  $content = str_replace('"','\"',$row->content);
  $html .= '{"id": "'.$row->id.'", "title": "'.$title.'", "content":"'.$content.'", "date":"'.$row->date.'", "likes":"'.$row->likes.'", "addition":"'.$addition.'" }, '; 
}
}
if ($html=='') {
 $html = '{"none":"Нет ни одной записи"}';
}
else {
  $html = substr($html,0,-2);
  $html = $html1.$html.' ] }';
}
$handle = fopen("../resource/news.json",'w');
fwrite($handle, $html); 
fclose($handle);

    