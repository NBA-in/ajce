// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const wheel = preloader.querySelector('.loader-wheel');

    // Short delay to show the loader animation
    setTimeout(() => {
        // Fade out preloader
        preloader.classList.add('loaded');

        // Clone wheel to corner
        const cornerWheel = wheel.cloneNode(true);
        cornerWheel.classList.remove('loader-wheel');
        cornerWheel.classList.add('corner-wheel');
        document.body.appendChild(cornerWheel);
    }, 1500); // 1.5s loading time
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle (to be expanded if needed)
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        // Toggle Nav or mobile view
        console.log('Burger clicked');
    });
}

// Scroll Reveal Animation with Intersection Observer
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealCallback, revealOptions);

// Select elements to reveal
document.querySelectorAll('.skill-card, .project-card, .section-title').forEach(el => {
    el.style.opacity = "0"; // Initial state for JS-based animation
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Create elements if they don't exist (since we didn't add them to HTML yet)
if (!cursorDot && window.matchMedia("(pointer: fine)").matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const outline = document.createElement('div');
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);
}

// Re-select after creation
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Outline follows with lag for "drift" feel
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects for links/buttons
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.borderColor = 'transparent';
            outline.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.borderColor = 'var(--primary)';
            outline.style.backgroundColor = 'transparent';
        });
    });
}

// Kinetic Typography Scroll Effect
const kineticTexts = document.querySelectorAll('.kinetic-text');

if (kineticTexts.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        kineticTexts.forEach((text, index) => {
            // Alternating directions
            const direction = index % 2 === 0 ? -1 : 1;
            const speed = 0.2;
            text.style.transform = `translateX(${scrolled * speed * direction}px)`;
        });
    });
}

const glitchTitles = document.querySelectorAll('.hero-content h1, .section-title');

const runTypewriter = (target) => {
    // Prevent re-running if already animated
    if (target.dataset.animated === 'true') return;
    target.dataset.animated = 'true';

    const originalText = target.dataset.value || target.innerText;
    target.dataset.value = originalText; // Store original text
    target.innerText = ''; // Start empty
    target.classList.add('typing'); // Enable cursor

    let i = 0;
    clearInterval(target.interval);

    target.interval = setInterval(() => {
        target.innerText = originalText.substring(0, i);
        i++;

        if (i > originalText.length) {
            clearInterval(target.interval);
            target.innerText = originalText; // Ensure full text is set
            target.classList.remove('typing'); // Remove cursor

            // Randomly select a glitch variation for idle state
            const glitchClasses = ['glitch-idle', 'glitch-noise', 'glitch-slice'];
            const randomClass = glitchClasses[Math.floor(Math.random() * glitchClasses.length)];

            target.classList.add(randomClass);
            target.setAttribute('data-text', originalText);
        }
    }, 80); // Slightly faster typing
}

// Trigger Glitch on Intersection
const glitchObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runTypewriter(entry.target);
            observer.unobserve(entry.target); // Only run once
        }
    });
}, { threshold: 0.3 }); // Lower threshold to trigger earlier

glitchTitles.forEach(title => {
    glitchObserver.observe(title);
});
