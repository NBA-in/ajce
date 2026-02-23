/**
 * Decrypted Text Reveal Module
 * Cycles through random characters before revealing the final text.
 */

export function initTextReveal() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    const selector = '.hacker-text'; // Class to target

    const elements = document.querySelectorAll(selector);

    const reveal = (element) => {
        // Prevent running if already decoding
        if (element.dataset.decoding === 'true') return;
        element.dataset.decoding = 'true';

        const originalText = element.dataset.value || element.innerText;
        element.dataset.value = originalText;

        let iterations = 0;
        const maxIterations = 3; // How many times each letter scrambles

        const interval = setInterval(() => {
            element.innerText = originalText.split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.innerText = originalText;
                element.dataset.decoding = 'false';
            }

            iterations += 1 / 3; // Speed control: larger fraction = faster, smaller = slower
        }, 30);
    };

    // Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reveal(entry.target);
                // Optional: Stop observing if we only want it to run once per session
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    // Also export a manual trigger function if needed for hover effects
    return { reveal };
}
