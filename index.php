<?php
session_start();
?>
<?php
if(!isset($_SESSION["username"])) {
include("php/index.php");
} else {
  include("php/index_true.php");
}
?>
