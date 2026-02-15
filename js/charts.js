/* Charts Logic */

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initHeatmap();
});

function initCharts() {
    const ctxWeekly = document.getElementById('weeklyChart');
    const ctxMuscle = document.getElementById('muscleChart');

    if (ctxWeekly) {
        new Chart(ctxWeekly, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Minutes',
                    data: [45, 60, 0, 30, 90, 0, 45], // Placeholder data
                    backgroundColor: 'rgba(124, 58, 237, 0.6)',
                    borderColor: '#7c3aed',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    if (ctxMuscle) {
        new Chart(ctxMuscle, {
            type: 'doughnut',
            data: {
                labels: ['Chest', 'Back', 'Legs', 'Cardio', 'Core'],
                datasets: [{
                    data: [30, 20, 25, 15, 10], // Placeholder data
                    backgroundColor: [
                        '#7c3aed', // Purple
                        '#06b6d4', // Cyan
                        '#f59e0b', // Accent
                        '#10b981', // Green
                        '#ef4444'  // Red
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
    }
}

function initHeatmap() {
    const container = document.getElementById('calendar-heatmap');
    if (!container) return;

    // Create 30 slots
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';

        // Randomly activate some for demo
        if (Math.random() > 0.6) {
            cell.classList.add('active');
        }

        container.appendChild(cell);
    }
}
