// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // Theme Management
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
        
        // Add transition class for smooth theme changes
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation effect
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    }
    
    // Scroll Effects
    function handleScroll() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveLink();
    }
    
    // Mobile Menu
    function toggleMobileMenu() {
        const isActive = navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active', isActive);
        mobileOverlay.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // Add animation class
        if (isActive) {
            navbarMenu.style.animation = 'slideDown 0.4s ease forwards';
        } else {
            navbarMenu.style.animation = 'slideUp 0.4s ease forwards';
        }
    }
    
    function closeMobileMenu() {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Active Link Management
    function setActiveLink(clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth Scroll
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Scroll event
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Theme toggle
        themeToggle.addEventListener('change', toggleTheme);
        
        // Mobile menu
        navbarToggle.addEventListener('click', toggleMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('href').substring(1);
                setActiveLink(this);
                scrollToSection(targetSection);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Logo click
        document.querySelector('.navbar-logo').addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('home');
            setActiveLink(document.querySelector('a[href="#home"]'));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Resize handler
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    // Add CSS animations
    function addAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
            
            .theme-transition * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
            
            .navbar-menu {
                animation: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize everything
    function init() {
        initializeTheme();
        setupEventListeners();
        addAnimations();
        handleScroll(); // Initial call to set active link
    }
    
    // Make functions globally available
    window.toggleMobileMenu = toggleMobileMenu;
    window.toggleTheme = toggleTheme;
    window.setActiveLink = setActiveLink;
    window.scrollToSection = scrollToSection;
    
    // Start the application
    init();
});