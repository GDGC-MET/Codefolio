document.addEventListener('DOMContentLoaded', function() {
    
    // --- Initial Load & Preloader ---
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    setTimeout(hideLoadingScreen, 1500);

    // --- Particles Initialization ---
    if (window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#5e64ff" }, 
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#5e64ff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // --- Custom Cursor (rAF for Performance) ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveElements = document.querySelectorAll('a, button, .project-tile, .skill-card, .logo, .social-links a');
    
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        });
    });

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'var(--secondary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'var(--primary)';
        });
    });

    // --- Header, Nav, and Scroll Logic (Centralized) ---
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const navLinksList = document.getElementById('navLinks');
    const mobileMenu = document.getElementById('mobileMenu');
    const sections = document.querySelectorAll('main section');

    function closeMobileMenu() {
        navLinksList.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
    
    mobileMenu.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    function highlightNavLink(scrollY) {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        highlightNavLink(scrollY);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Universal smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        });
    });

    // Back to Top handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- Stats & Skill Animation (Intersection Observer) ---
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;
    
    const animateStats = function() {
        if (hasAnimatedStats) return;
        hasAnimatedStats = true;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCount(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                current = Math.floor(progress * target);
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }
            requestAnimationFrame(updateCount);
        });
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                if (entry.target.classList.contains('skill-card')) {
                    const level = entry.target.getAttribute('data-level');
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    if (progressBar && level) {
                        progressBar.style.transform = `scaleX(${level / 100})`;
                    }
                }
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .skill-card, .project-tile').forEach(element => {
        sectionObserver.observe(element);
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        console.log('Form data captured:', data);
        
        setTimeout(() => {
            alert('Thank you for your message! Morgan will be in touch soon.');
            event.target.reset();
        }, 500);
    });


    // --- Typewriter Effect ---
    function typewriterEffect(elementId, titles) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let lastTime = 0;
        
        const speed = { typing: 100, deleting: 50, pause: 2000 }; 

        function animateTypewriter(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            const currentTitle = titles[currentIndex];
            let delay = isDeleting ? speed.deleting : speed.typing;
            
            if (deltaTime > delay) {
                if (isDeleting) {
                    element.textContent = currentTitle.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    element.textContent = currentTitle.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                element.style.borderRight = (isDeleting || charIndex < currentTitle.length) ? '3px solid var(--secondary)' : 'none';

                if (!isDeleting && charIndex === currentTitle.length) {
                    isDeleting = true;
                    lastTime = timestamp + speed.pause; 
                    requestAnimationFrame(animateTypewriter);
                    return;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % titles.length;
                    lastTime = timestamp + 500; 
                    requestAnimationFrame(animateTypewriter);
                    return;
                }
                
                lastTime = timestamp;
            }

            requestAnimationFrame(animateTypewriter);
        }
        
        requestAnimationFrame(animateTypewriter);
    }
    
    typewriterEffect('typewriter-text', ["MERN Stack Specialist", "AI Integration Engineer", "Unique UI/UX Architect", "Full-Stack Developer"]);
    
    // --- Accessibility: Keyboard Navigation Focus ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});