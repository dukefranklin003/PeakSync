/* Timer Logic */

let timerInterval;
let timeLeft = 0;
let isResting = false;
let currentSet = 1;
let totalSets = 4;
let isPaused = true;
let currentExerciseIndex = 0;
let workoutExercises = [];

// Defaults
const REST_TIME = 60;

function startWorkoutSession() {
    // Get today's workout
    const date = (typeof selectedDate !== 'undefined') ? selectedDate : new Date().toISOString().split('T')[0];
    const workouts = Storage.getWorkouts()[date] || [];

    if (workouts.length === 0) {
        alert("No missions scheduled for today. Add a module first.");
        return;
    }

    workoutExercises = workouts;
    currentExerciseIndex = 0;
    openTimer();
    loadExerciseInTimer();
}

function openTimer() {
    document.getElementById('workout-timer-overlay').classList.add('active');
}

function closeTimer() {
    document.getElementById('workout-timer-overlay').classList.remove('active');
    clearInterval(timerInterval);
}

function loadExerciseInTimer() {
    const ex = workoutExercises[currentExerciseIndex];
    if (!ex) {
        finishWorkout();
        return;
    }

    document.getElementById('timer-exercise-name').textContent = ex.name;
    document.getElementById('total-sets').textContent = ex.sets;

    currentSet = 1;
    updateSetDisplay();

    document.getElementById('timer-progress-text').textContent =
        `Exercise ${currentExerciseIndex + 1} of ${workoutExercises.length}`;

    // Reset Timer state
    timeLeft = 0;
    isResting = false;
    isPaused = true;
    updateTimerDisplay();
    document.getElementById('timer-label').textContent = 'READY';
    setProgress(0);
}

function updateSetDisplay() {
    document.getElementById('set-display').textContent = currentSet;
}

function toggleTimerState() {
    if (isPaused) {
        startTimer();
    } else {
        pauseTimer();
    }
}

function startTimer() {
    isPaused = false;
    document.getElementById('play-pause-icon').classList.remove('fa-play');
    document.getElementById('play-pause-icon').classList.add('fa-pause');

    // If starting fresh rest
    if (timeLeft === 0 && isResting) {
        timeLeft = REST_TIME;
    } else if (timeLeft === 0 && !isResting) {
        // Active time tracking (count up)
    }

    timerInterval = setInterval(() => {
        if (isResting) {
            timeLeft--;
            const progress = ((REST_TIME - timeLeft) / REST_TIME) * 100;
            setProgress(progress);

            if (timeLeft <= 0) {
                endRest();
            }
        } else {
            // Count up for active set duration (optional feature)
            timeLeft++;
        }
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    document.getElementById('play-pause-icon').classList.remove('fa-pause');
    document.getElementById('play-pause-icon').classList.add('fa-play');
}

function completeSet() {
    // Stop any active timer
    pauseTimer();

    const ex = workoutExercises[currentExerciseIndex];

    if (currentSet < ex.sets) {
        // Start Rest
        isResting = true;
        timeLeft = REST_TIME;
        currentSet++;
        updateSetDisplay();
        document.getElementById('timer-label').textContent = 'RESTING';
        startTimer();
    } else {
        // Next Exercise
        if (currentExerciseIndex < workoutExercises.length - 1) {
            currentExerciseIndex++;
            loadExerciseInTimer();
        } else {
            finishWorkout();
        }
    }
}

function endRest() {
    pauseTimer();
    isResting = false;
    timeLeft = 0;
    document.getElementById('timer-label').textContent = 'ACTIVE';
    setProgress(0);
    updateTimerDisplay();
    // Play sound or vibration here
    alert("Rest Complete! Engage next set.");
}

function updateTimerDisplay() {
    const minutes = Math.floor(Math.abs(timeLeft) / 60);
    const seconds = Math.abs(timeLeft) % 60;
    document.getElementById('time-display').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function finishWorkout() {
    closeTimer();
    // Celebration
    if (typeof playCelebration === 'function') playCelebration();
    // Confetti
    // Mark all as complete
    const date = (typeof selectedDate !== 'undefined') ? selectedDate : new Date().toISOString().split('T')[0];
    const workouts = Storage.getWorkouts();
    if (workouts[date]) {
        workouts[date].forEach(w => w.completed = true);
        Storage.set(STORAGE_KEYS.WORKOUTS, workouts);
        if (typeof renderWorkouts === 'function') renderWorkouts(date);
    }
    alert("MISSION COMPLETE! 🚀");
}
