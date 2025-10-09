// ===== Modern Interactive Portfolio JavaScript =====

class ModernPortfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupNavigation();
    }

    init() {
        // Initialize loading screen
        this.showLoadingScreen();
        
        // Initialize particles if library is available
        if (typeof particlesJS !== 'undefined') {
            this.initParticles();
        }
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
        
        // Initialize stats counter
        this.initStatsCounter();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'visible';
                this.revealContent();
            }, 500);
        }, 1500);
    }

    revealContent() {
        // Trigger entrance animations
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        
        let ticking = false;

        const updateScroll = () => {
            const scrollY = window.scrollY;
            
            // Header scroll effect
            if (scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            // Back to top button
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Update active navigation
            this.updateActiveNavigation();
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupNavigation() {
        // Mobile menu toggle
        window.toggleMobileMenu = () => {
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        };

        // Smooth scroll to section
        window.scrollToSection = (sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const targetPosition = section.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        };

        // Scroll to top
        window.scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    }

    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const counters = new Map();

        const animateCounter = (element, target) => {
            const increment = target / 200;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counters.has(entry.target)) {
                    const target = parseInt(entry.target.getAttribute('data-count') || 0);
                    counters.set(entry.target, true);
                    setTimeout(() => {
                        animateCounter(entry.target, target);
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    setupAnimations() {
        // Add hover effects to cards
        this.setupCardHoverEffects();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0)';
                card.style.boxShadow = '';
            });
        });
    }

    initParticles() {
        if (typeof particlesJS === 'undefined') return;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#6366f1', '#06b6d4', '#f59e0b']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
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
                    }
                }
            },
            retina_detect: true
        });
    }

    setupEventListeners() {
        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmission.bind(this));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const navLinks = document.getElementById('navLinks');
                const mobileMenu = document.querySelector('.mobile-menu');
                
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span> ✓';
            submitBtn.style.background = 'var(--success)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                e.target.reset();
            }, 3000);
        }, 2000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio functionality
    new ModernPortfolio();
    
    // Add CSS classes for animations
    const elementsToAnimate = [
        { selector: '.hero-text', class: 'slide-in-left' },
        { selector: '.hero-visual', class: 'slide-in-right' },
        { selector: '.about-text', class: 'fade-in' },
        { selector: '.about-image', class: 'scale-in' },
        { selector: '.skill-card', class: 'fade-in' },
        { selector: '.project-card', class: 'scale-in' },
        { selector: '.contact-info', class: 'slide-in-left' },
        { selector: '.contact-form', class: 'slide-in-right' }
    ];
    
    elementsToAnimate.forEach(({ selector, class: className }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add(className);
        });
    });
});