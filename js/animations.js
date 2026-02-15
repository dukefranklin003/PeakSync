/* Animations Logic (GSAP) */

// Wait for GSAP to load
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined') {
        initAnimations();
    }
});

function initAnimations() {
    // Header Load Animation
    gsap.from('.main-header', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Stats Cards Cascade
    gsap.from('.stat-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    // Hover Effects Logic (Tilt)
    const cards = document.querySelectorAll('.glass-card[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: 'power1.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                ease: 'power1.out'
            });
        });
    });
}

// Celebration Function
function playCelebration() {
    // Simple confetti burst using GSAP or creating elements
    const colors = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.borderRadius = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 50;

        gsap.to(confetti, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

// Export for global usage
window.playCelebration = playCelebration;
