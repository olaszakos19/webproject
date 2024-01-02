<?php
require_once('connect.php');
session_start();
if (!isset($_SESSION["ID"])) {
    header("Location: login.php");
}
echo "<link rel='stylesheet' type='text/css' href='ranks_stl.css'>";  
$i = 0;

$sql = $kapcsolat->query("
    SELECT stats.*, users.username
    FROM stats
    INNER JOIN users ON stats.userID = users.ID
    ORDER BY stats.wins DESC
");


echo "<table border='1'>
        <tr>
            <th>Helyezés</th>
            <th>Felhasználó Név</th>
            <th>Győzelmek száma</th>
        </tr>";


while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
            <td>" . $i+1 . "</td>
            <td>" . $row["username"] . "</td>
            <td>" . $row["wins"] . "</td>
          </tr>";
          $i++;
}

echo "</table>";
echo "<a href='menu.php'>Vissza a menühöz</a>";

$kapcsolat = null;

?>
