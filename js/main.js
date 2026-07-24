document.addEventListener('DOMContentLoaded', () => {
    // Generate Stars
    const starsContainer = document.getElementById('stars');
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
    }

    // Generate Floating Hearts
    const heartsContainer = document.getElementById('hearts');
    const heartCount = 18;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 16 + 12}px`;
        heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }

    // Mouse Sparkle Trail
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.25) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    });

    // Enter Button Navigation
    const enterBtn = document.getElementById('enterBtn');
    enterBtn.addEventListener('click', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            window.location.href = 'unlock.html';
        }, 600);
    });
});
