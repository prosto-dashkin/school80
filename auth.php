<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Школа №80</title>
    <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css" />
<script src="js/jquery-2.1.1.js"></script>    <!--/jquery-1.11.1.min.js-->
<script type="text/javascript" src="js/index.js"></script>
<script src="js/jquery.mobile-1.4.5.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  
  </head>
  <body>
       
 <div data-role="page" id="auth" >
      <div data-role="header" data-position="fixed" data-add-back-btn="true">
        <h1>Вход</h1>
      </div>
      <div data-role="content" >	
       <?php
       var_dump($_POST);
       if ($_POST['login']!='') {
         $data = "welcome, ".$_POST['login'];
         
       }
       else {
         $data = 'введите логин и пароль!';
       }
       echo $data;
       ?>
        <a data-role="button" data-inverse="true"
          href="index.html" data-ajax="false">Close</a>
      </div>
     
    </div>   
         
    
</body>
</html>