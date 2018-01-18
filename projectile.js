var canShoot = true;
var gunX = 35;
var gunY = canvH-35;
var restrict = false;

var pwr = 35 ; // initial power setting for power slider
var pwrMin = 10; // initial power setting for power slider
var pwrMax = 60 ; // initial power setting for power slider


class Projectile {
	constructor(power = pwr) {
		this.dia = 40;
		this.r = this.dia/2;
		this.pos = createVector(gunX, gunY);
		this.gravity = createVector(0, 0.9 );
		this.length = power  // initial velocity magnitude (r)
		this.angle = gunAngle; // variable from gun
		// Break velocity vector into components
		this.vx = cos(this.angle) * this.length;
		this.vy = sin(this.angle) * this.length;
		this.vel = createVector(this.vx, this.vy);
	}

	rebound() {
		/*conditions if the projectile hits the wall
		nbwComment - these is a bug here where some balls are sticking to the wall?????*/
	
		if (this.pos.x > wallX-this.r 
			&& this.pos.x < wallX+wallW+this.r 
			&& this.pos.y > wallY-this.r + wallIncrease // levelUp raises the hight of the collision point
			&& this.pos.y < wallY+wallH+this.r) {
			// reverse the direction and add a bit friction
			this.gravity.y = 1;
			this.vel.mult(-1);
			playSound(bounce, 0.8);
		}
	}

	hits(other) { // collision with object
		var d = dist(this.pos.x, this.pos.y, other.x, other.y);
		if (d < (this.dia + other.dia)/2 && this.pos.y > -50) {// && prevent shooting from above canvas
			return true;
		} else {
			return false;
		}
	}

	die() { // conditions to remove object form the array
		if (this.pos.x > width + this.dia/2 || this.pos.y > height + this.dia/2){
			return true;
		} else {
			return false;
		}
	}

	update() { // motion logic
		this.vel.add(this.gravity)
		this.pos.add(this.vel); // motion 101: position changes by velocity
	}

	display(){
		fill(225,45,225,50);
		push();
			imageMode(CENTER);
			image(projectile, this.pos.x, this.pos.y);
		pop();
		ellipse(this.pos.x, this.pos.y, this.dia);
	}
}

class Gun {
	constructor() {
		this.x = gunX;
		this.y = gunY;
		this.angle=-.5;
	}

	display() {
		
		// select if move target with freely with mouse or only when button is clicked
		if (restrict){
			if (mouseIsPressed) {
				if (mouseButton == RIGHT) {
					/*constrain the gun so it does not shoot in stupid directions*/
					this.angle = constrain(atan2(mouseY - this.y, mouseX - this.x), -1.5, -0.1);
				}
			}
		} else {
			this.angle = constrain(atan2(mouseY - this.y, mouseX - this.x), -1.5, -0.1);
		}

		push();
			translate(this.x, this.y) // translate to gun location
			noStroke();
			fill(255, 100, 25)
			rotate(this.angle);
			image(barrel,-50,-30);
		pop();
	}
}