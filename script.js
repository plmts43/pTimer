let totalSeconds = 0;
let remainingSeconds = totalSeconds;
let interval = null;
let isRunning = false;
let progressiveTimer = false;
let sound = null;

const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');
const secondsInput = document.querySelector('#seconds');
const startPauseButton = document.querySelector('#start-pause');
const restartButton = document.querySelector('#restart');
const timerDisplay = document.querySelector('.timer-display');
const progressBar = document.querySelector('.progress-bar');
const stopSoundButton = document.querySelector('#stop-sound');

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startPauseButton.textContent = 'Pause';
    totalSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    remainingSeconds = totalSeconds;
    interval = setInterval(() => {
        remainingSeconds -= 1;
        updateTimerDisplay();
        updateProgressBar();
        if (progressiveTimer && (remainingSeconds === Math.floor(totalSeconds * 0.5) || remainingSeconds === Math.floor(totalSeconds * 0.2) || remainingSeconds === Math.floor(totalSeconds * 0.05))) {
            playSound('resources/p_timer.wav');
        }
        if (remainingSeconds === 0) {
            clearInterval(interval);
            sound = playSound('resources/full_timer.wav');
            stopSoundButton.style.display = 'block';
            isRunning = false;
            startPauseButton.textContent = 'Start';
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    clearInterval(interval);
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

function restartTimer() {
    pauseTimer();
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
    updateProgressBar();
    stopSoundButton.style.display = 'none';
}

function updateTimerDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    timerDisplay.textContent = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    document.title = timerDisplay.textContent;
}

function updateProgressBar() {
    const percentage = (totalSeconds - remainingSeconds) / totalSeconds * 100;
    progressBar.style.width = `${percentage}%`;
}

function playSound(src) {
    const audio = new Audio(src);
    audio.play();
    return audio;
}

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

restartButton.addEventListener('click', () => {
    restartTimer();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startTimer();
    }
});

stopSoundButton.addEventListener('click', () => {
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
        stopSoundButton.style.display = 'none';
    }
});
