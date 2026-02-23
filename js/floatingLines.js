/**
 * Floating Lines Background Module
 * Renders smooth Bezier curves that gently react to mouse movement.
 */

export function initFloatingLines() {
    const canvas = document.createElement('canvas');
    canvas.id = 'lines-canvas';
    // Style handled in CSS, but ensure z-index is behind content
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-5',
        pointerEvents: 'none'
    });

    // Insert early in body
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let width, height;
    let lines = [];

    const config = {
        lineCount: 15,
        amplitude: 50, // Wave height
        frequency: 0.002, // Wave frequency
        speed: 0.0005, // Animation speed
        color: 'rgba(255, 255, 255, 0.03)'
    };

    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 }; // For smooth interpolation

    window.addEventListener('mousemove', e => {
        targetMouse.x = (e.clientX - width / 2) * 0.1; // Reduced influence
        targetMouse.y = (e.clientY - height / 2) * 0.1;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initLines();
    }

    function initLines() {
        lines = [];
        for (let i = 0; i < config.lineCount; i++) {
            lines.push({
                y: (height / config.lineCount) * i + (height / config.lineCount) / 2,
                offset: Math.random() * Math.PI * 2,
                speed: config.speed + (Math.random() * 0.0002)
            });
        }
    }

    window.addEventListener('resize', resize);
    resize();

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse follow
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;

        ctx.lineWidth = 1;
        ctx.strokeStyle = config.color;

        lines.forEach((line, index) => {
            ctx.beginPath();

            // Draw a wave across the screen
            for (let x = 0; x <= width; x += 20) {
                // Calculate Y based on sine wave + mouse influence
                const distanceFromCenter = 1 - Math.abs(x - width / 2) / (width / 2);
                const waveY = Math.sin(x * config.frequency + time * line.speed + line.offset) * config.amplitude;

                // Add interactivity based on mouse position relative to this line
                const distToMouse = Math.abs(mouse.y + height / 2 - line.y);
                const interaction = Math.max(0, 100 - distToMouse) * 0.2;

                ctx.lineTo(x, line.y + waveY + (mouse.y * 0.5) * distanceFromCenter);
            }

            ctx.stroke();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
