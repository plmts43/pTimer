const timeInput = document.getElementById("time-input");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");
const progressBar = document.querySelector(".progress");
const fullTimerAudio = document.getElementById("full-timer-audio");
const progressiveTimerAudio = document.getElementById("progressive-timer-audio");
const progressiveToggle = document.getElementById("progressive-toggle");

let timer;
let totalTime;
let currentTime;
let progressiveIntervals;

function startTimer() {
    const timeParts = timeInput.value.split(":");
    totalTime = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
    currentTime = totalTime;
    progressiveIntervals = [0.05, 0.2, 0.5].map(interval => Math.floor(totalTime * interval));

    timer = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    restartButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function restartTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
    progressBar.style.width = "0";
}

function updateTimer() {
    currentTime--;

    const progressPercentage = ((totalTime - currentTime) / totalTime) * 100;
    progressBar.style.width = progressPercentage + "%";

    if (progressiveToggle.checked && progressiveIntervals.includes(currentTime)) {
        progressiveTimerAudio.play();
    }

    if (currentTime === 0) {
        fullTimerAudio.play();
        clearInterval(timer);
        startButton.disabled = true;
        pauseButton.disabled = true;
        restartButton.disabled = true;
    }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", restartTimer);
