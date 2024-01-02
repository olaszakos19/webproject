<?php 
    session_start();
    require_once('connect.php');
    
    echo "<link rel='stylesheet' type='text/css' href='game_stl.css'>";    
    
    if ( ! isset($_SESSION["ID"])) {
        header("Location: login.php");
    }

    $user_id = $_SESSION["ID"];

    $sql = "SELECT money FROM users WHERE ID = $user_id";
    
    try {
  
      $sql = $kapcsolat->prepare("SELECT money FROM users WHERE ID = :user_id");
      $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
      $sql->execute();
      $result = $sql->fetch(PDO::FETCH_ASSOC);
      if ($result) {
          $money = $result['money'];
        
      } else {
          echo "Nem található felhasználó a megadott azonosítóval.";
      }
  } catch (PDOException $e) {
      echo "Hiba történt: " . $e->getMessage();
  } finally {
      $kapcsolat = null;
  }

  echo "<script>";
  echo "var money = " . json_encode($money) . ";";
  echo "</script>";
  echo " <script src='game.js'></script>";
 

    echo '<body onload="settings()">
    <a href="menu.php">Vissza a menübe</a>
        <div class="imgRow">
          <div id="div1">
            <img src="images/6.png" alt="image" />
          </div>
          <div id="div2">
            <img src="images/1.png" alt="image" />
          </div>
          <div id="div3">
            <img src="images/2.png" alt="image" />
          </div>
          <div id="div4">
            <img src="images/5.png" alt="image" />
          </div>
          <div id="div5">
            <img src="images/4.png" alt="image" />
          </div>
        </div>
    
        <div id="statCard">
          <div id="playerPoints">Játékos pontja: 0</div>
          <div id="housePoints">A ház pontja: 0</div>
          <div id="pMoney">Pénzösszeg: 0$</div>
          <div id="pBet">Tét: 0$</div>
          <div id="asd"></div>
        </div>
    
        <div id="buttons">
          <div id="topRow">
            <button onclick="playerRoll()" id="rollBtn">Roll</button>
          </div>
    
          <div id="middleRow">
            <button onclick="bet(10)" class="">10$</button>
            <button onclick="bet(20)" class="">20$</button>
            <button onclick="bet(50)" class="">50$</button>
            <button onclick="bet(100)" class="">100$</button><br />
          </div>
    
          <div id="bottomRow">
            <button id="summ" onclick="getPoint(id)">Összeg</button>
            <button id="pair" onclick="getPoint(id)">Pár</button>
            <button id="drill" onclick="getPoint(id)">Drill</button>
            <button id="doublePair" onclick="getPoint(id)">Két pár</button>
            <button id="four" onclick="getPoint(id)">Four of a kind</button><br />
            <button id="little" onclick="getPoint(id)">Kis sor</button>
            <button id="house" onclick="getPoint(id)">Fullhouse</button>
            <button id="big" onclick="getPoint(id)">Nagy sor</button>
            <button id="red" onclick="getPoint(id)">Vörös</button>
            <button id="black" onclick="getPoint(id)">Fekete</button>
          </div>
        </div>';
    ?>



    






