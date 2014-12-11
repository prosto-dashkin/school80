<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_GET['read']==1) {
    $html= '<div><h1>News number 1! The first realise of application!</h1>'
            . '<img src = "https://dl.dropboxusercontent.com/u/104607401/school80/new/photo.png" alt="interface"></div>';
    
}
else {
    $html = '<form method="POST" action="index.php" " >
     <input name="name">name<br>
     <input name="phone">phone<br>
     <input name="email">email<br>
     <input name="address">address<br>
     <input name="type">type<br>
     <input name="size">size<br>
     <input name="gender">gender<br>
     <input name="date">date<br>
     <input type=checkbox name="waste">waste<br>
     <input name="description">description<br>
     <button type="submit" name="submit">ok</button>
     </form>';
	 echo "No get";
}
echo $html;
//https://dl.dropboxusercontent.com/u/104607401/questions.json!;
$array = Array("a" => "Yes", "b" => "No");
$jsonData = array("response" => array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4));
$jsonString = json_encode($jsonData);
$_GET["response"] = $jsonString;
//$_GET["response"];