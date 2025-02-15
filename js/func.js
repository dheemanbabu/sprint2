function showProfile(profileIndex) {
    // Update nav buttons
    document.querySelectorAll('.main-nav .nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === profileIndex);
        
            document.querySelector(`.profile[data-profile="${profileIndex}"]`).scrollIntoView({ behavior: 'smooth' });
    });

    // Update profile visibility with smooth transition
    document.querySelectorAll('.profile').forEach((profile, index) => {
        if (index === profileIndex) {
            profile.classList.add('active');
            // Reset sections animation
            profile.querySelectorAll('.section').forEach(section => {
                section.classList.remove('visible');
                void section.offsetWidth; // Trigger reflow
            });
            // Animate sections with delay
            setTimeout(() => {
                profile.querySelectorAll('.section').forEach((section, i) => {
                    setTimeout(() => {
                        section.classList.add('visible');
                    }, i * 200);
                });
            }, 100);
        } else {
            profile.classList.remove('active');
        }
    });
}

// Animate sections on scroll
function handleScroll() {
    const activeProfile = document.querySelector('.profile.active');
    if (activeProfile) {
        activeProfile.querySelectorAll('.section').forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8) && (rect.bottom >= 0);
            if (isVisible) {
                section.classList.add('visible');
            }
        });
    }
}

// Initialize sections on load
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    const activeProfile = document.querySelector('.profile.active');
    if (activeProfile) {
        activeProfile.querySelectorAll('.section').forEach((section, i) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, i * 200);
        });
    }
});

window.addEventListener('scroll', handleScroll);

// Add mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.moving-gradient').style.transform = 
        `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${moveX * 2}deg)`;
});