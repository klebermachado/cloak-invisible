const cv = require('@u4/opencv4nodejs');

const devicePort = 0;
const wCap = new cv.VideoCapture(devicePort);
const delay = 10;
const fps = 30;
wCap.set(cv.CAP_PROP_FPS, fps);

let background = null; // Variável para armazenar o frame de background
let firstFrameCaptured = false;

// let background = cv.imread('./background.jpg');
// const backgroundColor = new cv.Vec3(0, 255, 0);
// background = background.resizeToMax(640);

function replaceGreenScreen(frame, background) {
	const hsvFrame = frame.cvtColor(cv.COLOR_BGR2HSV);

	// cor verde
	const lowerGreen = new cv.Vec(50, 100, 100); // Hue, Saturation, Value
	const upperGreen = new cv.Vec(70, 255, 255); // Hue, Saturation, Value

	// Para azul escuro, você pode começar com estes valores e ajustar conforme necessário
	// const lowerBlue = new cv.Vec(90, 100, 100); // Hue, Saturation, Value
	// const upperBlue = new cv.Vec(150, 255, 255); // Hue, Saturation, Value


	const greenMask = hsvFrame.inRange(lowerGreen, upperGreen);
	const notGreenMask = greenMask.bitwiseNot();

	const resizedBackground = background.resize(frame.rows, frame.cols);

	// Usar a máscara para substituir o verde no frame pelo background
	const backgroundPortion = resizedBackground.copyTo(new cv.Mat(), greenMask);
	const foregroundPortion = frame.copyTo(new cv.Mat(), notGreenMask);

	// Combinação das partes
	const combined = backgroundPortion.add(foregroundPortion);

	return combined;
}

function captureAndDisplay() {
	setInterval(async () => {
		let frame = wCap.read();
		if (frame.empty) {
			wCap.reset();
			frame = wCap.read();
		}

		if (!firstFrameCaptured) {
			background = frame;
			firstFrameCaptured = true;
		} else {
			const processedFrame = replaceGreenScreen(frame, background);

			cv.imshow('frame', processedFrame);
		}

		const key = cv.waitKey(delay);
		if (key === 27) {
			cv.destroyAllWindows();
			clearInterval(this)
		}
	}, delay)
}

captureAndDisplay()