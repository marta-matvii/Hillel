let initialTimeSeconds = 3 * 60;
let currentTimeSeconds = initialTimeSeconds;
let timerInterval = null;
let isTimerRunning = false;

const timeDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutesInput');
const setTimeBtn = document.getElementById('setTimeBtn');

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesWithZero = minutes.toString().padStart(2, '0');
    const secondsWithZero = seconds.toString().padStart(2, '0');
    return `${minutesWithZero}:${secondsWithZero}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTimeSeconds);
}

function startTimer() {
    if (isTimerRunning) return;
    if (currentTimeSeconds <= 0) return;
    
    isTimerRunning = true;
    startBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        currentTimeSeconds--;
        updateDisplay();
        
        if (currentTimeSeconds <= 0) {
            finishTimer();
        }
    }, 1000);
}

function resetTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
    }
    
    currentTimeSeconds = initialTimeSeconds;
    updateDisplay();
    startBtn.disabled = false;
}

function finishTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;
    currentTimeSeconds = 0;
    updateDisplay();
    startBtn.disabled = true;
    alert("Time's up!");
}

function setNewTime() {
    const minutes = parseInt(minutesInput.value) || 0;
    
    if (minutes < 1 || minutes > 60) {
        alert("Minutes must be between 1 and 60");
        return;
    }
    
    const newTimeSeconds = minutes * 60;
    resetTimer();
    initialTimeSeconds = newTimeSeconds;
    currentTimeSeconds = initialTimeSeconds;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
setTimeBtn.addEventListener('click', setNewTime);