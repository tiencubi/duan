<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Đăng ký</title>
      <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>

<body>
<?php
include("lib/config.php");
$passcode = md5(uniqid(rand())) . md5(uniqid(rand())) ;
//gan username, email, password trong
$username = '';
$email    = '';
$password = '';

if(isset($_POST['btn_submit'])) {
  $username = $_POST['username'];
  $email    = $_POST['email'];
  $password = $_POST['password'];
  if(empty($username)) {
    echo "<script>alert('Tên tài khoản không được để trống.')</script>";
  }
  elseif(empty($email)) {
    echo "<script>alert('Địa chỉ email không được để trống.')</script>";
  }
  elseif(empty($password)) {
    echo "<script>alert('Mật khẩu không được để trống.')</script>";
  }
  elseif (strlen($password) < 8) {
    echo "<script>alert('Mật khẩu ít nhất 8 ký tự.')</script>";
  }
  elseif (!(filter_var($email, FILTER_VALIDATE_EMAIL))) {
    echo "<script>alert('Địa chỉ email không đúng định dạng.')</script>";
  }
  else {
    $sql_add = "INSERT INTO tbltempdata(
                username,
                email,
                password,
                passcode) VALUES (
                '$username',
                '$email',
                '$password',
                '$passcode')";
    $result_add = mysqli_query($conn, $sql_add);
    if($result_add)
    {
      echo "<script>alert('Đăng ký thành công')</script>";
    } else {echo "<script>alert('Tên tài khoản hoặc email đã tồn tại vui lòng thử lại.')</script>";}
  }
}


?>

<div class="container">
    <form action="register.php" method="post" name="form_register">
      <span style="color: #67A84F"><h1>Đăng ký thành viên</h1></span>
     
        <h2>Tên tài khoản:</h2>
          <input type="text" name="username" value="<?php echo $username; ?>" maxlength="20" placeholder="accountname" autofocus>
        <h2>Email của bạn:</h2>
          <input type="text" name="email" value="<?php echo $email; ?>" placeholder="example@email.com" autofocus>
        <h2>Mật khẩu:</h2>
          <input type="password" name="password" placeholder="***************">
          <a href="register.php"><button type="submit" name="btn_submit" value="submit">Đăng ký</button></a>
          <p>- hoặc -</p>
          <a href="fb.php"><button type="submit" class="button_btn" value="Submit">Đăng ký bằng Facebook</button></a>
    </form>
</div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>