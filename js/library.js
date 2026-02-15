/* Library Logic */

document.addEventListener('DOMContentLoaded', () => {
    initLibrary();
});

function initLibrary() {
    renderExerciseGrid(Exercises.getAll());
    initFilters();
    initSearch();
}

function renderExerciseGrid(exercises) {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;
    grid.innerHTML = '';

    exercises.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'exercise-card glass-card';
        card.innerHTML = `
            <div class="exercise-header">
                <span class="muscle-badge">${ex.category}</span>
                <span class="difficulty-badge difficulty-${ex.difficulty.toLowerCase()}">${ex.difficulty}</span>
            </div>
            <h3 class="exercise-name">${ex.name}</h3>
            <p class="exercise-meta">Target: ${ex.category} • Rec: 3 Sets</p>
            <button class="add-to-day-btn" onclick="quickAddWorkout('${ex.id}')">
                <i class="fa-solid fa-plus"></i> Add to Mission
            </button>
        `;
        grid.appendChild(card);
    });
}

function initFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter logic
            const filter = tab.dataset.filter;
            const allExercises = Exercises.getAll();

            if (filter === 'All') {
                renderExerciseGrid(allExercises);
            } else {
                const filtered = allExercises.filter(ex => ex.category === filter);
                renderExerciseGrid(filtered);
            }
        });
    });
}

function initSearch() {
    const searchInput = document.getElementById('exercise-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const allExercises = Exercises.getAll();

        const filtered = allExercises.filter(ex =>
            ex.name.toLowerCase().includes(term) ||
            ex.category.toLowerCase().includes(term)
        );

        renderExerciseGrid(filtered);
    });
}

function quickAddWorkout(id) {
    const all = Exercises.getAll();
    const ex = all.find(e => e.id === id);
    if (!ex) return;

    // Default values
    const newWorkout = {
        id: Date.now().toString(),
        name: ex.name,
        muscle: ex.category,
        difficulty: ex.difficulty,
        sets: 3,
        reps: 10,
        weight: 0,
        completed: false
    };

    // Add to selected date (from planner.js scope)
    // Note: selectedDate is global in planner.js, need to ensure access or import
    // Simple fix: use Storage.saveWorkout with current global selectedDate if available, else today

    const targetDate = (typeof selectedDate !== 'undefined') ? selectedDate : new Date().toISOString().split('T')[0];

    Storage.saveWorkout(targetDate, newWorkout);

    // If planner is visible, refresh it
    if (typeof renderWorkouts === 'function') {
        renderWorkouts(targetDate);
    }

    // Feedback
    // alert(`${ex.name} added to mission log!`);
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
    btn.style.background = 'var(--success-color)';
    btn.style.color = 'white';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
}
