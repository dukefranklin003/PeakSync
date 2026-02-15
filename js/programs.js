/* Programs Logic */

const PROGRAMS_DB = [
    {
        id: 'zero_gravity',
        name: 'Zero Gravity',
        difficulty: 'Beginner',
        duration: '4 Weeks',
        daysPerWeek: 3,
        desc: 'Ideal for new cadets. Full body conditioning to prepare for space travel.',
        color: 'success'
    },
    {
        id: 'orbit_protocol',
        name: 'Orbit Protocol',
        difficulty: 'Intermediate',
        duration: '6 Weeks',
        daysPerWeek: 4,
        desc: 'Hypertrophy focused split. Upper/Lower body rotation.',
        color: 'accent'
    },
    {
        id: 'supernova',
        name: 'Supernova',
        difficulty: 'Advanced',
        duration: '8 Weeks',
        daysPerWeek: 5,
        desc: 'High intensity interval training mixed with heavy lifting.',
        color: 'danger'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderPrograms();
});

function renderPrograms() {
    const grid = document.getElementById('programs-grid');
    if (!grid) return;

    PROGRAMS_DB.forEach(prog => {
        const card = document.createElement('div');
        card.className = 'program-card glass-card';
        // Difficulty badge class mapping
        const badgeClass = `badge-${prog.difficulty.toLowerCase()}`;

        card.innerHTML = `
            <span class="program-badge ${badgeClass}">${prog.difficulty}</span>
            <h3 class="program-title">${prog.name}</h3>
            <p class="program-desc">${prog.desc}</p>
            <div class="program-stats">
                <span><i class="fa-solid fa-calendar"></i> ${prog.duration}</span>
                <span><i class="fa-solid fa-repeat"></i> ${prog.daysPerWeek} Days/Wk</span>
            </div>
            <button class="btn-program" onclick="activateProgram('${prog.id}')">
                Initialize Protocol
            </button>
        `;
        grid.appendChild(card);
    });
}

function activateProgram(id) {
    const program = PROGRAMS_DB.find(p => p.id === id);
    if (program) {
        alert(`Initializing ${program.name}... (Simulation: Program Loaded)`);
        // In a real app, this would populate the planner for the next X weeks
    }
}
