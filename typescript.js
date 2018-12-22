const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector(".text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".time");

var timer=[0,0,0,0];
var interval;
var timerRunning = false;

function leadingZero(time) {
	if(time <= 9) {
		time = "0" + time;
	}
	return time;
}

function runTimer() {
	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;
	timer[0] = Math.floor((timer[3]/100)/60);
	timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
	timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}



function start() {
	let textEnteredLength = testArea.value.length;
	if(textEnteredLength === 0 && !timerRunning) {
		timerRunning = true;
		interval = setInterval(runTimer,10);
	}
	console.log(textEnteredLength);
}

function spellCheck() {
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0,textEntered.length);

	if (textEntered == originText) {
		clearInterval(interval);
		testWrapper.style.borderColor = "green";
	} else {
		if (textEntered == originTextMatch) {
			testWrapper.style.borderColor = "aqua";
		} else {
			testWrapper.style.borderColor = "red";
		}
	}
}

function reset() {
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerRunning = false;
	testArea.value ="";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
	console.log("button was pressed!");
}

testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);