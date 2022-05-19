let mobileNet;
let testImage;
const modelReady = () => {
	console.log('model is ready!');
};

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 440;

const showresults = (error, results) => {
	if (error) {
		console.warn(error);
	} else {
		console.log(results);
		const firstRes = results[0];
		const { confidence, label } = firstRes;
		const fullText = `Label: ${label}.\nConfidence: ${confidence}`;
		fill([255, 0, 0]);
		textSize(24);
		text(fullText, 20, 30);
	}
};

const imageIsReady = () => {
	console.log('image is ready!');
	const testWidth = testImage.width;

	let multiplierResize = 1;

	// just make sure the width fits
	if (testWidth > CANVAS_WIDTH) {
		multiplierResize = CANVAS_WIDTH / testWidth;
	}

	image(testImage, 0, 0,
		testImage.width * multiplierResize, testImage.height * multiplierResize);
	mobileNet.predict(testImage, showresults);
};

function setup() {
	mobileNet = ml5.imageClassifier('MobileNet', modelReady);
};

function runImageTest(imgPath) {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	background(0);
	testImage = createImg(imgPath, 'test image', 'anonymous', imageIsReady);
	testImage.hide();
};
