const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 560;

let trainingButton;
let slider;

let predictor;
let mobileNet;
let addButton;

let testVideoCapture;
let predictValue = 0;


const showresults = (error, result) => {
	if (error) {
		console.warn(`error in showresults: ${error}`);
	} else {
        const { value } = result;
        predictValue = value;
        predictor.predict(showresults);
	}
};

const whileTraining = (loss) => {
	if (loss === null) {
		console.log('training complete');
		predictor.predict(showresults)
	} else {
		console.log(`loss = ${loss}`);
	}
};

const modelReady = () => {
	console.log('model is ready!');
};

const videoReady = () => {
	console.log('video is ready!');
};

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	testVideoCapture = createCapture(VIDEO);
	testVideoCapture.hide();
	background(0);
	mobileNet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobileNet.regression(testVideoCapture, videoReady)

    slider = createSlider(0, 1, .5, .01);

    addButton = createButton('Add that thing!');
    addButton.mousePressed(() => {
        const sliderVal = slider.value();
        console.log(`adding ${sliderVal}`);
        predictor.addImage(sliderVal);
    });

    trainingButton = createButton('Train that thing!');
	trainingButton.mousePressed(function (){
		predictor.train(whileTraining);
	})
};


function draw() {
	background(0);
	image(testVideoCapture, 0, 0);
    rectMode(CENTER);
    fill(0, 255, 0);
    rect(predictValue * width, height / 2, 50, 50);
	fill(255);
	textSize(32);
	if (predictValue) {
		text(predictValue, 10, height -50);
	}
}
