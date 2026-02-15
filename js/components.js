/* Component Logic */

// Helper to create element with classes
function createElement(tag, classes = [], text = '') {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    if (text) el.textContent = text;
    return el;
}

// Stats Counter Animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Count Up Animation for Stats
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        // If target is 0, maybe pick a random number for demo
        const finalVal = target > 0 ? target : Math.floor(Math.random() * 50) + 10;
        animateValue(counter, 0, finalVal, 2000);
    });
});
