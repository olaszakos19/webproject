<?php

require('connect.php');


$checkUsernameQuery = $kapcsolat->prepare("SELECT COUNT(*) as count FROM users WHERE username = :felhasznalonev");
$checkUsernameQuery->execute(['felhasznalonev' => $_POST["username"]]);
$result = $checkUsernameQuery->fetch(PDO::FETCH_ASSOC);

if ($result['count'] > 0) {
    header("Location: reg_failed.php");
} else {

    $kapcsolat
        ->prepare("INSERT INTO users (username, passwd) VALUES (:felhasznalonev, :jelszo)")
        ->execute([
            'felhasznalonev' => $_POST["username"],
            'jelszo' => md5($_POST["password"]),
        ]);

    $newUserId = $kapcsolat->lastInsertId();

    $kapcsolat
        ->prepare("INSERT INTO stats (userID) VALUES (:user_id)")
        ->execute([
            'user_id' => $newUserId,
        ]);

    header("Location: login.php");
    exit(); 
}
?>
