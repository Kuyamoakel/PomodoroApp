
// variables
const timer = document.getElementById("timer");
const breakDisplay = document.querySelector(".break");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");

// sounds
const clickSound = new Audio("assets/audio/Click-Gun.mp3");
const NatureSound = new Audio("assets/audio/NatureSound.mp3");
const timesUp = new Audio("assets/audio/times-up.mp3");


let timeleft = 25 * 60;
let breakTime = 5 * 60;
let interval = null;
let isBreak = false;

function clickingSound() {
    clickSound.play();
}

function stopAllSounds() {
    NatureSound.pause();
    NatureSound.currentTime = 0;

    timesUp.pause();
    timesUp.currentTime = 0;
}

function updateTimer() {
    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (interval !== null) return;

    NatureSound.play();

    interval = setInterval(() => {

        timeleft--;

        updateTimer();

        if (timeleft <= 0) {
            clearInterval(interval);
            interval = null;

            stopAllSounds();

            switchMode();
            startTimer();
        }

    }, 1000)
}

function pauseTimer() {
    NatureSound.pause();
    NatureSound.currentTime = 0;

    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    pauseTimer();
    stopAllSounds();
    isBreak = false;
    timeleft = 25 * 60;
    breakDisplay.classList.add("hidden")
    updateTimer();
}

function switchMode() {
    isBreak = !isBreak;

    if (isBreak) {
        timeleft = breakTime;
        breakDisplay.classList.remove("hidden");
        breakDisplay.textContent = ("Break");
        timesUp.play();
    } else {
        timeleft = 25 * 60;
        breakDisplay.classList.add("hidden");

        NatureSound.loop = true;
        NatureSound.currentTime = 0;
        NatureSound.play();
    }

    updateTimer();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", resetTimer);

updateTimer();