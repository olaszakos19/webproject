<?php
session_start();

require('connect.php');

$stmt = $kapcsolat->prepare("SELECT ID FROM users WHERE username = :username AND passwd = :password");
$stmt->execute([
    "username" => $_POST["username"],
    "password" => md5($_POST["password"])
]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);


if ($user) {
    echo "Sikeres bejelentkezés";
    $_SESSION["ID"] = $user["ID"];  

    header("Location: menu.php");
} else {
    echo "Sikertelen bejelentkezés";
    header("Location: login.php");
}
?>
