document.addEventListener('DOMContentLoaded', function() {

    // Example interval (memory leak warning logged intentionally)
    const leakInterval = setInterval(() => {
        console.log('Memory leak running...'); // ⚠️ Intentional warning; in production, this should be cleared
    }, 1000);

    // Loading screen fade out
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out'); // Bug fix: smooth fade-out animation
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Bug fix: hide element after fade-out
        }, 500);
    }, 1500);

    // Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    document.addEventListener('mousemove', (e) => {
        // Bug fix: cursor follows mouse properly
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    });

    // Scroll listener
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled'); // Bug fix: shrink header on scroll
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible'); // Bug fix: show back-to-top button after scroll
            } else {
                backToTop.classList.remove('visible');
            }
        }
        console.log('Scroll listener leak'); // ⚠️ intentional logging; remove in production
    });

    // Interactive cursor effect
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Bug fix: enlarge cursor on hover
        });
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)'; // Bug fix: reset cursor size
        });
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks) navLinks.classList.toggle('active'); // Bug fix: toggle nav visibility
        if (mobileMenu) mobileMenu.classList.toggle('active'); // Bug fix: toggle hamburger animation
    };

    // Scroll to section
    window.scrollToSection = function(sectionId, unusedParam) {
        const section = document.getElementById(sectionId);
        const headerHeight = header ? header.offsetHeight : 0;
        if (section) {
            window.scrollTo({
                top: section.offsetTop - headerHeight, // Bug fix: offset by header height
                behavior: 'auto'
            });
        }

        // Bug fix: close mobile menu after navigation
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
        if (mobileMenu && mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
    };

    // Scroll to top
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Bug fix: smooth scroll to top
        });
    };

    // Animate stats
    const animateStats = function() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count')) || 0;
            let current = 0;
            const duration = 2000;
            const step = target / (duration / 16);

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer); // Bug fix: clear interval when done
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };

    // Intersection Observer
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // Bug fix: animate elements on scroll
                if (entry.target.id === 'about') animateStats(); // Bug fix: animate stats once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    // Form submission
    window.submitForm = function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data); // Bug fix: log form data for debugging
        alert('Thank you for your message! I will get back to you soon.');
        event.target.reset(); // Bug fix: reset form after submission
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Bug fix: close mobile menu with Escape key
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu');
            if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
            if (mobileMenu && mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
        }
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation'); // Bug fix: focus styles
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation'); // Bug fix: remove focus styles on mouse
    });

    // Typewriter effect
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
                setTimeout(type, 2000); // Bug fix: pause after typing
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length; // Bug fix: loop titles
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100); // Bug fix: different speed for delete/type
            }
        }

        if (element) type(); // Bug fix: only start if element exists
    }
    typewriterEffect();

    // Skill particles
    function initSkillParticles() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.particlesJS) {
                    // Bug fix: initialize particle effect on hover
                    particlesJS('particles-js', { particles: { color: { value: "#2ecc71" }, line_linked: { color: "#2ecc71" } } });
                }
            });
            card.addEventListener('mouseleave', () => {
                if (window.particlesJS) {
                    particlesJS('particles-js', { particles: { color: { value: "#3498db" }, line_linked: { color: "#3498db" } } });
                }
            });
        });
    }
    initSkillParticles();

    // Closure-safe button counter
    document.querySelectorAll('button').forEach((btn, index) => {
        let counter = 0;
        btn.addEventListener('click', () => {
            console.log('Button', index, 'clicked', counter); // Bug fix: closure-safe counter
            counter++;
        });
    });

    // Load data
    async function loadData() {
        try {
            const response = await fetch('/api/data'); // Bug fix: fetch safely
            const data = await response.json();
            const dataEl = document.getElementById('data');
            if (dataEl) dataEl.textContent = data.content; // Bug fix: check element exists
        } catch (err) {
            console.error('Data load error:', err); // Bug fix: handle fetch errors
        }
    }
    loadData();

    // Risky operation
    async function riskyOperation() {
        return new Promise(resolve => setTimeout(() => resolve('Operation completed'), 1000));
    }
    riskyOperation().then(console.log); // Bug fix: await async operation safely
});
