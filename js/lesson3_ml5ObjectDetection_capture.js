let video;
let detector;
let detectResults = [];

function preload() {
	detector = ml5.objectDetector('cocossd');
};

function detectThatThing(error, results) {
	if (error) {
		console.error(error);
	}
	// console.log(results);
	detectResults = results;
	detector.detect(video, detectThatThing)
};

function draw() {
	image(video, 0, 0);

	detectResults.forEach(function(result){
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
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();

	detector.detect(video, detectThatThing)
};
