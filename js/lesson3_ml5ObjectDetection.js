let img
let detector;

function preload() {
	img = loadImage('images/sheepdog_crop.png')
	detector = ml5.objectDetector('cocossd');
};

function detectThatThing(error, results) {
	if (error) {
		console.error(error);
	}
	console.log(results);
	results.forEach(function(result){
		// draw box
		stroke(0, 255, 0);
		strokeWeight(4);
		noFill();
		rect(result.x, result.y, result.width, result.height);

		// draw label
		noStroke();
		fill(255);
		textSize(24);
		text(result.label, result.x + 10, result.y + 24);
	});
};

function setup() {
	createCanvas(640, 480);
	image(img, 0, 0);
	detector.detect(img, detectThatThing)
};
