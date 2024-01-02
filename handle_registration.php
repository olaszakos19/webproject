<?php

require('connect.php');


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


$kapcsolat
    ->prepare("INSERT INTO ranks (userID) VALUES (:user_id)")
    ->execute([
        'user_id' => $newUserId,
    ]);

header("Location: login.php");
