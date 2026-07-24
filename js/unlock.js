document.addEventListener('DOMContentLoaded', () => {
    const CORRECT_PIN = "180307";
    let currentInput = "";

    const pinDots = document.querySelectorAll('.pin-dot');
    const errorMsg = document.getElementById('errorMsg');
    const unlockCard = document.getElementById('unlockCard');
    const unlockContainer = document.getElementById('unlockContainer');
    const successOverlay = document.getElementById('successOverlay');

    const wrongMessages = [
        "Nice try... Only mi niña knows the secret."
    ];

    // Background Stars & Hearts
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
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
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 16 + 12}px`;
        heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }

    // Keypad Click Event
    const keyButtons = document.querySelectorAll('.key-btn');
    keyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            handleInput(val);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            handleInput(e.key);
        } else if (e.key === 'Backspace') {
            handleInput('backspace');
        }
    });

    function handleInput(val) {
        errorMsg.textContent = "";

        if (val === 'backspace') {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
            }
        } else if (val === 'heart') {
            // Heart button secret easter egg
            errorMsg.textContent = "❤️ Follow your heart's memory...";
            return;
        } else {
            if (currentInput.length < 6) {
                currentInput += val;
            }
        }

        updateDots();

        if (currentInput.length === 6) {
            checkPin();
        }
    }

    function updateDots() {
        pinDots.forEach((dot, index) => {
            if (index < currentInput.length) {
                dot.classList.add('filled');
                dot.classList.remove('error');
            } else {
                dot.classList.remove('filled', 'error');
            }
        });
    }

    function checkPin() {
        if (currentInput === CORRECT_PIN) {
            handleSuccess();
        } else {
            handleWrong();
        }
    }

    function handleWrong() {
        // Shake card
        unlockCard.classList.add('shake');
        pinDots.forEach(dot => dot.classList.add('error'));

        // Pick random wrong message
        const randomMsg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
        errorMsg.textContent = randomMsg;

        setTimeout(() => {
            unlockCard.classList.remove('shake');
            currentInput = "";
            updateDots();
        }, 1000);
    }

    function handleSuccess() {
        launchConfetti();

        // Fade keypad container
        unlockContainer.style.opacity = '0';
        unlockContainer.style.transform = 'scale(0.9)';

        setTimeout(() => {
            unlockContainer.style.display = 'none';
            successOverlay.classList.add('active');
        }, 800);

        // Auto transition after 3.2s
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                window.location.href = 'love.html';
            }, 1000);
        }, 3200);
    }

    // Confetti Animation
    function launchConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff4b8b', '#ff75a0', '#ffb3c6', '#ffffff', '#ffd1dc'];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                size: Math.random() * 12 + 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.7) * 12,
                gravity: 0.15,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10
            });
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rotation += p.rotSpeed;

                if (p.y < canvas.height) active = true;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.font = `${p.size}px serif`;
                ctx.fillText('❤️', 0, 0);
                ctx.restore();
            });

            if (active) requestAnimationFrame(render);
        }

        render();
    }
});
