<?php
session_start();
session_destroy();
?>
<html>
<head>
<title>Waiting...</title>
<meta http-equiv="refresh" content="10; url=http://localhost:8080/duan/login.php">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css" media="all">
body{background:url("img/bkg-body.png") repeat; font-family: Tahoma; font-size: 13px;}
.div_page_transfer{width: 400px;margin: 100px auto; padding: 30px;text-align: center;}
.div_page_transfer a.btn-loading{width:100%;height:51px;text-decoration:none;border:none;height:51px;float:left;text-align:center;color:#000;line-height:51px;padding-right:40px;padding-left:7px;text-shadow: 0 1px 0 #ccc;}

.div_page_transfer a.btn-loading:hover{}

</style>
</head>  
<body>

<div class="div_page_transfer">
			
	<br /><img src="img/icon_loading.gif">
	<br /><br /><a href="#"  class="btn-loading">Quý khách đã thoát khỏi hệ thống</a>
</div>



</body>
</html>