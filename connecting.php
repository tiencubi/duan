<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
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
<?php
if(isset($_SESSION["username"])) {
	echo "<meta http-equiv='refresh' content='10; url=http://localhost:8080/duan/index.php'>";
}
 else {
 header('Location: login.php');
 }

?>
<div class="div_page_transfer">		
	<br /><img src="img/icon_loading.gif">
	<br /><br /><a href="#"  class="btn-loading">Đang kết nổi đến hệ thống...</a>
</div>
</body>
</html>