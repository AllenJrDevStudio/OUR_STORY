document.addEventListener('DOMContentLoaded', () => {
    // --- Stars & Hearts Generation ---
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 70; i++) {
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

    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 16 + 12}px`;
        heart.style.animationDuration = `${Math.random() * 7 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }

    // --- Dynamic Typewriter Loop ---
    const phrases = [
        "I miss you...",
        "I love you...",
        "You're my favorite person.",
        "Forever yours ❤️"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeLoop, speed);
    }

    typeLoop();
    
    // --- Rotating Quotes ---
    const quotes = [
        { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "— Maya Angelou" },
        { text: "I love you not only for what you are, but for what I am when I am with you.", author: "— Roy Croft" },
        { text: "If I had a flower for every time I thought of you... I could walk through my garden forever.", author: "— Alfred Tennyson" },
        { text: "You are my heart, my life, my one and only thought.", author: "— Arthur Conan Doyle" }
    ];
    let quoteIndex = 0;
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    setInterval(() => {
        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.textContent = quotes[quoteIndex].text;
            quoteAuthor.textContent = quotes[quoteIndex].author;
            quoteText.style.opacity = '1';
        }, 500);
    }, 6000);

    // --- Local Audio Player ---
    const musicBtn = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    const musicIcon = document.getElementById('musicIcon');
    const audio = document.getElementById('romanticAudio');

    let isPlaying = false;

    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    function playMusic() {
        
        audio.play()
            .then(() => {
                isPlaying = true;
                musicText.textContent = "Pause Song";
                musicIcon.textContent = "⏸️";
                musicBtn.classList.add('playing');
            })
            .catch(error => {
                console.error("Audio playback error:", error);
            });
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        musicText.textContent = "Play Our Song";
        musicIcon.textContent = "🎵";
        musicBtn.classList.remove('playing');
    }

    
    audio.addEventListener('ended', () => {
        pauseMusic();
    });

    // --- Scroll Fade-In Observer ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(el => observer.observe(el));

    // --- Interactive Extra Love Button ---
    const spawnBtn = document.getElementById('spawnHeartBtn');
    spawnBtn.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) {
            const h = document.createElement('div');
            h.innerHTML = '💖';
            h.style.position = 'fixed';
            h.style.left = `${e.clientX + (Math.random() - 0.5) * 100}px`;
            h.style.top = `${e.clientY + (Math.random() - 0.5) * 100}px`;
            h.style.fontSize = '24px';
            h.style.pointerEvents = 'none';
            h.style.transition = 'all 1s ease-out';
            h.style.zIndex = '999';
            document.body.appendChild(h);

            setTimeout(() => {
                h.style.transform = `translateY(-100px) scale(1.5)`;
                h.style.opacity = '0';
            }, 50);

            setTimeout(() => h.remove(), 1100);
        }
    });
});
