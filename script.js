const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const phaseDisplay = document.getElementById('phase');

let timer;
let isRunning = false;
let isWorkTime = true;
let timeLeft = 25 * 60; // Startzeit in Sekunden (25 Minuten)

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;

    // Blinken in der letzten Minute
    if (seconds <= 60) {
        timerDisplay.classList.add('blinking');
    } else {
        timerDisplay.classList.remove('blinking');
    }
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            handleTimerEnd();
            return;
        }

        timeLeft--;
        updateDisplay(timeLeft);
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60; // Reset auf 25 Minuten oder 5 Minuten
    updateDisplay(timeLeft);
}

function handleTimerEnd() {
    if (isWorkTime) {
        // Wechsel zu Pausenmodus
        isWorkTime = false;
        timeLeft = 5 * 60; // 5 Minuten Pause
        phaseDisplay.textContent = 'Kurze Pause';
    } else {
        // Wechsel zu Arbeitsmodus
        isWorkTime = true;
        timeLeft = 25 * 60; // 25 Minuten Arbeit
        phaseDisplay.textContent = 'Arbeitszeit';
    }
    resetTimer();
    startTimer();
}

startButton.addEventListener('click', () => {
    startTimer();
});

resetButton.addEventListener('click', () => {
    resetTimer();
});
