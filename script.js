document.addEventListener('DOMContentLoaded', function () {
    // Loading screen fade out
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1200);

    // --- Old cursor code ---
    // const cursorDot = document.querySelector('.cursor-dot');
    // const cursorOutline = document.querySelector('.cursor-outline');
    // let cursorVisible = false;
    // document.addEventListener('mousemove', (e) => {
    //     cursorDot.style.left = `${e.clientX}px`;
    //     cursorDot.style.top = `${e.clientY}px`;
    //     cursorOutline.style.left = `${e.clientX}px`;
    //     cursorOutline.style.top = `${e.clientY}px`;
    //     if (!cursorVisible) {
    //         cursorDot.style.opacity = 1;
    //         cursorOutline.style.opacity = 1;
    //         cursorVisible = true;
    //     }
    // });
    // document.addEventListener('mouseleave', () => {
    //     cursorDot.style.opacity = 0;
    //     cursorOutline.style.opacity = 0;
    //     cursorVisible = false;
    // });
    // const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    // interactiveElements.forEach(element => {
    //     element.addEventListener('mouseenter', () => {
    //         cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    //     });
    //     element.addEventListener('mouseleave', () => {
    //         cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    //     });
    // });

    // --- New smooth cursor animation code ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let cursorVisible = false;
    let outlineScale = 1;

    function animateCursor() {
        // Smoothly interpolate positions
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        outlineX += (mouseX - outlineX) * 0.18;
        outlineY += (mouseY - outlineY) * 0.18;

        cursorDot.style.transform = `translate(-50%, -50%) translate(${dotX}px, ${dotY}px)`;
        cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale}) translate(${outlineX}px, ${outlineY}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorVisible) {
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
            cursorVisible = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = 0;
        cursorOutline.style.opacity = 0;
        cursorVisible = false;
    });

    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            outlineScale = 1.5;
        });
        element.addEventListener('mouseleave', () => {
            outlineScale = 1;
        });
    });

    // Header scroll effect and back-to-top button
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function () {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    };

    // Smooth scroll to section
    window.scrollToSection = function (sectionId) {
        const section = document.getElementById(sectionId);
        const headerHeight = header.offsetHeight;
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    };

    // Back to top button
    window.scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Animate stats on intersection
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const duration = 1200;
            const step = target / (duration / 16);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Intersection observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Contact form handler
    window.submitForm = function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        alert('Thank you for your message! I will get back to you soon.');
        event.target.reset();
    };

    // Keyboard navigation accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Typewriter effect for subtitle
    typewriterEffect();

    // Initialize particles.js only once with a smooth config
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#3498db" },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: false },
            size: { value: 8, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#2ecc71",
                opacity: 0.4,
                width: 2
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
});

// --- Improved typewriter effect ---
function typewriterEffect() {
    const titles = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Tech Innovator"];
    const element = document.querySelector('.hero-subtitle');
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[currentIndex];
        if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(type, 1200);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            setTimeout(type, 400);
        } else {
            setTimeout(type, isDeleting ? 40 : 80);
        }
    }
    type();
}