const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 560;

let headphoneButton;
let glassButton;
let trainingButton;
let saveButton;

let classifier;
let mobileNet;

let testVideoCapture;
let videoLabel = null;


const showresults = (error, results) => {
	if (error) {
		console.warn(`error in showresults: ${error}`);
	} else {
		const firstResult = results[0];
		const { label, confidence } = firstResult;
		videoLabel = `${label} (confidence ${confidence.toFixed(6)})`;
		setTimeout(() => {
			classifier.classify(showresults)
		}, 1000)
	}
};

const whileTraining = (loss) => {
	if (loss === null) {
		console.log('training complete');
		classifier.classify(showresults)
	} else {
		console.log(`loss = ${loss}`);
	}
};

const modelReadyWithLoad = () => {
	console.log('hooray! We loaded it!')
	videoLabel = 'Yep, ready'
	classifier.classify(showresults)
};

const modelReady = () => {
	console.log('model is ready!');
	classifier.load('support_files/lesson6model/model.json', modelReadyWithLoad);
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
	classifier = mobileNet.classification(testVideoCapture, videoReady)
	headphoneButton = createButton('Headphones');
	headphoneButton.mousePressed(function (){
		classifier.addImage('Headphones')
	})

	glassButton = createButton('Drinking Glass');
	glassButton.mousePressed(function (){
		classifier.addImage('Drinking Glass')
	})

	trainingButton = createButton('Train that thing!');
	trainingButton.mousePressed(function (){
		classifier.train(whileTraining);
	})


	saveButton = createButton('Save!');
	saveButton.mousePressed(function (){
		classifier.save();
	})

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
