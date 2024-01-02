<?php

session_start();
require_once('connect.php');
echo " <script src='asd.js'></script>";
echo "<link rel='stylesheet' type='text/css' href='style.css'>";    

if ( ! isset($_SESSION["ID"])) {
    header("Location: login.php");
}

$user_id = $_SESSION["ID"];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_POST['money']) && isset($_POST['winer']) && isset($_POST['stat'])) {
        $hasWon = $_POST['winer'];
        $received_money = $_POST['money'];
        $stat = $_POST['stat'];
        updateMoneyInDatabase($user_id, $received_money);
        updateStat($user_id,$stat);
        if ($hasWon == 1) {
            
            updateWins($user_id);
        }

        echo "Sikeresen fogadva a szerveren. Fogadott összeg: " . $received_money;
        echo $hasWon;
        echo $user_id;
        echo $stat;
    } else {
        
        echo "Hiba: A 'money' változó nem érkezett be a szerverre.";
    }
} else {
   
    echo "Hiba: Csak POST kérések fogadása támogatott.";
}

function updateMoneyInDatabase($user_id, $new_money) {
    global $kapcsolat;  

    try {
        $sql = $kapcsolat->prepare("UPDATE users SET money = :new_money WHERE ID = :user_id");
        $sql->bindParam(':new_money', $new_money, PDO::PARAM_INT);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->execute();
    } catch (PDOException $e) {
        echo "Hiba történt az adatbázis frissítése során: " . $e->getMessage();
    }
}

function updateWins($user_id) {
    global $kapcsolat;

    try {
        $sql = $kapcsolat->prepare("UPDATE stats SET wins = wins + 1 WHERE userID = :user_id");
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->execute();
    } catch (PDOException $e) {
        echo "Hiba történt az adatbázis frissítése során: " . $e->getMessage();
    }
}

function updateStat($user_id,$stat){
    global $kapcsolat;

    try {
        $sql = $kapcsolat->prepare("UPDATE stats SET $stat = $stat + 1 WHERE userID = :user_id");
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->execute();
    } catch (PDOException $e) {
        echo "Hiba történt az adatbázis frissítése során: " . $e->getMessage();
    }
}


?>
