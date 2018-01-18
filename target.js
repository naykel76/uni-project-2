// target variables
var smT = 32;
var mdT = 64;
var lgT = 72
var xlT = 96;
var sizes = [smT, mdT, lgT, xlT]; // spawn sizes
// level variables
var ySpeed;
var lvl = 1; //change level when game starts

function spawnTargets() { //setUp function
	/*spawn targets and level logic*/
	if (targets.length < minTargets && wait == false) {
		/*add targets to array in random positions. It is likley that
		targets will overlap each other*/
		for(let i = 0; i < 1; i++){ // leave at on to create one at a time
			t = new Target();
			targets.push(t);
		}
	}
}

class Target {
	constructor(x, y) {
		this.dia = random(sizes); // use exact sizes from array to remove the need for size ranges
		this.x = random(width-200, width-400);
		this.y = random(-25, -500); // start off screen. random to give space between
		this.color;
		this. a = 0; // alpha
		this.xSpeed = 0;
		this.isDead = false;
	}

	update() { // movement functions

		// select y speed based on level
		if (lvl == 1){ySpeed = 1.5;}
		else if (lvl == 2) {ySpeed = 2;}
		else if (lvl == 3) {ySpeed = 3;}
		else if (lvl == 4) {ySpeed = 4;}
		else if (lvl == 5) {ySpeed = 5;}
		else if (lvl == 6) {ySpeed = 6;}
		else if (lvl == 7) {ySpeed = 7;}
		else if (lvl == 8) {ySpeed = 8;}
		else if (lvl == 9) {ySpeed = 9;}
		else if (lvl == 10 ) {ySpeed = 10 ;}

		this.x = this.x + this.xSpeed;
		this.y = this.y + random(-1, ySpeed);
	}

	// collision detection
	intersects (other) {
		let d = dist(this.x, this.y, other.x , other.y);
		if (d < (this.dia + other.dia)/2) {
			return true;
		} else {
			return false;
		}
	}

	die() {

		// intersect with killzone
		if (this.x > kzX && this.x < kzX + kzW && this.y > kzY) {
			this.isDead = true; // confirm the bird should die
			return true; // confirm object is ready to die
		} else if (this.x > width) {
			this.isDead = false; // confrim the bird is safe and happy
			return true; // confirm object is ready to die
		} else {
			this.isDead = false;
		}
	}

	display(){
		push();
		imageMode(CENTER);
		if (this.dia == smT){
			this.color = color(255, 0, 255, this.a);
			image(blue, this.x, this.y)
		} else if (this.dia == mdT) {
			this.color = color(255, 255, 0, this.a);
			image(yellow, this.x, this.y)
		} else if (this.dia == lgT) {
			this.color = color(0, this.a);
			image(black, this.x, this.y)
		} else if (this.dia == xlT) {
			this.color = color(255, 0, 0, this.a);
			image(redLg, this.x, this.y)
		}

		fill(this.color);
		noStroke();
		ellipse(this.x,this.y,this.dia);
		
		pop();
		
	}
}