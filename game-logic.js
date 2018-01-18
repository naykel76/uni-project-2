function gameLogic() {

  // initial start conditions
  if (wait && startGame && !funMode && !gameOver) {
    textSize(40); fill(200,200,10); stroke(0); strokeWeight(2)
    text("Press space to start", width/2, 300);
  }

  // game over conditions - check if lost total lives allocated
  if (lost == overTotal && !funMode) {
    textSize(40); fill(200,200,10); stroke(0); strokeWeight(2)
    text("GAME OVER \n Press F5 resart ", width/2, 300);
    gameOver = true;
    targets = []; // reset array  (clear targets)
    wait = true; 
    startGame = true;
    lvl = 1;
    lvlSaved = 0; 
    resetWall();
  }

  // hit the total required to increase level
  if (lvlSaved >= lvlReq && !funMode){
    lvl = lvl + 1;
    lvlSaved = 0; // reset counter
    lvlReset = true; // triger to reset things like wall height
    targets = []; // reset array  (clear targets)
    wait = true; // prevent targets from spawining
    resetWall();
  }

  if (wait && !startGame && !gameOver && !gameOver ) {
    textSize(40); fill(200,200,10); stroke(0); strokeWeight(2)
    text("Level clear \n Press space to continue", width/2, 300);
  }

}


function resetStartConditions() {
  /*reset variables back to starting conditions. This will trigger if game
  over and new game is started*/
  lost = 0;
  score = 0;
  totalSaved = 0;
}

/*-------------------------------------------------------------------------
Display a wall the gets in the way. The wall gets taller as level increases.
---------------------------------------------------------------------------*/
var wallH = 100; // image height ** leave above x & y **
var wallW = 50;
var wallX = 400;
var wallY = 468;

var wallIncrease = 15; // increase to make wall collision point higher
var newH = 500; // new image heigh (reveal)

function theWall() {
  var imgH = 600;
  var imgW = wallW;
  var imgY = wallY;

  // rect(wallX, wallY + levelUp, wallW, wallH) //testing box
  
  /*hide wall image and reveal as level increases*/
  image(wall1, wallX, imgY, imgW, imgH, 0, newH, imgW, imgH);
}

function resetWall() {
  //reset wall to initial height after each level
  wallY = 470;
  wallH = 100; 
  newH = 500;
}