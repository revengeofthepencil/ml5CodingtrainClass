let mobileNet;
let testVideoCapture;
let videoLabel = null;

const showresults = (error, results) => {
	if (error) {
		console.warn(`error in showresults: ${error}`);
	} else {
		console.log(results);
		const firstRes = results[0];
		const { confidence, label } = firstRes;
		videoLabel = `Label: ${label}.\nConfidence: ${confidence}`;
		/*
		fill([255, 0, 0]);
		textSize(24);
		text(fullText, 20, 30);

		 */
	}
};

const modelReady = () => {
	console.log('model is ready!');
	mobileNet.predict(showresults)
};

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 440;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	testVideoCapture = createCapture(VIDEO);
	testVideoCapture.hide();
	background(0);
	mobileNet = ml5.imageClassifier('MobileNet', testVideoCapture, modelReady);
};


function draw() {
	background(0);
	image(testVideoCapture, 0, 0);
	fill(255);
	textSize(32);
	if (videoLabel) {
		text(videoLabel, 10, height -50);
	}
}
