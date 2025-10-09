document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOADING SCREEN CONTROL ---
    const loadingScreenTimeout = 1200; 
    const fadeOutDuration = 500; 
    
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, fadeOutDuration);
        }
    }, loadingScreenTimeout);


    // --- 2. CUSTOM CURSOR TRACKING (Optimized with requestAnimationFrame) ---

    const cursorTrail = document.querySelector('.cursor-trail'); 
    const cursorOutline = document.querySelector('.cursor'); 
    
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursorTrail.style.left = `${cursorX}px`;
        cursorTrail.style.top = `${cursorY}px`;
    });

    function animateCursorOutline() {
        const currentOutlineX = parseFloat(cursorOutline.style.left) || cursorX;
        const currentOutlineY = parseFloat(cursorOutline.style.top) || cursorY;
        
        const lerpFactor = 0.2; 
        
        const newX = currentOutlineX + (cursorX - currentOutlineX) * lerpFactor;
        const newY = currentOutlineY + (cursorY - currentOutlineY) * lerpFactor;
        
        cursorOutline.style.left = `${newX}px`;
        cursorOutline.style.top = `${newY}px`;
        
        requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline(); 

    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .logo, .social-link, .nav-link, .submit-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // --- 3. SCROLL BEHAVIOR, HEADER, & NAVIGATION ---

    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinksContainer = document.getElementById('navLinks');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled'); 
        } else {
            header.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('active'); 
        } else {
            backToTop.classList.remove('active');
        }
        
        updateActiveNavLink();
    }, { passive: true });

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 10;
        
        document.querySelectorAll('.nav-link').forEach(navLink => {
            const sectionId = navLink.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);

            if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    }
    
    // Delegate click events for navigation
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-scroll]');
        if (target) {
            const sectionId = target.getAttribute('data-scroll');
            e.preventDefault();
            scrollToSection(sectionId);
        } else if (e.target.closest('.nav-link')) {
             const sectionId = e.target.closest('.nav-link').getAttribute('href').substring(1);
             e.preventDefault();
             scrollToSection(sectionId);
        } else if (e.target.closest('.logo')) {
            e.preventDefault();
            scrollToSection('home');
        }
    });

    function scrollToSection(id) {
        const targetElement = document.getElementById(id);
        const headerHeight = header.offsetHeight;
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight, 
                behavior: 'smooth' 
            });
            if (navLinksContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }

    // Mobile Menu Control
    mobileMenu.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }

    // --- 4. TYPEWRITER EFFECT INTEGRATION ---

    const typewriterTitles = ["FULL-STACK DEVELOPER", "AI ARCHITECT", "RAPID PROTOTYPER", "FUTURE BUILDER"];
    const element = document.getElementById('typewriter');
    
    if (element) {
        element.textContent = ""; 
        typewriterEffect(element, typewriterTitles);
    }
    
    function typewriterEffect(element, titles) {
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentTitle = titles[currentIndex];
            
            const currentText = isDeleting ? currentTitle.substring(0, charIndex - 1) : currentTitle.substring(0, charIndex + 1);
            
            element.textContent = currentText;
            
            element.innerHTML += '<span class="typewriter-cursor">|</span>'; 
            
            isDeleting ? charIndex-- : charIndex++;

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 2000); 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
                setTimeout(type, 500); 
            } else {
                const delay = isDeleting ? 40 : 75;
                setTimeout(type, delay);
            }
        }
        
        type();
    }
    
    // --- 5. ANIMATIONS (Stats and Skill Bars) ---
    
    let statsAnimated = false; 
    let skillBarsAnimated = false;

    const animateStats = function() {
        if (statsAnimated) return;
        statsAnimated = true;
        
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let start = 0;
            const duration = 2000;
            const stepTime = Math.max(1, Math.floor(duration / target)); 
            
            const timer = setInterval(() => {
                start += 1; 
                
                if (start > target) {
                    start = target;
                    clearInterval(timer);
                }
                
                stat.textContent = start;
                
                if (start === target) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    const animateSkillBars = function() {
        if (skillBarsAnimated) return;
        skillBarsAnimated = true;

        document.querySelectorAll('.skill-progress').forEach(bar => {
            const level = bar.getAttribute('data-progress');
            bar.style.width = level + '%';
        });
    };

    // Intersection Observer to trigger animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger Stats Animation
                if (entry.target.id === 'about' && !statsAnimated) {
                    animateStats();
                }

                // Trigger Skill Bar Animation
                if (entry.target.id === 'skills' && !skillBarsAnimated) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- 6. FORM SUBMISSION ---
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        console.groupCollapsed('TRANSMISSION COMPLETE: New Lead 🚀');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Form Data:', data);
        console.groupEnd();
        
        alert('TRANSMISSION SUCCESSFUL. I’ll respond ASAP!');
        
        event.target.reset();
    });

    // --- 7. ACCESSIBILITY ---

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navLinksContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
        
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});
