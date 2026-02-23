/**
 * Splash Cursor Module
 * Creates a fluid-like effect that follows the mouse cursor.
 */

export function initSplashCursor() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fluid-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Total particles in the trail
    const decayRate = 0.92; // How fast particles fade
    const baseSize = 15; // Starting size of splash

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    const mouse = { x: -100, y: -100, active: false };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;

        // Add particles on move
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouse.x, mouse.y));
        }
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random velocity for splash effect
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;

            this.size = Math.random() * baseSize + 5;
            this.life = 1; // 1 = full opacity, 0 = dead

            // Varied colors for depth - blending gold and white/slate
            const colors = ['#FFD700', '#ffffff', '#94a3b8'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            this.vx *= 0.95; // Friction
            this.vy *= 0.95;

            this.life *= decayRate;
            this.size *= decayRate;
        }

        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        // Clear with trails
        ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'; // Match bg color with transparency
        ctx.fillRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life < 0.05) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}
