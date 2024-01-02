const divs = ["div1", "div2", "div3", "div4", "div5"];
const pointDiv = [
  "summ",
  "pair",
  "drill",
  "doublePair",
  "four",
  "little",
  "house",
  "big",
  "red",
  "black",
];
const buttonTexts = [
  "Összeg",
  "Pár",
  "Drill",
  "Két pár",
  "Four of a kind",
  "Kis sor",
  "Fullhouse",
  "Nagy sor",
  "Vörös",
  "Fekete",
];

console.log("Money:", money);

var ROLLS = 0;
var locked = 0;

var winer = 0;

var MONEY = money;

var BET = 0;

var stat = "";

const pPoint = [0, 0, 0, 0, 0];
const hPoint = [0, 0, 0, 0, 0];

var sPpoint = 0;
var sHpoint = 0;

function settings() {
  document.getElementById("rollBtn").className = "fstRow inactive";
  document.getElementById("pMoney").innerHTML = "Pénzösszeg: " + MONEY + "$";
  for (var i = 0; i < pointDiv.length; i++) {
    document.getElementById(pointDiv[i]).className = "pointBtn inactive";
  }
}

function bet(n) {
  if (MONEY - n >= 0 && ROLLS == 0) {
    MONEY -= n;
    BET += n * 1;
    document.getElementById("pMoney").innerHTML = "Pénzösszeg:" + MONEY + "$";
    document.getElementById("pBet").innerHTML = "Tét:" + BET + "$";
    document.getElementById("rollBtn").className = "fstRow active";
  }
}

function playerRoll() {
  if (ROLLS < 3 && BET != 0) {
    rollDice(1);
    ROLLS++;
  } else {
  }
}

function endTurn() {
  if (ROLLS != 0) {
    wait(2000).then(() => {
      EnemyRoll();
    });
  } else {
  }
}

function clear() {
  document.getElementById("rollBtn").className = "fstRow inactive";
  ROLLS = 0;
  sHpoint = 0;
  sPpoint = 0;
  BET = 0;
  winer = 0;
  document.getElementById("playerPoints").innerHTML =
    "Játékos pontja: " + sPpoint;
  document.getElementById("housePoints").innerHTML = "A ház pontja: " + sHpoint;
  document.getElementById("pMoney").innerHTML = "Pénzösszeg:" + MONEY;
  document.getElementById("pBet").innerHTML = "Tét: " + BET;

  for (var i = 0; i < pointDiv.length; i++) {
    document.getElementById(pointDiv[i]).value = 0;
    document.getElementById(pointDiv[i]).className = "pointBtn inactive";
  }

  for (var i = 0; i < buttonTexts.length; i++) {
    const buttonId = pointDiv[i];
    const buttonElement = document.getElementById(buttonId);
    buttonElement.innerHTML = buttonTexts[i];
    buttonElement.onclick = function () {
      getPoint(buttonId);
    };
  }
}

function shwPanel(num) {
  // draw
  if (num === 0) {
    alert("Döntetlen, legközelebb biztos sikerül");
  }

  // loose
  if (num === 2) {
    alert("Sajnos vesztettél!");
  }

  // win
  if (num === 1) {
    alert("Gratulálok ön nyert");
  }
}

function updateData(money, winer, stat) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "update.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "money=" +
      encodeURIComponent(money) +
      "&winer=" +
      encodeURIComponent(winer) +
      "&stat=" +
      encodeURIComponent(stat)
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        handleServerResponse(xhr.responseText);
      } else {
        console.error("Hiba a szerver válaszában. Státusz kód: " + xhr.status);
      }
    }
  };
}

function handleServerResponse(responseText) {
  console.log("Szerver válasza: " + responseText);
}

function result() {
  if (sPpoint > sHpoint) {
    // win
    MONEY += BET * 2;
    shwPanel(1);
    winer = 1;
  } else if (sPpoint === sHpoint) {
    // draw
    MONEY += BET;
    shwPanel(0);
    winer = 0;
  } else if (sPpoint < sHpoint) {
    // loose
    shwPanel(2);
    winer = 0;
  }
  console.log(stat);
  updateData(MONEY, winer, stat);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rollDice(turn) {
  if (turn == 0) {
    for (var i = 0; i < hPoint.length; i++) {
      hPoint[i] = Math.floor(Math.random() * 6) + 1;
      var img = document.getElementById(divs[i]);
      img.innerHTML = "<img src=images/" + hPoint[i] + ".png>";
    }
    combos(0);
  }
  if (turn == 1) {
    //combos(1);
    stat = "";
    for (var i = 0; i < pPoint.length; i++) {
      pPoint[i] = Math.floor(Math.random() * 6) + 1;
      var img = document.getElementById(divs[i]);
      img.innerHTML = "<img src=images/" + pPoint[i] + ".png>";
    }
    combos(1);
  }
}

function getPoint(id) {
  stat = id;
  var p = document.getElementById(id).value;
  if (p != 0) {
    sPpoint = p * 1;
    document.getElementById("playerPoints").innerHTML =
      "Játékos pontja: " + sPpoint;
  }
  endTurn();
}

function combos(turn) {
  //house
  if (turn == 0) {
    if (checkBlack(hPoint) == true) {
      sHpoint = 100;
    } else {
      if (checkRed(hPoint) == true) {
        sHpoint = 80;
      } else {
        if (checkNagySor(hPoint) == true) {
          sHpoint = 60;
        } else {
          if (checkKisSor(hPoint)) {
            sHpoint = 40;
          } else {
            if (checkFullHouse(hPoint)) {
              sHpoint = 30;
            } else {
              if (checkDoublePair(hPoint) == true) {
                sHpoint = 25;
              } else {
                if (checkFour(hPoint) == true) {
                  var n = checkFour(hPoint);
                  sHpoint = n * 4;
                } else {
                  if (checkDrill(hPoint) == true) {
                    var n = checkDrill(hPoint);
                    sHpoint = n * 3;
                  } else {
                    if (checkPair(hPoint) == true) {
                      var n = checkPair(hPoint);
                      sHpoint = n * 2;
                    } else {
                      sHpoint = summPoint(hPoint);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    document.getElementById("housePoints").innerHTML = "Ház pontja: " + sHpoint;
  }
  //player
  if (turn == 1) {
    if (checkFullHouse(pPoint) == true) {
      var points = 30;
      var name = "Full House";
      document.getElementById("house").value = points;
      document.getElementById("house").innerHTML = name + ": " + points;
      document.getElementById("house").className = "pointBtn active";
    }

    if (checkKisSor(pPoint) == true) {
      var points = 40;
      var name = "Kis Sor";
      document.getElementById("little").value = points;
      document.getElementById("little").innerHTML = name + ": " + points;
      document.getElementById("little").className = "pointBtn active";
    }

    if (checkNagySor(pPoint) == true) {
      var points = 60;
      var name = "Nagy Sor";
      document.getElementById("big").value = points;
      document.getElementById("big").innerHTML = name + ": " + points;
      document.getElementById("big").className = "pointBtn active";
    }

    if (checkRed(pPoint) == true) {
      var points = 80;
      var name = "Vörös";
      document.getElementById("red").value = points;
      document.getElementById("red").innerHTML = name + ": " + points;
      document.getElementById("red").className = "pointBtn active";
    }

    if (checkBlack(pPoint) == true) {
      var points = 100;
      var name = "Fekete";
      document.getElementById("black").value = points;
      document.getElementById("black").innerHTML = name + ": " + points;
      document.getElementById("black").className = "pointBtn active";
    }

    if (checkPair(pPoint) != 0) {
      var n = checkPair(pPoint);
      var points = n * 2;
      var name = "Pár";
      document.getElementById("pair").value = points;
      document.getElementById("pair").innerHTML = name + ": " + points;
      document.getElementById("pair").className = "pointBtn active";
    }

    if (checkDoublePair(pPoint) == true) {
      var points = 25;
      var name = "Két Pár";
      document.getElementById("doublePair").value = points;
      document.getElementById("doublePair").innerHTML = name + ": " + points;
      document.getElementById("doublePair").className = "pointBtn active";
      stat_name = "doublePair";
    }

    if (checkFour(pPoint) != 0) {
      var n = checkFour(pPoint);
      var points = n * 4;
      var name = "Four of a Kind";
      document.getElementById("four").value = points;
      document.getElementById("four").innerHTML = name + ": " + points;
      document.getElementById("four").className = "pointBtn active";
    }

    if (checkDrill(pPoint) != 0) {
      var n = checkDrill(pPoint);
      var points = n * 3;
      var name = "Drill";
      document.getElementById("drill").value = points;
      document.getElementById("drill").innerHTML = name + ": " + points;
      document.getElementById("drill").className = "pointBtn active";
    }

    var points = summPoint(pPoint);
    document.getElementById("summ").value = points;
    document.getElementById("summ").innerHTML = "Öszzeg" + ": " + points;
    document.getElementById("summ").className = "pointBtn active";

    //////////
    if (checkFullHouse(pPoint) == false) {
      document.getElementById("house").className = "pointBtn inactive";
      document.getElementById("house").innerHTML = "Full House";
    }

    if (checkKisSor(pPoint) == false) {
      document.getElementById("little").className = "pointBtn inactive";
      document.getElementById("little").innerHTML = "Kis Sor";
    }

    if (checkNagySor(pPoint) == false) {
      document.getElementById("big").className = "pointBtn inactive";
      document.getElementById("big").innerHTML = "Nagy Sor";
    }

    if (checkRed(pPoint) == false) {
      document.getElementById("red").className = "pointBtn inactive";
      document.getElementById("red").innerHTML = "Vörös";
    }

    if (checkBlack(pPoint) == false) {
      document.getElementById("black").className = "pointBtn inactive";
      document.getElementById("black").innerHTML = "Fekete";
    }

    if (checkPair(pPoint) == 0) {
      document.getElementById("pair").className = "pointBtn inactive";
      document.getElementById("pair").innerHTML = "Pár";
    }

    if (checkDoublePair(pPoint) == false) {
      document.getElementById("doublePair").className = "pointBtn inactive";
      document.getElementById("doublePair").innerHTML = "Két Pár";
    }

    if (checkFour(pPoint) == 0) {
      document.getElementById("four").className = "pointBtn inactive";
      document.getElementById("four").innerHTML = "Four of a Kind";
    }

    if (checkDrill(pPoint) == 0) {
      document.getElementById("drill").className = "pointBtn inactive";
      document.getElementById("drill").innerHTML = "Drill";
    }
  }
}

function summPoint(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function checkFullHouse(array) {
  const gyakorisag = {};
  for (var szam of array) {
    if (gyakorisag[szam]) {
      gyakorisag[szam]++;
    } else {
      gyakorisag[szam] = 1;
    }
  }

  var haromEgyforma = false;
  var kettoEgyforma = false;

  for (var szam in gyakorisag) {
    if (gyakorisag[szam] === 3) {
      haromEgyforma = true;
    } else if (gyakorisag[szam] === 2) {
      kettoEgyforma = true;
    }
  }

  return haromEgyforma && kettoEgyforma;
}

function checkKisSor(array) {
  const kisSor = [1, 2, 3, 4, 5];

  if (array.length !== kisSor.length) {
    return false;
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] !== kisSor[i]) {
      return false;
    }
  }

  return true;
}

function checkNagySor(array) {
  const nagySor = [2, 3, 4, 5, 6];
  if (array.length !== nagySor.length) {
    return false;
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] !== nagySor[i]) {
      return false;
    }
  }

  return true;
}

function checkDoublePair(array) {
  const hanyDarab = {};
  var parSzamok = 0;
  for (var szam of array) {
    if (hanyDarab[szam]) {
      hanyDarab[szam]++;
    } else {
      hanyDarab[szam] = 1;
    }
    if (hanyDarab[szam] === 2) {
      parSzamok++;
    }
  }
  if (parSzamok === 2) {
    return true;
  }
  return false;
}

function checkRed(array) {
  return array.every((szam) => szam % 2 === 0);
}

function checkBlack(array) {
  return array.every((szam) => szam % 2 !== 0);
}

function checkPair(array) {
  const hanyDarab = {};
  for (var szam of array) {
    if (hanyDarab[szam]) {
      hanyDarab[szam]++;
    } else {
      hanyDarab[szam] = 1;
    }
    if (hanyDarab[szam] === 2) {
      return szam;
    }
  }
  return 0;
}

function checkDrill(array) {
  const hanyDarab = {};
  for (var szam of array) {
    if (hanyDarab[szam]) {
      hanyDarab[szam]++;
    } else {
      hanyDarab[szam] = 1;
    }
    if (hanyDarab[szam] === 3) {
      return szam;
    }
  }
  return 0;
}

function checkFour(array) {
  const hanyDarab = {};
  for (var szam of array) {
    if (hanyDarab[szam]) {
      hanyDarab[szam]++;
    } else {
      hanyDarab[szam] = 1;
    }
    if (hanyDarab[szam] === 4) {
      return szam;
    }
  }
  return 0;
}

function EnemyRoll() {
  function rollHouseDice() {
    rollDice(0);
  }

  function pause(round) {
    if (round < 3 && sHpoint < sPpoint) {
      rollHouseDice();
      setTimeout(function () {
        pause(round + 1);
      }, 2000);
    } else {
      result();
      setTimeout(clear, 2000);
    }
  }

  pause(0);
}
