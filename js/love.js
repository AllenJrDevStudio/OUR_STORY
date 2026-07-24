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

    // --- Live Counter ---
    // Target date set to a special memory date (e.g. 521 days ago)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 521);
    startDate.setHours(startDate.getHours() - 13);
    startDate.setMinutes(startDate.getMinutes() - 42);

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCounter, 1000);
    updateCounter();

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

    // --- Audio Player Synth Melody (Web Audio API) ---
    let isPlaying = false;
    let audioCtx = null;
    let timerId = null;
    const musicBtn = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');

    function playRomanticMelody() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63];
        let noteIdx = 0;

        function playNote() {
            if (!isPlaying) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(notes[noteIdx], audioCtx.currentTime);

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 1.8);

            noteIdx = (noteIdx + 1) % notes.length;
            timerId = setTimeout(playNote, 1200);
        }

        playNote();
    }

    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            isPlaying = true;
            musicText.textContent = "Pause Music";
            playRomanticMelody();
        } else {
            isPlaying = false;
            musicText.textContent = "Play Our Song";
            if (audioCtx) audioCtx.close();
            clearTimeout(timerId);
        }
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

// Modal Logic
function openModal(cardEl) {
    const modal = document.getElementById('imageModal');
    const visual = document.getElementById('modalVisual');
    const caption = document.getElementById('modalCaption');
    
    const placeholder = cardEl.querySelector('.photo-placeholder');
    const cardCaption = cardEl.querySelector('.photo-caption').textContent;

    visual.className = 'modal-visual ' + placeholder.classList[1];
    visual.innerHTML = placeholder.querySelector('.photo-emoji').textContent;
    caption.textContent = cardCaption;

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
