var targets = [];
var projectiles = [];
var flames = [];

var gun;
var gunAngle;

// general settings
var canvW = 1280; // canvas width
var canvH = 720; // canvas height
var soundOn = true;

// game logic
var score = 0;
var lost = 0;
var totalSaved = 0;
var overTotal = 10; // birds lost game over total
var lvlSaved = 0; // birds saved for current level
var lvlReq = 15; //the amount of saved birds required to level up
var minTargets = 10; // min targets on screen before respawn
var wait = true; // condition for targets spawning
var startGame = true;
var gameOver = false;

var funMode = false; //allow random shooting and a bit of fun
var devMode = false;
var isHs = false;
var hs = 20;

// devMode

function preload() {

	hs = loadStrings('highscore.txt');

	// images
	barrel     = loadImage('images/cannon_barrel.png'); 
	flame1     = loadImage('images/flame1.png');
	flame2     = loadImage('images/flame2.png');
	flame3     = loadImage('images/flame3.png');
	blue       = loadImage('images/angry-bird-blue.png'); // 32px
	yellow     = loadImage('images/angry-bird-yellow.png'); // 64px
	black      = loadImage('images/angry-bird-black.png'); // 72px
	redLg      = loadImage('images/angry-bird-red-lg.png'); // 96px
	projectile = loadImage('images/fluffy.png');

	// landscape
	tree       	= loadImage('images/tree.png');
	tree1      	= loadImage('images/tree1.png');
	wall      	= loadImage('images/wall.jpg');
	wall1      	= loadImage('images/wall1.jpg');

	// sounds
	shoot       	= loadSound('images/cannon.mp3'); // blast, blast_laser, shoot, cannon
	scream1     	= loadSound('images/scream1.mp3');
	scream2     	= loadSound('images/scream2.mp3');
	scream3     	= loadSound('images/scream3.mp3');
	scream4     	= loadSound('images/scream4.mp3');
	cheer		    	= loadSound('images/cheer.mp3');
	slap        	= loadSound('images/slap.mp3');
	bounce        = loadSound('images/bounce.mp3');


	// moan		    	= loadSound('images/moan.mp3');
	// explode1 			= loadSound('images/explode01.mp3');

}

function setup() {
	createCanvas(canvW, canvH);
	powerSettings();

	// projectiles array initially set to 0 then added by shooting mith mouse
	for (let i = 0; i < 0; i++) {
		projectiles[i] = new Projectile();
	}

	for(let i = 0; i < 3; i++){
		flames[i] = new Flame(100,100);
	}

	gun = new Gun();
}


function draw(){


	landscape(); // background colours and images
	screenText(); // on screen text


	if (score > hs && gameOver && !funMode) {
		saveStrings(score, 'highscore.txt');
		score = 0;
	}

	// removes game function and allows shooting and target creation
	if (funMode) {
		wait = false;
		startGame = false;

		ySpeed = 15;
		if (mouseIsPressed){
			if (mouseButton == LEFT) {
				targets.push(new Target());
			}
		}
	}

	devMode


	spawnTargets(); // targets setup function

	shootP(); // shoot projectiles function
	killZone(); // burn baby burn!!!
	target(); // falling birds
	
	// levels and gameplay logic
	gameLogic(); 
	theWall();

	/*I have sent the gun angle to the gunAngle vairable so I can pass it to the
	projectile object. There may be a better way to do this*/
	gunAngle = gun.angle;
	gun.display();

}



/*-------------------------------------------------------------------------*/

function target() { // create the objects to shoot

	for(let i = 0; i < targets.length; i++){
		targets[i].display();
		targets[i].update();

		// actions to remove from array
		if(targets[i].die()){

			if (targets[i].isDead) {
				/*the bird is dead because it was not saved, pick a random death
				scream. Remove it from the array first or it will not stop
				screaming.*/

				lost += 1;

				targets.splice(i, 1);

				// turn of the sound in fun mode because it is really annoying!
				if (!funMode) {
					if (frameCount%60 < 20){ 
						playSound(scream2, 0.3);
					} else if (frameCount%60 < 40){
						playSound(scream3, 0.3);
					} else if (frameCount%60 < 59){
						playSound(scream4, 0.3);
					}
				}

				break;
			}
			
			/*if we are here then the bird is safe and sound in the tree so
			add to score, remove from the array and play the happy song*/
			targets.splice(i, 1);
			lvlSaved++;
			totalSaved++;
			if (!funMode) {
				playSound(cheer, 0.3);
			}
		}
	}

}

/*-------------------------------------------------------------------------*/

function shootP() { // create projectiles to shoot

	for (let i = projectiles.length - 1; i >= 0; i--) { 
		projectiles[i].display();
		projectiles[i].update();
		if (!funMode) {
			projectiles[i].rebound();
		}
		// check if projectile hits target
		for (let j = targets.length - 1; j >= 0; j--) {
			if (projectiles[i].hits(targets[j])) {
				// // score is set size of target
				if (targets[j].dia == smT){
					score = score + 50;
				} else if (targets[j].dia == mdT) {
					score = score + 30;
				} else if (targets[j].dia == lgT) {
					score = score + 20;
				} else if (targets[j].dia == xlT) {
					score = score + 10;
				}
				
				targets[j].xSpeed = 15; // speed to move to the save zone
			}
		}

		// remove from array
		if(projectiles[i].die()){
			projectiles.splice(i, 1)
		}
	}
}

/*-------------------------------------------------------------------------
	mouse actions
	---------------------------------------------------------------------------*/

function mousePressed() {
	if (mouseButton == LEFT && canShoot && !wait) {
			projectiles.push(new Projectile(powerSlider.value()));
			playSound(shoot, 0.3); // sound when shooting

			if(!funMode) {
				// raise the wall on each click
				wallY = wallY - wallIncrease; // raise the wall y (decrease)
				wallH = wallH + wallIncrease; // increase the overall height
				newH = newH - wallIncrease; // reveal more image as the level increases
			}
	}
}

function mouseDragged() {


	if (funMode) {
		if (mouseButton == RIGHT) {
			projectiles.push(new Projectile(powerSlider.value()));
		}
		if (mouseButton == RIGHT){
			targets.push(new Target());
		}
	}

}

/*-------------------------------------------------------------------------
	key actions
	---------------------------------------------------------------------------*/

	function keyPressed() {
		/*increase and decrease the powerSlider with the up and down keys*/
		if (keyCode == UP_ARROW) {
			pwr = pwr + 1;
			powerSlider.value(pwr);
		} else if (keyCode == DOWN_ARROW) {
			pwr = pwr - 1;
			powerSlider.value(pwr);
		} 

	// free moving cannon or hold mouse to aim
	if (keyCode == 82){ // (r)
		restrict = !restrict;
	}

	// turn sound on and off
	if (keyCode == 77){ // (m)
		soundOn = !soundOn;
	}

	// fun mode
	if (keyCode == 70){ // (m)
		funMode = !funMode;
	}

		// fun mode
	if (keyCode == 80){ // (p)
		noLoop();
	}

	// game begin 
	if (keyCode == 32){ // (space)
		// check to see if beginning of the game

		if(startGame){
			resetStartConditions(); //reset score and level
			startGame = false; 
		}
		
		wait = false;
	}

	// these keys are for testing/sampling sounds
	if (keyCode == 49){ // (1)
		playSound(scream1);
	}

	if (keyCode == 50){ // (2)
		playSound(scream2);
	}

	if (keyCode == 51){ // (3)
		playSound(scream3);
	}

	if (keyCode == 52){ // (4)
		playSound(scream4);
	}
}