/* Main App Logic */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    updateDate();
    initStars();
    loadStats();
    
    // Greeting
    const hour = new Date().getHours();
    const greetingText = document.getElementById('greeting-text');
    let greeting = "Ready for liftoff, Aman?";
    if (hour < 12) greeting = "Good Morning, Commander.";
    else if (hour < 18) greeting = "Good Afternoon, Commander.";
    else greeting = "Good Evening, Commander.";
    
    if (greetingText) greetingText.textContent = greeting;

    console.log("AntiGravity System Online.");
}

function updateDate() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

function initStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const xy = Math.random() * 100;
        const duration = Math.random() * 1 + 1;
        const size = Math.random() * 2;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${duration}s infinite alternate`;
        
        container.appendChild(star);
    }
}

function loadStats() {
    // Placeholder for storage loading
    // For now, simulate numbers counting up
    const stats = document.querySelectorAll('.count-up');
    stats.forEach(stat => {
        // Random values for demo
        const target = Math.floor(Math.random() * 100); 
        stat.textContent = target; // Simplify for now, will add CountUp logic later
    });
}
