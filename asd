function EnemyRoll() {
  function rollHouseDice() {
    rollDice(0);
    
  }

  function pause(index) {
    if (index < 3 && sHpoint <= sPpoint) {
      rollHouseDice();
      setTimeout(function() {
        pause(index + 1);
      }, 2000); 
    } else {
      result();
      setTimeout(clear, 2000);
    }
  }

  pause(0);
}

function EnemyRoll() {
  for (var i = 0; i < 3; i++) {
    if (sHpoint <= sPpoint) {
      rollDice(0);
      console.log("-----------------------------");
    }
    if (sHpoint > sPpoint) {
      break;
    }
  }
  result();
  setTimeout(clear, 2000);
}


//settings
document.getElementById(pointDiv[i]).style.color = "white";
if(i%2==0){
  document.getElementById(pointDiv[i]).style.backgroundColor = "red";
}
if(i%2==1){
  document.getElementById(pointDiv[i]).style.backgroundColor = "black";
}