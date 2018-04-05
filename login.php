<?php
session_start();
?>
<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Đăng nhập</title>
      <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>

<body>
<?php
include("lib/config.php");

$username = '';
$password = '';

if(isset($_POST['btn_submit'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $username = strip_tags($username);
  $username = addslashes($username);
  $password = strip_tags($password);
  $password = addslashes($password);
  if(empty($username)) {
    echo "<script>alert('Tên tài khoản không được để trống.')</script>";
  }
  elseif(empty($password)) {
    echo "<script>alert('Mật khẩu không được để trống.')</script>";
  }
  else
  {
    $sql_exam = "SELECT * FROM tbltempdata WHERE username = '$username' AND password = '$password'";
    $query_exam = mysqli_query($conn, $sql_exam);
    $num_rows_exam = mysqli_num_rows($query_exam);
    if($num_rows_exam == 0)
       {
        echo "<script>alert('Tên tài khoản hoặc mật khẩu không đúng.')</script>";
       }
       else {
        while($data = mysqli_fetch_array($query_exam)) {
          $_SESSION["id"] = $data["id"];
          $_SESSION["username"] = $data["username"];
          $_SESSION["email"] = $data["email"];
          $_SESSION["status"] = $data["status"];
          $_SESSION["permission"] = $data["permission"];
          $_SESSION["passcode"] = $data["passcode"];
          header('Location: connecting.php');
        }
       }
  }
}
?>
<div class="container">
    <form action="#" method="post" name="form_login">
      <span style="color: #67A84F"><h1>Đăng nhập thành viên</h1></span>
     
        <h2>Tên tài khoản:</h2>
<input type="text" name="username" placeholder="accountname" value="<?php echo $username; ?>" autofocus>
      <h2>Mật khẩu:</h2>
<input type="password" name="password" placeholder="***************">
      <a href="register.php"><button type="submit" name="btn_submit">Đăng nhập</button></a>
      <p>- hoặc -</p>
  <a href="fb.php"><button type="submit" class="button_btn" value="Submit">Đăng nhập bằng Facebook</button></a>
    </form>
</div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>