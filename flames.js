// kill zone
var kzX = canvW-475;
var kzY = canvH-75;
var kzW = 350;
var kzH = 75;

class Flame {
	display(x, y) {
		var os = 0;// off set value between image sections
		image(flame1, x+os, y); //static to prevent flashing

		if (frameCount%60 < 10){ 
			image(flame1, x+os, y);
		} else if (frameCount%60 < 30){
			image(flame2, x+os, y-25);
		} else if (frameCount%60 < 50){
			image(flame3, x+os, y-50);
		}

		os = 50;
		image(flame1, x+os, y); //static to prevent flashing

		if (frameCount%60 < 20){ 
			image(flame2, x+os, y-25);
		} else if (frameCount%60 < 40){
			image(flame3, x+os, y-50);
		} else if (frameCount%60 < 59){
			image(flame1, x+os, y);
		}
	}
}


function killZone() {
	// rect(kzX, kzY, kzW, kzH) // uncomment view killzone
	flames[0].display(width-475,kzY);
	flames[1].display(width-275,kzY);
	flames[2].display(width-375,kzY);
}