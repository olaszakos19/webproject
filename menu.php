<?php

    session_start();
    if ( ! isset($_SESSION["ID"])) {
        header("Location: login.php");
    }
?>

<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="menu_stl.css" />
    <link rel = "icon" href =  "/images/dice.png" type = "image/x-icon"> 


    <title>Kocka póker játék</title>
  </head>

  <div class="container">
    <div id="links">
  <a href="game.php">Játék!</a><br>
    <a href="stat.php">Statisztikák</a><br>
    <a href="ranks.php">Ranglista</a><br>
  </div>
    <form action="logout.php" method="POST">
        <input type="submit" value="Kijelentkezés">
    </form>

  </div>

    
  </body>
</html>
