var Y_AXIS = 1; // gradient axis
var c1, c2; // gradient colors


/*-------------------------------------------------------------------------
  Function:   Game background
---------------------------------------------------------------------------*/

function landscape() {
  sky();
  fill(0, 173, 78);
  stroke(0)
  rect(-1, height-150, width+1, 150) // plus and minus 1 is hack to remove side stroke

  image(tree,width-150,25)
  image(tree1,width-180,400)
}

function sky() {
  // Define colors
  c1 = color(11, 206, 240);
  c2 = color(200, 206, 240);
  setGradient(0, 0, width, height, c1, c2, Y_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  if (axis == Y_AXIS) {
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
}

/*-------------------------------------------------------------------------
  Function:   Display onscreen text
---------------------------------------------------------------------------*/

function screenText() {

  rect(1040, 10, 230, 100)
  textAlign(RIGHT); textSize(20); fill(0); noStroke(0); textStyle(BOLD);
  text("Game Options", width - 70, 35);
  /*options array*/
  var txtArray = [
    "Cannon Restricted (r):  " + restrict,
    "Sound On (m):  " + soundOn,
    "Fun Mode (f):  " + funMode,
  ];
  
  textAlign(RIGHT); textSize(14);
  let ln = 40; lh = 18; 
  for (let i = 0; i < txtArray.length; i++) {ln = ln + lh;text(txtArray[i], width - 25, ln);}

  // score and game stats
  textAlign(LEFT); textSize(50); fill("orange"); noStroke(); textFont('Georgia'); textStyle(BOLD);
  text("Score: " + score, 20, 60);
  textSize(30);
  text("High Score: " + hs[0], 20, 100);

  textSize(28); fill(51);
  text("Birds Saved: " + totalSaved, 20, 150);
  text("Birds Lost: " + lost, 20, 185);
  text("Current Level: " + lvl, 20, 220);
  textSize(16);
  text("Birds saved this level: " + lvlSaved, 20, 300);


  // power slider
  fill(200); stroke(51);
  rect(px, py, pw, ph, 20);
  textAlign(CENTER); textSize(20); fill(0);
  text("Shot Power = " + powerSlider.value(), px+pw/2, py+35);

  // disable shoot function when changing slider with mouse
  if (mouseX > px && mouseX < px+pw && mouseY > py && mouseY < py + ph){
    canShoot = false;
  } else {
    canShoot = true;
  }

}

/*-------------------------------------------------------------------------
  Function:   Adjust power slider
---------------------------------------------------------------------------*/
var px = 300; // power slider  x ref
var py = canvH-100; // power slider  y ref
var pw = 240; // power slider container box
var ph = 90; // power slider container box

function powerSettings() {

  /* to position the slider use canOX and canOY to overide the default absolute
  position behaviour. What ever the canvas size the slider position will move
  accordingly.*/

  var canOX = windowWidth/2 - canvW/2 + px+40; // canvas offset X + indent size to allow for text
  var canOY = windowHeight/2 + canvH/2 - 50; // *** subtract respective to py value

  powerSlider = createSlider(pwrMin, pwrMax, pwr, 1); //min, max, start, increment
  powerSlider.position(canOX, canOY);
  powerSlider.style('width', '160px');

}

/*-------------------------------------------------------------------------
  Function:   Play sound file
  syntax:   playSound(fileNameHere);
---------------------------------------------------------------------------*/

function playSound(file, vol) {
  if (soundOn) {
    file.play()
    file.setVolume(vol)
  }
}