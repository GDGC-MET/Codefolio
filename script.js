document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;

        let dotX = 0;
        let dotY = 0;

        let outlineX = 0;
        let outlineY = 0;

        const speedDot = 0.2;
        const speedOutline = 0.1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            dotX += (mouseX - dotX) * speedDot;
            dotY += (mouseY - dotY) * speedDot;

            outlineX += (mouseX - outlineX) * speedOutline;
            outlineY += (mouseY - outlineY) * speedOutline;

            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile menu
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navLinks && mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    if (navLinksAnchors) {
        navLinksAnchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                scrollToSection(sectionId);

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    if (stats) {
        const animateStats = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const duration = 2000;
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
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            event.target.reset();
        });
    }

    // Keyboard navigation accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Typewriter effect
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        const titles = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Tech Innovator"];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentTitle = titles[titleIndex];
            if (isDeleting) {
                subtitleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                subtitleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type();
    }

    // Particles.js integration
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: { value: "#3498db" },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.5,
                    random: false,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3498db",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                }
            },
            retina_detect: true
        });
    }

    // Theme toggle
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }

    // Timeline animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems) {
        timelineItems.forEach(item => observer.observe(item));
    }

    const skillCards = document.querySelectorAll('.skill-card-front');
    if (skillCards) {
        skillCards.forEach(card => observer.observe(card));
    }

    const skillCardInners = document.querySelectorAll('.skill-card-inner');
    if (skillCardInners) {
        skillCardInners.forEach(inner => {
            inner.addEventListener('mouseenter', () => {
                inner.classList.add('flipped');
            });
            inner.addEventListener('mouseleave', () => {
                inner.classList.remove('flipped');
            });
        });
    }

    // 3D Skill Visualization
    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js-square' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'TensorFlow', icon: 'fab fa-tensorflow' },
        { name: 'PyTorch', icon: 'fab fa-pytorch' },
        { name: 'Figma', icon: 'fab fa-figma' },
    ];

    const skillVisualization = document.getElementById('skill-visualization');

    if (skillVisualization) {
        skills.forEach(skill => {
            const icon = document.createElement('div');
            icon.classList.add('skill-icon-3d');
            icon.innerHTML = `<i class="${skill.icon}"></i>`;
            skillVisualization.appendChild(icon);
        });

        skillVisualization.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = skillVisualization;
            const x = (clientX / offsetWidth - 0.5) * 40;
            const y = (clientY / offsetHeight - 0.5) * 40;

            skillVisualization.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerHeight = document.getElementById('header').offsetHeight;

    if (section) {
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

function subscribe(event) {
    event.preventDefault();
    alert('Thank you for subscribing!');
    event.target.reset();
}