/* Planner Logic */

let currentWeekStart = new Date();
// Normalize to Monday
const day = currentWeekStart.getDay();
const diff = currentWeekStart.getDate() - day + (day === 0 ? -6 : 1);
currentWeekStart.setDate(diff);

let selectedDate = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', () => {
    initPlanner();
    initModal();
});

function initPlanner() {
    renderCalendar();

    // Controls
    document.getElementById('prev-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderCalendar();
    });

    document.getElementById('next-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderCalendar();
    });

    renderWorkouts(selectedDate);
}

function renderCalendar() {
    const daysContainer = document.getElementById('calendar-days');
    const label = document.getElementById('current-week-label');
    daysContainer.innerHTML = '';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Update label
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() + 6);
    label.textContent = `${months[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}`;

    // Render Days
    let tempDate = new Date(currentWeekStart);

    for (let i = 0; i < 7; i++) {
        const dateStr = tempDate.toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;

        const pill = document.createElement('div');
        pill.className = `day-pill ${isSelected ? 'active' : ''}`;
        pill.dataset.date = dateStr;
        pill.onclick = () => selectDate(dateStr);

        pill.innerHTML = `
            <span class="day-name">${days[i]}</span>
            <span class="day-number">${tempDate.getDate()}</span>
        `;

        daysContainer.appendChild(pill);
        tempDate.setDate(tempDate.getDate() + 1);
    }
}

function selectDate(dateStr) {
    selectedDate = dateStr;
    // Update UI active state
    document.querySelectorAll('.day-pill').forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.date === dateStr) pill.classList.add('active');
    });

    renderWorkouts(dateStr);
}

function renderWorkouts(date) {
    const list = document.getElementById('workout-list');
    list.innerHTML = '';

    const workouts = Storage.getWorkouts()[date] || [];

    if (workouts.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fa-solid fa-satellite-dish" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No missions scheduled for this cycle.</p>
            </div>
        `;
        return;
    }

    workouts.forEach((workout, index) => {
        const item = document.createElement('div');
        item.className = 'workout-item';
        item.innerHTML = `
            <div class="workout-info">
                <h4>${workout.name}</h4>
                <div class="workout-meta">
                    <span><i class="fa-solid fa-dumbbell"></i> ${workout.sets} x ${workout.reps}</span>
                    <span><i class="fa-solid fa-weight-hanging"></i> ${workout.weight}kg</span>
                    <span style="color: ${getDifficultyColor(workout.difficulty)}">${workout.difficulty}</span>
                </div>
            </div>
            <div class="workout-actions">
                <button class="btn btn-check" onclick="toggleComplete('${date}', ${index})">
                    <i class="fa-solid fa-check-circle" style="${workout.completed ? 'color: var(--success-color)' : 'opacity: 0.5'}"></i>
                </button>
                <button class="btn btn-delete" onclick="deleteWorkout('${date}', ${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

function getDifficultyColor(diff) {
    const colors = {
        'Easy': 'var(--success-color)',
        'Medium': 'var(--accent-color)',
        'Hard': '#ef4444',
        'Extreme': '#a855f7'
    };
    return colors[diff] || 'white';
}

function deleteWorkout(date, index) {
    const workouts = Storage.getWorkouts();
    if (workouts[date]) {
        workouts[date].splice(index, 1);
        Storage.set(STORAGE_KEYS.WORKOUTS, workouts);
        renderWorkouts(date);
    }
}

function toggleComplete(date, index) {
    const workouts = Storage.getWorkouts();
    if (workouts[date]) {
        workouts[date][index].completed = !workouts[date][index].completed;
        Storage.set(STORAGE_KEYS.WORKOUTS, workouts);
        renderWorkouts(date);

        if (workouts[date][index].completed) {
            // Updated: simplified celebration call
            if (typeof playCelebration === 'function') playCelebration();
        }
    }
}

/* Modal & Form Logic */
function initModal() {
    const modal = document.getElementById('add-workout-modal');
    const btn = document.getElementById('add-workout-btn');
    const close = document.querySelector('.close-modal');
    const form = document.getElementById('add-workout-form');

    if (btn) {
        btn.onclick = () => {
            modal.classList.add('active');
            gsap.from('.modal-content', { y: -50, opacity: 0, duration: 0.3 });
            populateSuggestions();
        };
    }

    if (close) {
        close.onclick = () => modal.classList.remove('active');
    }

    window.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('exercise-name').value;
            const muscle = document.getElementById('muscle-group').value;
            const difficulty = document.getElementById('difficulty').value;
            const sets = document.getElementById('sets').value;
            const reps = document.getElementById('reps').value;
            const weight = document.getElementById('weight').value;

            const newWorkout = {
                id: Date.now().toString(),
                name,
                muscle,
                difficulty,
                sets,
                reps,
                weight,
                completed: false
            };

            Storage.saveWorkout(selectedDate, newWorkout);
            renderWorkouts(selectedDate);
            modal.classList.remove('active');
            form.reset();

            // Animation for success
            // alert('Workout Added!');
        };
    }
}

function populateSuggestions() {
    const datalist = document.getElementById('exercise-suggestions');
    datalist.innerHTML = '';
    const all = Exercises.getAll();
    all.forEach(ex => {
        const option = document.createElement('option');
        option.value = ex.name;
        datalist.appendChild(option);
    });
}
