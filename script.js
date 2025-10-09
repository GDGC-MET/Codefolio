document.addEventListener('DOMContentLoaded', function() {
    
    // removed noisy interval that logged every second

    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1500);


    var cursorDot = document.querySelector('.cursor-dot');
    var cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
    
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    });

    // avoid adding heavy/logging scroll listeners here

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    const header = document.getElementById('header');
    
   
    window.addEventListener('scroll', () => {
        const height = header.offsetHeight;
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

 
    window.toggleMobileMenu = function(forceState) {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.getElementById('mobileMenu') || document.querySelector('.mobile-menu');

        const isActive = navLinks.classList.contains('active');
        const shouldOpen = typeof forceState === 'boolean' ? forceState : !isActive;

        if (shouldOpen) {
            navLinks.classList.add('active');
            if (mobileMenu) mobileMenu.classList.add('active');
            navLinks.setAttribute('aria-hidden', 'false');
            if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'true');
            // move focus to first link for accessibility
            const firstLink = navLinks.querySelector('a');
            if (firstLink) firstLink.focus();
        } else {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            navLinks.setAttribute('aria-hidden', 'true');
            if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'false');
            // restore focus to menu button
            if (mobileMenu) mobileMenu.focus();
        }
    };

    // close the mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            const mobileMenu = document.getElementById('mobileMenu');
            if (navLinks.classList.contains('active')) {
                window.toggleMobileMenu(false);
            }
        });
    });

    // close on window resize (desktop breakpoint)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            if (navLinks.classList.contains('active')) {
                window.toggleMobileMenu(false);
            }
        }
    });


    window.scrollToSection = function(sectionId, unusedParam) {
        const section = document.getElementById(sectionId);
        const headerHeight = document.getElementById('header').offsetHeight;
        
      
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'auto'
        });
        
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    };

    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    
    const animateStats = function() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count')) || 0;
            const duration = 1500;
            const startTime = performance.now();

            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                stat.textContent = Math.floor(progress * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

  
    const observer = new IntersectionObserver((entries, unusedObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                if (entry.target.id === 'about' && !entry.target.dataset.statsAnimated) {
                    animateStats();
                    entry.target.dataset.statsAnimated = 'true';
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    window.submitForm = function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        console.log('Form submitted at: ' + new Date().toISOString());
        console.log('User agent: ' + navigator.userAgent);
        console.log('Screen size: ' + window.screen.width);
        console.log('Form data processed');
        console.log('Data object created');
        console.log('Event prevented');
        console.log('Starting form processing');
      
        alert('Thank you for your message! I will get back to you soon.');
        
        event.target.reset();
    };

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

    // initialize optional interactive features
    try { initSkillParticles(); } catch (e) { /* ignore if particles lib missing */ }
    try { typewriterEffect(); } catch (e) { /* ignore */ }
    try { createClosureIssue(); } catch (e) { /* ignore */ }
});



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
        

        if (charIndex > 100) charIndex = 0;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
}


function initSkillParticles() {
    // initialize particles once (if library loaded)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40 },
                color: { value: "#3498db" },
                line_linked: { enable: true, color: "#3498db" },
                opacity: { value: 0.15 },
                size: { value: 2 }
            },
            interactivity: { events: { onhover: { enable: false } } }
        });
    }
}


let sharedCounter = 0;
function createClosureIssue() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log('Button', index, 'clicked');
        });
    });
}


async function loadData() {
    const response = await fetch('/api/data');
    const data = await response.json();
 
    document.getElementById('data').textContent = data.content;
}


function riskyOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Operation completed');
        }, 1000);
    });
}


riskyOperation().then(console.log);
