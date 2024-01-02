<?php
session_start();
require_once('connect.php');
if (!isset($_SESSION["ID"])) {
    header("Location: login.php");
}

$user_id = $_SESSION["ID"];

$sql = $kapcsolat->prepare("SELECT * FROM stats WHERE userID = :user_id");
$sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$sql->execute();

echo "<link rel='stylesheet' type='text/css' href='stats_style.css'>";  
echo "<table border='1'>
        <tr>
            <th>Győzelmek száma</th>
            <th>Pár</th>
            <th>Drill</th>
            <th>Four of a kind</th>
            <th>Full house</th>
            <th>Két pár</th>
            <th>Vörös sor</th>
            <th>Fekete sor</th>
            <th>Kis sor</th>
            <th>Nagy sor</th>
        </tr>";

while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
            <td>" . $row["wins"] . "</td>
            <td>" . $row["pair"] . "</td>
            <td>" . $row["drill"] . "</td>
            <td>" . $row["four"] . "</td>
            <td>" . $row["house"] . "</td>
            <td>" . $row["doublePair"] . "</td>
            <td>" . $row["red"] . "</td>
            <td>" . $row["black"] . "</td>
            <td>" . $row["little"] . "</td>
            <td>" . $row["big"] . "</td>
          </tr>";
}

echo "</table>";

$kapcsolat = null;


echo "<a href='menu.php'>Vissza a menühöz</a>";
?>
