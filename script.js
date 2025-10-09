document.addEventListener('DOMContentLoaded', function() {

    // =======================
    // Existing frontend code
    // =======================

    // Loading screen fade out
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }, 1500);

    // Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    document.addEventListener('mousemove', (e) => {
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
            if (window.scrollY > 100) header.classList.add('header-scrolled');
            else header.classList.remove('header-scrolled');
        }
        if (backToTop) {
            if (window.scrollY > 500) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks) navLinks.classList.toggle('active');
        if (mobileMenu) mobileMenu.classList.toggle('active');
    };

    // Scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        const headerHeight = header ? header.offsetHeight : 0;
        if (section) {
            window.scrollTo({
                top: section.offsetTop - headerHeight,
                behavior: 'auto'
            });
        }
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
        if (mobileMenu && mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
    };

    // Scroll to top
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Intersection Observer + stats animation
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // Form submission placeholder (non-AI forms)
    window.submitForm = function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data);
        alert('Thank you for your message! I will get back to you soon.');
        event.target.reset();
    };

    // Typewriter effect
    function typewriterEffect() {
        const titles = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Tech Innovator"];
        const element = document.querySelector('.hero-subtitle');
        let currentIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentTitle = titles[currentIndex];
            if (!element) return;
            if (isDeleting) { element.textContent = currentTitle.substring(0, charIndex - 1); charIndex--; }
            else { element.textContent = currentTitle.substring(0, charIndex + 1); charIndex++; }

            if (!isDeleting && charIndex === currentTitle.length) { isDeleting = true; setTimeout(type, 2000); }
            else if (isDeleting && charIndex === 0) { isDeleting = false; currentIndex = (currentIndex + 1) % titles.length; setTimeout(type, 500); }
            else { setTimeout(type, isDeleting ? 50 : 100); }
        }
        type();
    }
    typewriterEffect();

    // =======================
    // Backend API integration
    // =======================

    // 1) Project Description
    async function getProjectDescription(userInput) {
        const res = await fetch("http://localhost:3000/api/project-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput }),
        });
        const data = await res.json();
        return data.projectDescription;
    }

    // 2) Resume Analyzer
    async function getImprovedResume(resumeText) {
        const res = await fetch("http://localhost:3000/api/resume-analyzer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText }),
        });
        const data = await res.json();
        return data.improvedResume;
    }

    // 3) Career Recommender
    async function getCareerSuggestions(skillsProjects) {
        const res = await fetch("http://localhost:3000/api/career-recommender", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skillsProjects }),
        });
        const data = await res.json();
        return data.careerSuggestions;
    }

    // Event listeners for AI forms

    // Project Description Form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userInput = document.getElementById('projectInput').value;
            const description = await getProjectDescription(userInput);
            document.getElementById('projectOutput').textContent = description;
        });
    }

    // Resume Analyzer Form
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resumeText = document.getElementById('resumeInput').value;
            const improved = await getImprovedResume(resumeText);
            document.getElementById('resumeOutput').textContent = improved;
        });
    }

    // Career Recommender Form
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const skillsProjects = document.getElementById('careerInput').value.split(','); // comma-separated
            const suggestions = await getCareerSuggestions(skillsProjects);
            document.getElementById('careerOutput').textContent = suggestions;
        });
    }

});
