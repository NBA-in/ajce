import { initSplashCursor } from './js/splashCursor.js';
import { initFloatingLines } from './js/floatingLines.js';
import { initTextReveal } from './js/textReveal.js';
import { initScrollReveal } from './js/scrollReveal.js';

// Initialize Modules
document.addEventListener('DOMContentLoaded', () => {
    initSplashCursor();
    initFloatingLines();
    initTextReveal();
    initScrollReveal();
});

// Original Header Scroll Logic
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Fade out global background text
    const bgText = document.getElementById('global-bg-text');
    if (bgText) {
        const opacity = Math.max(0, 1 - (window.scrollY / (window.innerHeight * 1.5)));
        bgText.style.opacity = opacity;
    }
});

// Original Mobile Menu Logic
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (nav && nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

